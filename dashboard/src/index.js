require('dotenv').config();

const express = require('express');
const Api = require('./utils/Api.js');

const url = require('url');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const session = require('express-session');
const memoryStore = require('memorystore')(session);
const cookieParser = require('cookie-parser');

const app = express();
const api = new Api(process.env.API_URL);

const renderTemplate = (req, res, template, data = {}) => {
    const baseData = {
        path: req.path,
        user: req.isAuthenticated() ? req.user : null,
    };
    res.render(
        template,
        Object.assign(baseData, data),
    );
};
const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
};

app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


passport.use(new DiscordStrategy(
    {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CLIENT_CALLBACK,
        scope: ['identify', 'guilds'],
    },
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile));
    }
));
passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use(session({
    store: new memoryStore({
        checkPeriod: 86400000
    }),
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', async (req, res) => {
    let stats = await api.getStats();
    console.log(req.user);
    renderTemplate(req, res, 'index.ejs', { stats: stats.stats });
});

app.get( "/login", (req, res, next) => {
      if (req.session.backURL) {
        req.session.backURL = req.session.backURL;
      } else if (req.headers.referer) {
        const parsed = url.parse(req.headers.referer);
        if (parsed.hostname === app.locals.domain) {
          req.session.backURL = parsed.path;
        }
      } else {
        req.session.backURL = "/";
      }
      next();
    },
    passport.authenticate("discord"),
);

app.get("/logout", function(req, res) {
    req.session.destroy(() => {
        req.logout();
        res.redirect("/");
    });
});

app.get("/callback", passport.authenticate("discord", { failureRedirect: "/" }),
    ( req, res ) => {
        if (req.session.backURL) {
            const backURL = req.session.backURL;
            req.session.backURL = null;
            res.redirect(backURL);
        } else {
            res.redirect("/");
        }
    },
);

app.get('/commands', async (req, res) => {
    let commands = await api.getCommands();
    renderTemplate(req, res, 'commands.ejs', { commands: commands.commands });
});

app.get('/dashboard', checkAuth, async (req, res) => {
    renderTemplate(req, res, 'select_server.ejs', { guilds: req.user.guilds.filter(g => (g.permissions & 0x20) === 0x20) });
});

app.get('/dashboard/:guildID', checkAuth, async (req, res) => {
    let guild = await api.getGuild(req.params.guildID);
    renderTemplate(req, res, 'dashboard.ejs', { guild: guild.guild });
});

app.listen(process.env.PORT || 4040, () => {
  console.log('Le serveur est en écoute sur le port 3000');
});
