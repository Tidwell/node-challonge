const util = require('util');
const Client = require('./client').Client;

/**
 * @class Participants(options)
 * @param {object} options configuration options for this instance
 * @description
 *   Constructor function for the class to query Participants endpoints
 *     index     GET     tournaments/:tournament/participants
 *     create    POST    tournaments/:tournament/participants
 *     show	     GET     tournaments/:tournament/participants/:participant_id
 *     update	 PUT     tournaments/:tournament/participants/:participant_id
 *     destroy	 DELETE  tournaments/:tournament/participants/:participant_id
 *     randomize GET     tournaments/:tournament/participants/randomize
 */
const Participants = exports.Participants = function(options) {
	Client.call(this, options); // call parent constructor
};

// inherit from Client base object
util.inherits(Participants, Client);

Participants.prototype.index = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/participants';
	delete obj.id;
	obj.method = 'GET';
	this.makeRequest(obj);
};

Participants.prototype.create = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/participants';
	delete obj.id;
	obj.method = 'POST';
	this.makeRequest(obj);
};

Participants.prototype.show = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/participants/' + obj.participantId;
	delete obj.id;
	delete obj.participantId;
	obj.method = 'GET';
	this.makeRequest(obj);
};

Participants.prototype.update = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/participants/' + obj.participantId;
	delete obj.id;
	delete obj.participantId;
	obj.method = 'PUT';
	this.makeRequest(obj);
};

Participants.prototype.destroy = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/participants/' + obj.participantId;
	delete obj.id;
	delete obj.participantId;
	obj.method = 'DELETE';
	this.makeRequest(obj);
};

Participants.prototype.randomize = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/participants/randomize';
	delete obj.id;
	obj.method = 'POST';
	this.makeRequest(obj);
};
