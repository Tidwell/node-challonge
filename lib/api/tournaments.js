const util = require('util');
const Client = require('./client').Client;

/**
 * @class Participants(options)
 * @param {object} options configuration options for this instance
 * @description
 *   Constructor function for the class to query Participants endpoints
 *     index    GET    tournaments
 *     create   POST   tournaments
 *     show     GET    tournaments/:tournament
 *     update   PUT    tournaments/:tournament
 *     destroy  DELETE tournaments/:tournament
 *     start    POST   tournaments/:tournament/start
 *     finalize POST   tournaments/:tournament/finalize
 *     reset    POST   tournaments/:tournament/reset
 */
const Tournaments = exports.Tournaments = function(options) {
	Client.call(this, options); // call parent constructor

	this.getRawSubdomain = function() {
		const subdomain = this.options.get('subdomain');
		if (this.options.get('subdomain')[subdomain.length - 1] === '-') {
			return subdomain.substr(0, subdomain.length - 1);
		}
		return subdomain;
	};
};

// inherit from Client base object
util.inherits(Tournaments, Client);

Tournaments.prototype.index = function(obj) {
	obj.method = 'GET';
	if (this.getRawSubdomain()) {
		obj.subdomain = this.getRawSubdomain();
	}
	this.makeRequest(obj);
};

Tournaments.prototype.create = function(obj) {
	if (this.getRawSubdomain()) {
		obj.tournament.subdomain = this.getRawSubdomain();
	}
	obj.method = 'POST';
	this.makeRequest(obj);
};

Tournaments.prototype.show = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id;
	delete obj.id;
	obj.method = 'GET';
	this.makeRequest(obj);
};

Tournaments.prototype.update = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id;
	delete obj.id;
	obj.method = 'PUT';
	this.makeRequest(obj);
};

Tournaments.prototype.destroy = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id;
	delete obj.id;
	obj.method = 'DELETE';
	this.makeRequest(obj);
};

Tournaments.prototype.start = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/start';
	delete obj.id;
	obj.method = 'POST';
	this.makeRequest(obj);
};

Tournaments.prototype.finalize = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/finalize';
	delete obj.id;
	obj.method = 'POST';
	this.makeRequest(obj);
};

Tournaments.prototype.reset = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/reset';
	delete obj.id;
	obj.method = 'POST';
	this.makeRequest(obj);
};
