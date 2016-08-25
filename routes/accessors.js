var UsersController = require('./controllers/users_controller');
var RolesController = require('./controllers/roles_controller');
var PermissionsController = require('./controllers/permissions_controller');

/**
  * @desc Accessor object that will hold all entities related to the users and its cretentials
**/
const accessors = () => {	

	//returns all aggretated classes as one object
    return Object.assign(
     {},     
     UsersController(),
     RolesController(),
     PermissionsController()     
    )
}

exports.getRoles = accessors().all_roles;
exports.getRole = accessors().role;
exports.getUsers = accessors().all_users;
exports.getUser = accessors().get;
exports.getPermissions = accessors().all_permissions;
exports.authenticate = accessors().authenticate;