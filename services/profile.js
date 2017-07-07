var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var uri = "mongodb://localhost:27017/SION";

var options = {upsert: false, multi: false };

module.exports = {    
    // SAVE OR EDIT    
    save: function(collection, document, callback, options){                
        
        if (document._id == ''){ 
            console.log(collection);    
            console.log(document);    
            delete document._id;  
            // INSERT
            getConnection(function(db){ db.collection(collection).insert(document); });
        } else {            
            var id = new ObjectID(document._id);
            delete document._id;            
            // UPDATE
            getConnection(function(db){ db.collection(collection).update({ _id: id }, { $set:  document }, options); });
        }
    },
    // GET
    get: function(collection, document, callback, options){

        if (document._id && document._id != ''){
            document._id = new ObjectID(document._id);
        }

        getConnection(function(db){
            db.collection(collection).find(document, { explain: false }).toArray(callback); 
        });
    },
    delete: function(collection, document, callback,options){
        var id = new ObjectID(document._id);
        getConnection(function(db){ db.collection(collection).findOneAndDelete({_id: id}); });
    }    
};

function getConnection(callback){ 
    MongoClient.connect(uri, function(err, db){
        if (err)
            console.log(err);

        return callback(db);
    }); 
}