class Container {
    constructor(name, db, data = {},) {
        this.name = name;
        this.data = data;
        this.db = db;
    }

    get(key) {
        return this.data[key];
    }

    set(key, value) {
        this.data[key] = value;
        this.saveToDB();
    }

    delete(key) {
        delete this.data[key];
        this.saveToDB();
    }

    clear() {
        this.data = {};
        this.saveToDB();
    }

    saveToDB() {
        this.db.data.containers[this.name] = this.data;
    }
}

module.exports = Container;