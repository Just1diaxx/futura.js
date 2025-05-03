const Futura = require('futuradb.js');

const db = new Futura({ logging: false, autosaveInterval: 5000 }, 'testdb');
const cont = db.getContainer('test');
cont.set('testaa', 'testbb');