var Permission = require('./../models/permission');

/**
  * @desc Object that will hold permission entity data
**/
const PermissionsController = () => ({   

	
	all_permissions: (req, res) => {   
		var permissions = Object.assign({}, Permission());

		var ret_permissions = permissions.get_all();
		res.send(ret_permissions);
	}
});

module.exports = PermissionsController