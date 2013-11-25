// // index	GET	tournaments
// // create	POST	tournaments
// // show	GET	tournaments/:tournament
// // update	PUT	tournaments/:tournament
// // destroy	DELETE	tournaments/:tournament
// // start	POST	tournaments/:tournament/start
// // finalize	POST	tournaments/:tournament/finalize
// // reset	POST	tournaments/:tournament/reset

var util = require('util');
var Client = require('./client').Client;

var Tournaments = exports.Tournaments = function(options) {
	Client.call(this, options); // call parent constructor
};

// Inherit from Client base object
util.inherits(Tournaments, Client);

Tournaments.prototype.index = function(obj) {
	obj.method = 'GET';
	this.makeRequest(obj);
};

Tournaments.prototype.create = function(obj) {
	obj.method = 'POST';
	this.makeRequest(obj);
};

Tournaments.prototype.show = function(obj) {
	obj.path = '/' + obj.id;
	delete obj.id;
	obj.method = 'GET';
	this.makeRequest(obj);
};

Tournaments.prototype.update = function(obj) {
	obj.path = '/' + obj.id;
	delete obj.id;
	obj.method = 'PUT';
	this.makeRequest(obj);
};

Tournaments.prototype.destroy = function(obj) {
	obj.path = '/' + obj.id;
	delete obj.id;
	obj.method = 'DELETE';
	this.makeRequest(obj);
};

Tournaments.prototype.start = function(obj) {
	obj.path = '/' + obj.id + '/start';
	delete obj.id;
	obj.method = 'POST';
	this.makeRequest(obj);
};

Tournaments.prototype.finalize = function(obj) {
	obj.path = '/' + obj.id + '/finalize';
	delete obj.id;
	obj.method = 'POST';
	this.makeRequest(obj);
};

Tournaments.prototype.reset = function(obj) {
	obj.path = '/' + obj.id + '/reset';
	delete obj.id;
	obj.method = 'POST';
	this.makeRequest(obj);
};