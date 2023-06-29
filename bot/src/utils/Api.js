module.exports = class Api {
    constructor(url) {
        this._url = url;
        this.guildCache = new Map();
    }

    async getUser(id) {
        const response = await fetch(`${this._url}/user/${id}`);
        return await response.json();
    }

    async putUser(id, cocTag) {
        if (cocTag[0] !== "#") cocTag = "#" + cocTag;

        const response = await fetch(`${this._url}/user/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ cocTag })
        });
        return await response.json();
    }

    async getClan(tag) {
        const response = await fetch(`${this._url}/clan/${tag}`);
        return await response.json();
    }

    async putClan(tag) {
        if (tag[0] !== "#") tag = "#" + tag;

        const response = await fetch(`${this._url}/clan/${tag}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response.json();
    }

    async getGuild(id) {
        if (this.guildCache.has(id)) {
            return this.guildCache.get(id);
        }
        
        const response = await fetch(`${this._url}/guild/${id}`);
        let guild = await response.json();
        this.guildCache.set(id, guild.guild);
        return guild;
    }

    async putGuild(id, ownerID) {
        const response = await fetch(`${this._url}/guild/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ownerID })
        });
        let guild = await response.json();
        this.guildCache.set(id, guild.guild);
        return guild;
    }

    async putGuildAdminRole(id, adminRole) {
        const response = await fetch(`${this._url}/guild/${id}/adminRole`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ adminRole: adminRole })
        });
        let guild = await response.json();
        this.guildCache.set(id, guild.guild);
        return guild;
    }
}