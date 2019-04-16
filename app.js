const express = require("express");
const { MongoClient } = require('mongodb');

let app = express();
let us;
const dbAddress = 'mongodb://127.0.0.1:27017/';
const dbName = 'users';
const mongoOptions = { useNewUrlParser: true };

const mid = (req, res, next) => {
    console.log("us1:", us);
    (async () => {
        const client = await MongoClient.connect(dbAddress, mongoOptions);
        const db = client.db(dbName);
        console.log("us:", us);

        const result = await db.collection('users').insertOne({ name: us });
        console.log(result.ops);
    })();
    next()
}

app.use(mid);

app.get('/:user', (req, res) => {
    res.send('hello world!');
    us = req.params.user
    console.log(us);

});

app.delete('/user', (req, res) => {
    res.send('hello user!');
    us = req.params.user
    console.log(us);

});




app.listen(4500, () => console.log('server started'));