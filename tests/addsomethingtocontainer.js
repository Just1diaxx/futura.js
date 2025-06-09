const Futura = require('futuradb.js');

const db = new Futura({ logging: false, autosaveInterval: 5000, extension: 'db' }, 'testdb');
const cont = db.getContainer('test');
cont.insert('testaa', {
    name: 'testaa',
    value: 'testbb'
});
cont.insert('testcc', 'testbb');
cont.insert('testdd', 'testbb');