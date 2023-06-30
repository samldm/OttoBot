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

    async deleteGuildAdminRole(id) {
        const response = await fetch(`${this._url}/guild/${id}/adminRole`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let guild = await response.json();
        this.guildCache.set(id, guild.guild);
        return guild;
    }

    async putGuildClanRole(id, role) {
        const response = await fetch(`${this._url}/guild/${id}/clanRoles`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ clanRoles: [role] })
        });
        let guild = await response.json();
        console.log(guild);
        this.guildCache.set(id, guild.guild);
        return guild;
    }

    async deleteGuildClanRole(id, tag) {
        const response = await fetch(`${this._url}/guild/${id}/clanRoles`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ tag })
        });
        let guild = await response.json();
        this.guildCache.set(id, guild.guild);
        return guild;
    }

    async putGuildThRole(id, role) {
        console.log(role);
        const response = await fetch(`${this._url}/guild/${id}/thRoles`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ thRoles: [role] })
        });
        let guild = await response.json();
        console.log(guild);
        this.guildCache.set(id, guild.guild);
        return guild;
    }

    async deleteGuildThRole(id, th) {
        const response = await fetch(`${this._url}/guild/${id}/thRoles`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ th })
        });
        let guild = await response.json();
        this.guildCache.set(id, guild.guild);
        return guild;
    }

    async putGuildGoldPassChannel(id, channelID) {
        const response = await fetch(`${this._url}/guild/${id}/goldPassChannel`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ channelID })
        });
        let guild = await response.json();
        this.guildCache.set(id, guild.guild);
        return guild;
    }

    async deleteGuildGoldPassChannel(id) {
        const response = await fetch(`${this._url}/guild/${id}/goldPassChannel`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let guild = await response.json();
        this.guildCache.set(id, guild.guild);
        return guild;
    }

    async getGoldPass() {
        const response = await fetch(`${this._url}/goldPass`);
        return await response.json();
    }

    async putStats(stats) {
        const response = await fetch(`${this._url}/stats`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(stats)
        });
        return await response.json();
    }

    async putRoles(id, roles) {
        const response = await fetch(`${this._url}/cache/roles/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ roles })
        });
        return await response.json();
    }

    async putChannels(id, channels) {
        const response = await fetch(`${this._url}/cache/channels/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ channels })
        });
        return await response.json();
    }
}