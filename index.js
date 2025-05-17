const fs = require('fs');
const path = require('path');
const Logger = require('./utils/Logger.js');
const Container = require('./structures/Container.js');

/**
 * @typedef {Object} DatabaseOptions
 * @property {boolean} logging - If true, log all database operations
 * @property {number} autosaveInterval - Interval in milliseconds for autosaving the database
 * @property {string} extension - The file extension of the database file (default: 'json')
 */

class Futura {
    /**
     * 
     * @see {@link DatabaseOptions} - Database options
     * @param {String} name - The name of the database
     */
    constructor(options, name = 'database') {
        this.db = null;
        this.logger = new Logger('Futura');
        this.options = options;

        const dbPath = path.join(process.cwd(), `${name}.json`);
        let data = {
            name,
            containers: {}
        };

        if (fs.existsSync(dbPath)) {
            const fileData = fs.readFileSync(dbPath, 'utf8');
            try {
                data = JSON.parse(fileData);
                this.logger.success('Database loaded successfully.');
            } catch (e) {
                this.logger.error('Failed to parse database:', e);
            }
        } else {
            fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
            this.logger.success('Created new database.');
        }

        const dbInstance = {
            path: dbPath,
            data
        };

        if (options.autosaveInterval && options.autosaveInterval > 0) {
            setInterval(() => {
                this.save();
            }, options.autosaveInterval);
            if (options.logging) this.logger.success('Autosave enabled.');
        }

        this.db = dbInstance;
    }

    /**
     * Save the database to disk
     */
    save() {
        fs.writeFileSync(this.db.path, JSON.stringify(this.db.data, null, 2));
        if (this.options.logging) this.logger.success(`[${this.db.data.name}] Database saved.`);
    }

    /**
     * Make a collection where to store data
     * @param {String} name - The name of the collection
     * @returns {Container}
     */
    addContainer(name) {
        if (this.db.data.containers[name]) {
            this.logger.warn(`Container ${name} already exists. Returning existing container.`);
            return this.getContainer(name);
        }

        const container = new Container(name, this.db);
        this.db.data.containers[name] = container.data;
        this.save();
        return container;
    }

    /**
     * Get a collection by name
     * @param {String} name - The name of the collection
     * @returns {Container} The collection object
     */
    getContainer(name) {
        if (!this.db.data.containers[name]) {
            this.logger.error(`Container ${name} does not exist.`);
            return null;
        }

        const container = new Container(name, this.db, this.db.data.containers[name]);
        return container;
    }
}

module.exports = Futura;