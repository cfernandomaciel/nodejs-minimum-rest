var mongoose = require('mongoose');
var Factory = require('./../db/factory');
var config = require('./../../config');


var Database = Object.assign({}, Factory())


const schema =  {
	type: String,
	permissions: String,
	active: Boolean
}

const attribute = "roles";



/**
  * @desc Role Model Class
**/
const Role = () => ({ 	
	  	
	/**
	  * @desc mockup Model method that will return a representation of the actual role object from DB
	  * @param id: the necessary id to be given in order to use it as search criteria for an existing role
	**/
	get: (id, cb) => {
		
		db =  Database.getInstance();

		var model
		if(db.models[attribute])
			model = db.model(attribute, null)
		else
			model = db.model(attribute, schema)
		
		model.findById(id, function(err, roles) {
			if(err) {
				console.log('error: ', err)
			}

			cb(roles)
		})		
	},
	all: (cb) => {	
		
		db =  Database.getInstance();

		var model
		if(db.models[attribute])
			model = db.model('roles', null)
		else
			model = db.model('roles', schema)


		model.find({active: true}, function(err, roles) {
			if(err) {
				console.log('error: ', err)
			}
			
			cb(roles)
		})

	},
	create: () => {

	},
	update: () => {

	}
});

module.exports = Role;