var UsersController = require('./controllers/users_controller');


/**
  * @desc Suppliers object that will hold all entities related to the store chains
**/
const users = () => {	
	
    return Object.assign(
     {},
     UsersController()
    )
}

exports.getAll 			= users().all_users;
exports.getOne 			= users().get;
exports.getSchema		= users().get_schema;
exports.authenticate	= users().authenticate;
exports.checkSession	= users().check_session;