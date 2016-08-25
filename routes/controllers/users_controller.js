var jwt 		= require('jsonwebtoken');
var User 		= require('./../models/user');
var config 		= require('./../../config');


/**
  * @desc Object that will hold user entity data
**/
const UsersController = () => ({   


    get_schema: (cb) => {
    	var user = Object.assign({}, User());

		var set = user.get_schema(cb);

		
    },
	all_users: (req, res) => {   
		var user = Object.assign({}, User());

		var existing_users = user.get_all();

		res.send(existing_users);
	},
	get: (req, res) => {
		var id = req.params.id

		var users = Object.assign({}, User());
		users.get(id, function(user) {
			res.send(user);
		})
	},
	authenticate: (req, res, superSecret) => {
		var users = Object.assign({}, User());		
		
		users.authenticate(req, superSecret, function(result) {
			res.send(result);
		})
	},
	check_session: (req, res, next, superSecret) => {		
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

    	if (token) {
        	// verifies secret and checks exp
        	jwt.verify(token, superSecret, function(err, decoded) {      
            
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } 
            else {
            
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;    
                next();
            }
        });

	    } else {
		    // if there is no token
		    // return an error
		    return res.status(403).send({ 
		        success: false, 
		        message: 'No token provided.' 
		    });
		}
	}
});

module.exports = UsersController