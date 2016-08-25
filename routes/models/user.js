var jwt 		= require('jsonwebtoken');
var mongoose 	= require('mongoose');
var Factory 	= require('./../db/factory');
var config 		= require('./../../config');



var Database 	= Object.assign({}, Factory())
var Role 		= require('./../models/role');

const schema = 
	{
		first_name: String,		
		last_name: String,
		user_name: String,
		password_hash: String,
		email: String,
		role: mongoose.Schema.Types.ObjectId,
		active: Boolean,
		created: Date,
		modified: Date
	}

const attribute = "users";

/**
  * @desc User Model Class
**/
const User = () => ({  

	//simple getter for the schema. I'll need it for the auth part that
	//sits at app.js
	get_schema: (cb) => {		
		cb(schema)
	},
	get_all: () => {

		var existing_users = [];
		var roles = Object.assign({}, Role());

		existing_users.push({ first_name : "fernando", last_name: "maciel"});
		existing_users.push({ first_name : "marco", last_name: "santana"});		
		
		return existing_users;
	},
	get: (id, cb) => {
		db =  Database.getInstance();

		var model
		if (db.models[attribute]) {
			model = db.model(attribute, null)
		}
		else {
			model = db.model(attribute, schema)
		}

		model.findById(
			id, 
			function(err, user) {
				if (err) {
					console.log('error: ', err)
				}				
				cb(user)
			}
		)
	},
	authenticate: (req, superSecret, cb) => {		 

        var attribute = 'users'  //gotta take it outta here later on
        var model

        db =  Database.getInstance();
        
        if(db.models[attribute]) {            
            model = db.model(attribute, null)
        }
        else {            
            model = db.model(attribute, schema)
        }
        
        //pretty self explanatory
        model.findOne({
            email: req.body.email
            }, 
            function(err, user_token) {
                if(err) throw err

                if(!user_token) {
                    cb({ success: false, message: 'Authentication failed. Email not found'})
                }
                else if(user_token) {                 
                    if(user_token.password_hash != req.body.password) {                        
                        cb({ success: false, message: 'Authentication failed. Wrong password'})
                    }
                    else {        
                    	console.log('superSecret: ', superSecret);
                        var token = jwt.sign(
                        { 
                            "user": user_token.email, 
                            "password": user_token.password_hash
                        }
                        ,superSecret, {//reading from my config app secretkey
                            expiresIn: config.session_expiration_time //change it at config if you want some different value
                        })

                        cb({
                            success : true,
                            message : 'Enjoy your token!',
                            token   : token                            
                        })
                    }
                }
    		}
    	)   
  		
	}

});

module.exports = User;