console.log("starting app.js");

var express = require('express');
var routes = require('./routes');
var fs = require('fs');
var http = require('http');
var User = require('./models/User.js');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);

app.set('views', __dirname + 'views');
app.set('view engine', 'jade');
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname, 'public'));

// development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// }

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', routes.index);


app.get('/form',function(req,res){
	fs.readFile('./form.html',function(error,content){
		if(error){
			res.writeHead(500);
			res.end();
		}
		else{
			res.writeHead(200,{'Content-Type':'text/html'});
			res.end(content,'utf-8');
		}
	});
});

app.post('/signup',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	User.addUser(username,password,function(err,user){
		console.log("in adduser");

		if(err) throw err;
		console.log("done add user");
		res.redirect('/form');
	});
});


app.listen(3000);
// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });
