// index	GET	tournaments/:tournament/participants
// create	POST	tournaments/:tournament/participants
// show	GET	tournaments/:tournament/participants/:participant_id
// update	PUT	tournaments/:tournament/participants/:participant_id
// destroy	DELETE	tournaments/:tournament/participants/:participant_id
// randomize	GET	tournaments/:tournament/participants/randomize

var util = require('util');
var Client = require('./client').Client;

//used for the randomize workaround
var sys = require('sys')
var exec = require('child_process').exec;


var Participants = exports.Participants = function(options) {
	Client.call(this, options); // call parent constructor
};

// Inherit from Client base object
util.inherits(Participants, Client);

Participants.prototype.index = function(obj) {
	obj.path = '/v1/tournaments/'+obj.id+'/participants';
	delete obj.id;
	obj.method = 'GET';
	this.makeRequest(obj);
};

Participants.prototype.create = function(obj) {
	obj.path = '/v1/tournaments/'+obj.id+'/participants';
	delete obj.id;
	obj.method = 'POST';
	this.makeRequest(obj);
};

Participants.prototype.show = function(obj) {
	obj.path = '/v1/tournaments/'+obj.id+'/participants/'+obj.participantId;
	delete obj.id;
	delete obj.participantId;
	obj.method = 'GET';
	this.makeRequest(obj);
};

Participants.prototype.update = function(obj) {
	obj.path = '/v1/tournaments/'+obj.id+'/participants/'+obj.participantId;
	delete obj.id;
	delete obj.participantId;
	obj.method = 'PUT';
	this.makeRequest(obj);
};

Participants.prototype.destroy = function(obj) {
	obj.path = '/v1/tournaments/'+obj.id+'/participants/'+obj.participantId;
	delete obj.id;
	delete obj.participantId;
	obj.method = 'DELETE';
	this.makeRequest(obj);
};

Participants.prototype.randomize = function(obj) {
	//workaround to exec CURL, not the best
	var cmd = 'curl -d "" https://'+this.options.get('username')+':'+this.options.get('apiKey')+'@api.challonge.com/v1/tournaments/'+obj.id+'/participants/randomize.'+this.options.get('format');
	function process(error, stdout, stderr) {
		var data = JSON.parse(stdout);
		obj.callback(null, data);
	}
	exec(cmd, process);
	

	/***********BUSTED*********/
	// [Error: Parse Error] bytesParsed: 0, code: 'HPE_INVALID_CONSTANT'
	// obj.path = 'v1/tournaments/'+obj.id+'/participants/randomize';
	// delete obj.id;
	// obj.method = 'PUT';
	// this.makeRequest(obj);
}