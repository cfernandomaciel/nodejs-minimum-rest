var mongoose = require('mongoose');
var Factory = require('./../db/factory');
var config = require('./../../config');


var Database = Object.assign({}, Factory())


const schema = 
	{
		token: String,		
		user_id: mongoose.Schema.Types.ObjectId,
		active: Boolean,
		created: Date,
		modified: Date
	}

const attribute = "session";
/**
  * @desc Session Model Class
**/
const Session = () => ({  

	/**
	  * @desc mockup Model method that will return a representation of the actual session object from DB
	  * @param token: the necessary token to be given in order to use it as search criteria for an existing session
	**/
	get: (token) => {
		var mockup = {};

		mockup.token = "adfa4234ffdshj4324fsda43242323";
		mockup.user = "fulano-de-tal";

		return mockup;
	}
});

module.exports = Session;