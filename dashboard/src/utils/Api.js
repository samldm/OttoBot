module.exports = class {
    constructor(url) {
        this._url = url;
    }

    async getStats() {
        const response = await fetch(`${this._url}/stats`);
        return await response.json();
    }

    async getCommands() {
        const response = await fetch(`${this._url}/stats/commands`);
        return await response.json();
    }
}