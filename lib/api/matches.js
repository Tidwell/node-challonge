/*
index   GET tournaments/:tournament/matches
show    GET tournaments/:tournament/matches/:match_id
update  PUT tournaments/:tournament/matches/:match_id
*/

'use strict';

const util = require('util');
const Client = require('./client').Client;

const Matches = exports.Matches = function (options) {
	Client.call(this, options); // Call parent constructor.
};

// Inherit from Client base object.
util.inherits(Matches, Client);

Matches.prototype.index = function (obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/matches';
	delete obj.id;
	obj.method = 'GET';
	this.makeRequest(obj);
};

Matches.prototype.show = function (obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/matches/' + obj.matchId;
	delete obj.id;
	delete obj.matchId;
	obj.method = 'GET';
	this.makeRequest(obj);
};

Matches.prototype.update = function (obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/matches/' + obj.matchId;
	delete obj.id;
	delete obj.matchId;
	obj.method = 'PUT';
	this.makeRequest(obj);
};