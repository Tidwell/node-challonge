/*
index     GET    tournaments/:tournament/participants
create    POST   tournaments/:tournament/participants
show      GET    tournaments/:tournament/participants/:participant_id
update    PUT    tournaments/:tournament/participants/:participant_id
destroy   DELETE tournaments/:tournament/participants/:participant_id
randomize GET    tournaments/:tournament/participants/randomize
*/

'use strict';

const util = require('util');
const Client = require('./client').Client;

// Used for the randomize workaround. (Unused)
// const sys = require('util');
// const exec = require('child_process').exec;

const Participants = exports.Participants = function (options) {
	Client.call(this, options); // Call parent constructor.
};

// Inherit from Client base object.
util.inherits(Participants, Client);

Participants.prototype.index = function (obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/participants';
	delete obj.id;
	obj.method = 'GET';
	this.makeRequest(obj);
};

Participants.prototype.create = function (obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/participants';
	delete obj.id;
	obj.method = 'POST';
	this.makeRequest(obj);
};

Participants.prototype.show = function (obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/participants/' + obj.participantId;
	delete obj.id;
	delete obj.participantId;
	obj.method = 'GET';
	this.makeRequest(obj);
};

Participants.prototype.update = function (obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/participants/' + obj.participantId;
	delete obj.id;
	delete obj.participantId;
	obj.method = 'PUT';
	this.makeRequest(obj);
};

Participants.prototype.destroy = function (obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/participants/' + obj.participantId;
	delete obj.id;
	delete obj.participantId;
	obj.method = 'DELETE';
	this.makeRequest(obj);
};

Participants.prototype.randomize = function (obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/participants/randomize';
	delete obj.id;
	obj.method = 'POST';
	this.makeRequest(obj);
}