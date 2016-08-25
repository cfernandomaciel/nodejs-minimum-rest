
/**
  * @desc Permission Model Class
**/
const Permission = () => ({  

	/**
	  * @desc mockup Model method that will return a representation of the actual permision object from DB
	  * @param id: the necessary id to be given in order to use it as search criteria for an existing permission
	**/
	get_all: () => {
		var existing_permissions = [];

		existing_permissions.push({ can_read: true});
		existing_permissions.push({ can_write: true});
		existing_permissions.push({ can_add_permissions: true});
		existing_permissions.push({ can_add_crud: true});

		return existing_permissions;
	}
});

module.exports = Permission;