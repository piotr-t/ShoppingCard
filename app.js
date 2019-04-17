const express = require("express");
const { MongoClient } = require('mongodb');
const mustacheExpress = require('mustache-express');

let haslo = "poiuy"

let app = express();
let us;
const dbAddress = 'mongodb://127.0.0.1:27017/';
const dbName = 'users';
const mongoOptions = { useNewUrlParser: true };
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


app.engine('mustache', mustacheExpress());

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

app.get("/", (req, res) => {

    res.render("index", {
        tekst1: "mój jakiś tam tekst"
    });
})

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