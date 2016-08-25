var Role = require('./../models/role');

/**
  * @desc Object that will hold users' related roles data
**/
const RolesController = () => ({   

	/**
    * @desc   just a mockup method that returns a dummy set of roles
    * @param  req => the request params
    * @param  res => the response object
    * @return dummy set of roles
   **/
	all_roles: (req, res) => {   
		var roles = Object.assign({}, Role())

		function callback(items) {			
			res.send(items)
		}

		roles.all(callback)
		
	},
	role: (req, res) => {
		var id = req.params.id;
		
		var roles = Object.assign({}, Role())

		function callback(item) {
			res.send(item)
		}

		roles.get(id, callback)
	}

});

module.exports = RolesController