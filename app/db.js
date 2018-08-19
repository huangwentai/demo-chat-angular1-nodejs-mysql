module.exports=function(){
	var mysql   = require('mysql');

	client = mysql.createConnection({
	 host   : 'localhost',
	 user   : 'root',
	 password : '1234',
	 database : 'huang',
	 port:'3306'
	});

	client.connect();
	return client;

}