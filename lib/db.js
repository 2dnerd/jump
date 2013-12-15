var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

//connecting to the cloud

var username = "praju";
var password = "praju";
var address = '@ds057548.mongolab.com:57548/interest';

connect();


function connect(){
	console.log("db connecting");
	var url = 'mongodb://' + username + ':' + password + address;
	mongoose.connect(url);
	console.log("db connected");
}

function disconnect(){mongoose.disconnect();}