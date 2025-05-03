# futura.js
Document-based database with various integrations

## How to install
```
> npm i futuradb.js
```

## How to use it
It's so simple to use. It supports in-memory allocation and autosave.

To make a database with Futura:
```js
const Futura = require('futuradb.js');
const db = new Futura({ logging: true, autosaveInterval: 5000 }, 'testdb');
```
