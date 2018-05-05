const util = require('util');
const Client = require('./client').Client;

/**
 * @class Participants
 * @param {object} options configuration options for this instance
 * @description
 *   Constructor function for the class to query Participants endpoints
 *   <pre>
 *     index     GET     tournaments/:tournament/participants
 *     create    POST    tournaments/:tournament/participants
 *     show      GET     tournaments/:tournament/participants/:participant_id
 *     update    PUT     tournaments/:tournament/participants/:participant_id
 *     destroy   DELETE  tournaments/:tournament/participants/:participant_id
 *     randomize GET     tournaments/:tournament/participants/randomize
 *   </pre>
 */
const Participants = exports.Participants = function(options) {
	Client.call(this, options); // call parent constructor
};

// inherit from Client base object
util.inherits(Participants, Client);


/**
 * @function
 * @memberof Participants
 * @param {object} obj params to pass to the api request
 * @param {string} obj.id The url of the tournament to get the participants from
 * @param {function} obj.callback A method to call when the API returns.  Arguments are (error, data)
 * @description
 *   Retrieve a tournament's participant list.
 *   See the {@link http://api.challonge.com/v1/documents/participants/index|Challonge API Doc} for a full list of object properties.
 * @example

client.participants.index({
  id: 'my-tournament-url',
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Participants.prototype.index = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/participants';
	delete obj.id;
	obj.method = 'GET';
	this.makeRequest(obj);
};

/**
 * @function
 * @memberof Participants
 * @param  {object} obj params to pass to the api request
 * @param {string} obj.id The url of the tournament to create the participants in
 * @param {object} obj.participant The participant to create.  See challonge docs for available properties.
 * @param {function} obj.callback A method to call when the API returns.  Arguments are (error, data)
 * @description
 *   Add a participant to a tournament (up until it is started).
 *   See the {@link http://api.challonge.com/v1/documents/participants/create|Challonge API Doc} for a full list of object properties.
 * @example

client.participants.create({
  id: 'my-tournament-url',
  participant: {
    name: 'Bob the Awesome'
  },
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Participants.prototype.create = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/participants';
	delete obj.id;
	obj.method = 'POST';
	this.makeRequest(obj);
};

/**
 * @function
 * @memberof Participants
 * @param  {object} obj params to pass to the api request
 * @param {string} obj.id The url of the tournament to get a participant in
 * @param {string} obj.participantId OR obj.participant_id The id of the participant to get
 * @param {function} obj.callback A method to call when the API returns.  Arguments are (error, data)
 * @description
 *   Retrieve a single participant record for a tournament.
 *   See the {@link http://api.challonge.com/v1/documents/participants/show|Challonge API Doc} for a full list of object properties.
 * @example

client.participants.show({
  id: 'my-tournament-url',
  participantId: '123456',
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Participants.prototype.show = function(obj) {
	obj = this.convertCamelToUnderscoreProperties(obj);
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/participants/' + obj.participant_id;
	delete obj.id;
	delete obj.participant_id;
	obj.method = 'GET';
	this.makeRequest(obj);
};

/**
 * @function
 * @memberof Participants
 * @param  {object} obj params to pass to the api request
 * @param {string} obj.id The url of the tournament to update a participant in
 * @param {string} obj.participantId OR obj.participant_id The id of the participant to update
 * @param {object} obj.participant The participant object with updates.  See challonge docs for available properties.
 * @param {function} obj.callback A method to call when the API returns.  Arguments are (error, data)
 * @description
 *   Update the attributes of a tournament participant.
 *   See the {@link http://api.challonge.com/v1/documents/participants/update|Challonge API Doc} for a full list of object properties.
 * @example

client.participants.update({
  id: 'my-tournament-url',
  participantId: '123456',
  participant: {
    name: 'Bob the Super Awesome'
  },
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Participants.prototype.update = function(obj) {
	obj = this.convertCamelToUnderscoreProperties(obj);
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/participants/' + obj.participant_id;
	delete obj.id;
	delete obj.participant_id;
	obj.method = 'PUT';
	this.makeRequest(obj);
};

/**
 * @function
 * @memberof Participants
 * @param  {object} obj params to pass to the api request
 * @param {string} obj.id The url of the tournament to remove a participant from
 * @param {string} obj.participantId OR obj.participant_id The id of the participant to remove
 * @param {function} obj.callback A method to call when the API returns.  Arguments are (error, data)
 * @description
 *   If the tournament has not started, delete a participant, automatically filling in the abandoned seed number. If tournament is underway, mark a participant inactive, automatically forfeiting his/her remaining matches.
 *   See the {@link http://api.challonge.com/v1/documents/participants/destroy|Challonge API Doc} for a full list of object properties.
 * @example

client.participants.destroy({
  id: 'my-tournament-url',
  participantId: '123456',
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Participants.prototype.destroy = function(obj) {
	obj = this.convertCamelToUnderscoreProperties(obj);
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/participants/' + obj.participant_id;
	delete obj.id;
	delete obj.participant_id;
	obj.method = 'DELETE';
	this.makeRequest(obj);
};

/**
 * @function
 * @memberof Participants
 * @param  {object} obj params to pass to the api request
 * @param {string} obj.id The url of the tournament to randomize the participant seeds in
 * @param {function} obj.callback A method to call when the API returns.  Arguments are (error, data)
 * @description
 *   Randomize seeds among participants. Only applicable before a tournament has started.
 *   See the {@link http://api.challonge.com/v1/documents/participants/randomize|Challonge API Doc} for a full list of object properties.
 * @example

client.participants.randomize({
  id: 'my-tournament-url',
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Participants.prototype.randomize = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/participants/randomize';
	delete obj.id;
	obj.method = 'POST';
	this.makeRequest(obj);
};
