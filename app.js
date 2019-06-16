const express = require("express");
const mustacheExpress = require('mustache-express');
const midwarePassword = require('./middlewear');

let app = express();
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

let us;

app.engine('mustache', mustacheExpress());

const dbInstance = require('./DBmongo');

// middlewear
app.use('/User/:user/:password', midwarePassword);



app.get("/", (req, res) => {

    res.render("index", {
        tekst1: "sklep z częściami samochodowymi",
    });
})


//=========USER==============================


//------- log in-----------------
app.get('/User/:user/:password', (req, res) => {
    res.render("userPage", {
        tekst1: "sklep z częściami samochodowymi",
    });

});


//-----------new user----------------
app.put('/User/:user/:password', (req, res) => {
    (async () => {
        const db = await dbInstance();
        let f1 = await db.collection('users').findOne({ "name": req.params.user });
        f1 ? res.send("użytkownik już istnieje w bazie") :
            await db.collection('users').insertOne({ "name": req.params.user, "password": req.params.password });
        res.send("użytkownik został dodany")
    })();
})


//-------------change password---------------
app.post('/User/:user/:password', (req, res) => {
    (async () => {
        const db = await dbInstance();
        result = await db.collection('users').insertOne({ "name": us, "password": req.params.password });
    })();
    res.send("hasło zostało zmienione")
})



//-------------delete user------------------------
app.delete('/User/:user/:password/:newPassword', (req, res) => {
    (async () => {
        const db = await dbInstance();
        result = await db.collection('users').deleteOne({ "name": req.params.user });
        res.send("użytkownik został usunięty")
    })();
});

//============================================PRODUCT==========================================
//=============================================================================================


//-------------get product---------------------------------------------
app.get('/User/:user/:password/Product', (req, res) => {

    (async () => {
        const db = await dbInstance();
        let products = await db.collection('users').find().toArray();
        res.render("productPage", {
            tekst1: "sklep ",
            products: products

        });
    })();
})

app.put('/User/:user/:password/Product/:productList', (req, res) => {

    (async () => {
        const db = await dbInstance();
        let f4 = await db.collection('users').findOne({ "name": req.params.user });
        f4 ? f4.password === req.params.password ? f4 = await db.collection('users')
            .update({ "name": req.params.user }, { $set: { "product": req.params.productList } }) :
            f4 = "nieprawidłowe hasło" : f4 = "użytkownik nieistnieje"
        res.send(f4)
    })();
})

//-----------add product-----------------------
app.put('/User/:user/:password/Product/:productList', (req, res) => {

    (async () => {
        const db = await dbInstance();
        const result = await db.collection('users').insertOne({
            "product": req.params.productList,
            "productID": req.params.password
        });
        res.render("productPage", {
            tekst1: "sklep z częściami samochodowymi",
        })
    })();
})


//---------------delete  product------------------------------------
app.delete('/User/:user/:password/Product/:productList', (req, res) => {

    (async () => {
        const db = await dbInstance();
        await db.collection('users').deleteOne({ "id": req.params.productList })

        let products = await db.collection('users').find();

        res.render("productPage", {
            tekst1: "sklep z częściami samochodowymi",
            products: products

        });
    })();

})

app.listen(4500, () => console.log('server started'));