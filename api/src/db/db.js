const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true
    });
    mongoose.connection.on('connected', () => {
        console.log('Connected to Database');
    });
    mongoose.connection.on('error', (err) => {
        console.log('Database Error: ' + err);
    });
    return mongoose;
}