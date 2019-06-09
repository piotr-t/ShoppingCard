const express = require("express");
const mustacheExpress = require('mustache-express');
let app = express();
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
const { MongoClient } = require('mongodb');
const dbAddress = 'mongodb://127.0.0.1:27017/';
const dbName = 'users';
const mongoOptions = { useNewUrlParser: true };
let us;
let result;
app.engine('mustache', mustacheExpress());

//============database==========================

(async () => {

    const client = await MongoClient.connect(dbAddress, mongoOptions);
    db = client.db(dbName);
})();

const midwarePassword = (req, res, next) => {
    us = req.params.user;
    pas = req.params.password;
    req.method !== "PUT" ?
        (async () => {
            let fi = await db.collection('users').findOne({ "name": us });
            let fi1 = await db.collection('users').findOne({ "name": us, "password": pas });
            !fi ? res.send("nie znaleziono użytkownika") : fi1 ? next() : res.send("nieprawidłowe hasło")
        })() : next()

}




app.get("/", (req, res) => {

    res.render("index", {
        tekst1: "sklep z częściami samochodowymi"
    });
})
//=========USER==============================

app.use('/User/:user/:password', midwarePassword);

app.get('/User/:user/:password', (req, res) => {
    console.log(req.params);

    res.send(req.params.user);

});

app.put('/User/:user/:password', (req, res) => {
    (async () => {
        let f1 = await db.collection('users').findOne({ "name": req.params.user });
        f1 ? res.send("użytkownik już istnieje w bazie") :
            await db.collection('users').insertOne({ "name": req.params.user, "password": req.params.password });
        res.send("użytkownik został dodany")
    })();
})

app.post('/User/:user/:password', (req, res) => {
    (async () => {
        result = await db.collection('users').insertOne({ "name": us, "password": req.params.password });
    })();
    res.send("hasło zostało zmienione")
})

app.delete('/User/:user/:password', (req, res) => {
    (async () => {
        result = await db.collection('users').deleteOne({ "name": req.params.user });
        res.send("użytkownik został usunięty")
    })();
});

//============================================PRODUCT==========================================
//=============================================================================================


//-------------get product---------------------------------------------
app.get('/User/:user/:password/Product/:productList', (req, res) => {

    (async () => {
        let f3 = await db.collection('users').findOne({ "name": req.params.user });
        console.log(f3._id);

        res.send(f3.product);
    })();
})

app.put('/User/:user/:password/Product/:productList', (req, res) => {

    (async () => {

        let f4 = await db.collection('users').findOne({ "name": req.params.user });
        f4 ? f4.password === req.params.password ? f4 = await db.collection('users')
            .update({ "name": req.params.user }, { $set: { "product": req.params.productList } }) :
            f4 = "nieprawidłowe hasło" : f4 = "użytkownik nieistnieje"


        res.send(f4)
    })();
})

app.post('/User/:user/:password/Product/:productList', (req, res) => {
    res.send("dziaął put")
})

//---------------delete all products------------------------------------
app.delete('/User/:user/:password/Product/:productList', (req, res) => {
    res.send("produkt został usunięty")
})

app.listen(4500, () => console.log('server started'));