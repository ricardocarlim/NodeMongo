
var MongoClient = require('mongodb').MongoClient;

function get(callback){
    MongoClient.connect('mongodb://localhost:27017/SION', function(err, db) {
        if (err) {
            throw err;
        }
        db.collection('USERS').find().toArray(function(err, result) {
            if (err) {
            throw err;
            }
            console.log(result); 
            callback(result);
        });
    });
}

module.exports = {users: get};