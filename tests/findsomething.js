const Futura = require('futuradb.js');

const db = new Futura({ logging: false, autosaveInterval: 5000 }, 'testdb');
const cont = db.getContainer('test');
console.log(cont.find('testbb'));
console.log(cont.findOne('testbb'));