module.exports = {

	//database: "cassandra",
	database : "mongodb",  
	api: "\/api\/v1\/",
	port: "4000",
	host: "http://localhost",
	session_expiration_time: "86400",
	secret: "ilovemongodbwithmeanbizfeatures",
	socket: {
		port: "3700"
	},
 	mongo: {  	
    	host: "localhost",
    	dbName: "merchants"
  	},
  	server: {  
	    cookieSecret: 'angular-app'                         // The secret for encrypting the cookie
  	}
};
