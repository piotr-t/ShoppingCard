const dbInstance = require('./DBmongo');




module.exports = midwarePassword = (req, res, next) => {

    us = req.params.user;
    pas = req.params.password;
    req.method !== "PUT" ?
        (async () => {
            const db = await dbInstance();
            let fi = await db.collection('users').findOne({ "name": us });
            let fi1 = await db.collection('users').findOne({ "name": us, "password": pas });
            !fi ? res.send("nie znaleziono użytkownika") : fi1 ? next() : res.send("nieprawidłowe hasło")
        })() : next()

}