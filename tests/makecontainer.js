const futura = require('futuradb.js');
const db = new futura({ logging: false, autosaveInterval: 5000, extension: 'db' }, 'testdb');
const cont = db.addContainer('test');