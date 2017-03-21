const util = require('util');
const Client = require('./client').Client;

/**
 * @class Tournaments
 * @param {object} options configuration options for this instance
 * @description
 *   Constructor function for the class to query Tournaments endpoints
 *   <pre>
 *     index    GET    tournaments
 *     create   POST   tournaments
 *     show     GET    tournaments/:tournament
 *     update   PUT    tournaments/:tournament
 *     destroy  DELETE tournaments/:tournament
 *     start    POST   tournaments/:tournament/start
 *     finalize POST   tournaments/:tournament/finalize
 *     reset    POST   tournaments/:tournament/reset
 *     process_check_ins    POST    tournaments/:tournament/process_check_ins
 *     abort_check_in    POST    tournaments/:tournament/abort_check_in
 *   </pre>
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

/**
 * @function
 * @memberof Tournaments
 * @param  {object} obj params to pass to the api request
 * @description
 *   Retrieve a set of tournaments created with your account.
 *   See the {@link http://api.challonge.com/v1/documents/tournaments/index|Challonge API Doc} for a full list of object properties.
 * @example

client.tournaments.index({
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Tournaments.prototype.index = function(obj) {
	obj.method = 'GET';
	if (this.getRawSubdomain()) {
		obj.subdomain = this.getRawSubdomain();
	}
	this.makeRequest(obj);
};

/**
 * @function
 * @memberof Tournaments
 * @param  {object} obj params to pass to the api request
 * @param {object} obj.tournament The tournament to create.  See challonge docs for available properties.
 * @param {function} obj.callback A method to call when the API returns.  Arguments are (error, data)
 * @description
 *   Create a new tournament.
 *   See the {@link http://api.challonge.com/v1/documents/tournaments/create|Challonge API Doc} for a full list of object properties.
 * @example

client.tournaments.create({
  tournament: {
    name: 'My Tournament',
    url: 'my-tournament-url',
    tournamentType: 'single elimination',
  },
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Tournaments.prototype.create = function(obj) {
	if (this.getRawSubdomain()) {
		obj.tournament.subdomain = this.getRawSubdomain();
	}
	obj.method = 'POST';
	this.makeRequest(obj);
};

/**
 * @function
 * @memberof Tournaments
 * @param  {object} obj params to pass to the api request
 * @param {string} obj.id The url of the tournament to get
 * @param {function} obj.callback A method to call when the API returns.  Arguments are (error, data)
 * @description
 *   Retrieve a single tournament record created with your account.
 *   See the {@link http://api.challonge.com/v1/documents/tournaments/show|Challonge API Doc} for a full list of object properties.
 * @example

client.tournaments.show({
  id: 'my-tournament-url',
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Tournaments.prototype.show = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id;
	delete obj.id;
	obj.method = 'GET';
	this.makeRequest(obj);
};

/**
 * @function
 * @memberof Tournaments
 * @param  {object} obj params to pass to the api request
 * @param {string} obj.id The url of the tournament to update
 * @param {function} obj.callback A method to call when the API returns.  Arguments are (error, data)
 * @param {object} obj.tournament The tournament object with updates.  See challonge docs for available properties.
 * @description
 *   Update a tournament's attributes.
 *   See the {@link http://api.challonge.com/v1/documents/tournaments/update|Challonge API Doc} for a full list of object properties.
 * @example

client.tournaments.update({
  id: 'my-tournament-url',
  tournament: {
    name: 'The New Tournament Name'
  },
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Tournaments.prototype.update = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id;
	delete obj.id;
	obj.method = 'PUT';
	this.makeRequest(obj);
};

/**
 * @function
 * @memberof Tournaments
 * @param  {object} obj params to pass to the api request
 * @param {string} obj.id The url of the tournament to remove
 * @param {function} obj.callback A method to call when the API returns.  Arguments are (error, data)
 * @description
 *   Deletes a tournament along with all its associated records. There is no undo, so use with care!
 *   See the {@link http://api.challonge.com/v1/documents/tournaments/destroy|Challonge API Doc} for a full list of object properties.
 * @example

client.tournaments.destroy({
  id: 'my-tournament-url',
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Tournaments.prototype.destroy = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id;
	delete obj.id;
	obj.method = 'DELETE';
	this.makeRequest(obj);
};

/**
 * @function
 * @memberof Tournaments
 * @param  {object} obj params to pass to the api request
 * @param {string} obj.id The url of the tournament to start
 * @param {function} obj.callback A method to call when the API returns.  Arguments are (error, data)
 * @description
 *   Start a tournament, opening up first round matches for score reporting. The tournament must have at least 2 participants.
 *   See the {@link http://api.challonge.com/v1/documents/tournaments/start|Challonge API Doc} for a full list of object properties.
 * @example

client.tournaments.start({
  id: 'my-tournament-url',
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Tournaments.prototype.start = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/start';
	delete obj.id;
	obj.method = 'POST';
	this.makeRequest(obj);
};

/**
 * @function
 * @memberof Tournaments
 * @param  {object} obj params to pass to the api request
 * @param {string} obj.id The url of the tournament to finalize
 * @param {function} obj.callback A method to call when the API returns.  Arguments are (error, data)
 * @description
 *   Finalize a tournament that has had all match scores submitted, rendering its results permanent.
 *   See the {@link http://api.challonge.com/v1/documents/tournaments/finalize|Challonge API Doc} for a full list of object properties.
 * @example

client.tournaments.finalize({
  id: 'my-tournament-url',
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Tournaments.prototype.finalize = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/finalize';
	delete obj.id;
	obj.method = 'POST';
	this.makeRequest(obj);
};

/**
 * @function
 * @memberof Tournaments
 * @param  {object} obj params to pass to the api request
 * @param {string} obj.id The url of the tournament to reset
 * @param {function} obj.callback A method to call when the API returns.  Arguments are (error, data)
 * @description
 *   Reset a tournament, clearing all of its scores and attachments. You can then add/remove/edit participants before starting the tournament again.
 *   See the {@link http://api.challonge.com/v1/documents/tournaments/reset|Challonge API Doc} for a full list of object properties.
 * @example

client.tournaments.reset({
  id: 'my-tournament-url',
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Tournaments.prototype.reset = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/reset';
	delete obj.id;
	obj.method = 'POST';
	this.makeRequest(obj);
};

/**
 * @function
 * @memberof Tournaments
 * @param  {object} obj params to pass to the api request
 * @param {string} obj.id The url of the tournament to processCheckIns
 * @param {function} obj.callback A method to call when the API returns.  Arguments are (error, data)
 * @description
 *   This should be invoked after a tournament's check-in window closes before the tournament is started.
 *   <pre>
        Marks participants who have not checked in as inactive.
        Moves inactive participants to bottom seeds (ordered by original seed).
        Transitions the tournament state from 'checking_in' to 'checked_in'
        NOTE: Checked in participants on the waiting list will be promoted if slots become available.
	  </pre>
 *   See the {@link http://api.challonge.com/v1/documents/tournaments/process_check_ins|Challonge API Doc} for a full list of object properties.
 * @example

client.tournaments.processCheckIns({
  id: 'my-tournament-url',
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Tournaments.prototype.processCheckIns = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/process_check_ins';
	delete obj.id;
	obj.method = 'POST';
	this.makeRequest(obj);
};

/**
 * @function
 * @memberof Tournaments
 * @param  {object} obj params to pass to the api request
 * @param {string} obj.id The url of the tournament to abortCheckIn
 * @param {function} obj.callback A method to call when the API returns.  Arguments are (error, data)
 * @description
 *   When your tournament is in a 'checking_in' or 'checked_in' state, there's no way to edit the tournament's start time (start_at) or check-in duration (check_in_duration). You must first abort check-in, then you may edit those attributes.
 *   <pre>
        Makes all participants active and clears their checked_in_at times.
        Transitions the tournament state from 'checking_in' or 'checked_in' to 'pending'
     </pre>
 *   See the {@link http://api.challonge.com/v1/documents/tournaments/abort_check_in|Challonge API Doc} for a full list of object properties.
 * @example

client.tournaments.abortCheckIn({
  id: 'my-tournament-url',
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Tournaments.prototype.abortCheckIn = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/abort_check_in';
	delete obj.id;
	obj.method = 'POST';
	this.makeRequest(obj);
};
