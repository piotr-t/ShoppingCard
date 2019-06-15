const { MongoClient } = require('mongodb');
const dbAddress = 'mongodb://127.0.0.1:27017/';
const dbName = 'users';
const mongoOptions = { useNewUrlParser: true };
let client;


module.exports = async () => {
    if (!client) {
        client = await MongoClient.connect(dbAddress, mongoOptions);
    }
    return client.db(dbName);
}