var server = require('mongoose');
var server_schema = server.Schema;
var db;
    

const mongoDatabase = () => ({

    initialize: (host, dbName, user, pwd, done) => {        
        
        if(!user || 0 === user.length)
            server.connect('mongodb://' + host + '/' + dbName)
        else
            server.connect('mongodb://' + user + ':' + pwd + "@" + host + '/' + dbName )

        db = server.connection

        db.on('error', console.error.bind(console, 'connection error:'))
        db.once('open', function() {
            console.log("Connected to '" + dbName + " db' database")
        })        
    },
    instance: () => {
        return db
    },
    model: (name, schema) => {       

        try {
            if(db.model(name)) return db.model(name)
        }
        catch(e) {
            if(e.name === 'MissingSchemaError') {
                var new_schema = new server_schema(schema)
                return db.model(name, new_schema)
            }
        }        
        
    },
    schemas: (name, cb) => {        
        db.db.listCollections({ name : name }).toArray(function(err, items) {            
            cb(items)
        })       
    },
    models: () => {
        return db.models
    }
});

module.exports = mongoDatabase;
