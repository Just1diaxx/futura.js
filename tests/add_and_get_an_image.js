const Futura = require('futuradb.js');

const db = new Futura({ logging: false, autosaveInterval: 5000 }, 'testdb');
const cont = db.getContainer('test');
cont.insertImage('testimage', './testimage.png')
console.log(cont.getImage('testimage'))