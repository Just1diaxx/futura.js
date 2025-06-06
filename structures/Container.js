const fs = require('fs');

class Container {
    constructor(name, db, data = {},) {
        this.name = name;
        this.data = data;
        this.db = db;
    }

    /**
     * Insert a key-value pair in the container.
     * 
     * If the key already exists, it will be updated with the new value.
     * @param {String} key 
     * @param {*} value 
     */
    insert(key, value) {
        this.data[key] = value;
        this.saveToDB();
    }

    /**
     * Find all keys that match the value.
     * @param {*} key 
     * @returns {[[]]} [ [key, value], [key, value], ...]
     */
    find(value) {
        return Object.entries(this.data).filter(([k, v]) => v === value);
    }

    /**
     * Find the first key that matches the value.
     * @param {*} value 
     * @returns {Array} [key, value]
     */
    findOne(value) {
        return Object.entries(this.data).find(([k, v]) => v === value);
    }

    /**
     * Find a key-value pair by index.
     * @param {number} index 
     * @returns {Array} [key, value]
     */
    findByIndex(index) {
        return Object.entries(this.data).find((v, i) => i === index);
    }

    /**
     * Get the value of a key.
     * @param {String} key 
     * @returns {*}
     */
    get(key) {
        return this.data[key];
    }

    /**
     * Deletes a key from the container.
     * @returns {Array} [key, key, key, ...]
     */
    delete(key) {
        delete this.data[key];
        this.saveToDB();
    }

    /**
     * Deletes all keys from the container.
     */
    clear() {
        this.data = {};
        this.saveToDB();
    }

    /**
     * Saves the container to the database.
     * 
     * This is called automatically when you insert, delete, clear...
     */
    saveToDB() {
        this.db.data.containers[this.name] = this.data;
    }

    // Images functions -- futura uses a special method to store images //

    /**
     * Insert an image in the container.
     * @param {String} key 
     * @param {Buffer} image 
     */
    insertImage(key, image) {
        const imgBuffer = fs.readFileSync(image);
        const convertedImgBuffer = imgBuffer.toString('base64');
        this.data[key] = convertedImgBuffer;
        this.saveToDB();
    }

    /**
     * Get an image from the container.
     * @param {String} key 
     * @returns {Buffer}
     */
    getImage(key) {
        return Buffer.from(this.data[key], 'base64');
    }

}

module.exports = Container;