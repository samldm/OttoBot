const Client = require('../structure/Client');
const { Collection } = require("discord.js")
const cron = require('node-cron');
const Logger = require('../utils/Logger');

module.exports = class CronJobManager
{
    /**
     * 
     * @param {Client} client 
     */
    constructor(client) {
        this.client = client;
        this.jobs = new Collection();
    }

    init() {
        let jobs = require('../jobs');
        jobs.forEach((job) => this.create(job.id, job.expr, job.func));
        return (this);
    }

    create(id, expr, func) {
        if (!cron.validate(expr))
            throw new Error(`Error: ${id} job has an unvalid cron expression.`);
        Logger.log(`Creating job ${id} (${expr})`);
        let job = cron.schedule(expr, () => {
            func(this.client);
        }, { timezone: "Europe/Paris" });
        this.jobs.set(id, job);
    }

    kill(id) {
        if (this.jobs.get(id)) {
            let job = this.jobs.get(id);
            Logger.log(`Killing job ${id}`);
            job.stop();
            return (true);
        }
        return (false);
    }
}