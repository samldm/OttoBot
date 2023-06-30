module.exports = class {
    constructor(url) {
        this._url = url;
    }

    async getUser(id) {
        const response = await fetch(`${this._url}/user/${id}`);
        return await response.json();
    }
    
    async getStats() {
        const response = await fetch(`${this._url}/stats`);
        return await response.json();
    }

    async getCommands() {
        const response = await fetch(`${this._url}/stats/commands`);
        return await response.json();
    }

    async getGuild(id) {
        const response = await fetch(`${this._url}/guild/${id}`);
        return await response.json();
    }

    async getChannels(id) {
        const response = await fetch(`${this._url}/cache/channels/${id}`);
        return await response.json();
    }

    async getRoles(id) {
        const response = await fetch(`${this._url}/cache/roles/${id}`);
        return await response.json();
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
        return guild;
    }
}