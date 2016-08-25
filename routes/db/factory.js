var config = require('./../../config');
var mongoDatabase = require('./mongo_database');
var cassandraDatabase = require('./cassandra_database');

const Factory = () => ({
	getInstance: () => {
		var database		
		if(config.database === 'mongodb') {		
			database = Object.assign({}, mongoDatabase())
		}
		else if(config.database === 'cassandra') {
			database = Object.assign({}, cassandraDatabase())
		}

		return database;
	}
})

module.exports = Factory;