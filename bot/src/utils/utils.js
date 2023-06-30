module.exports = {
    formatUptime: (uptime) => {
        let seconds = Math.floor(uptime / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    },
}