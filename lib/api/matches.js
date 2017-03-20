const util = require('util');
const Client = require('./client').Client;

/**
 * @class Matches
 * @param {object} options configuration options for this instance
 * @description
 *   Constructor function for the class to query Matches endpoints
 *   <pre>
 *     index    GET  tournaments/:tournament/matches
 *     show     GET  tournaments/:tournament/matches/:match_id
 *     update   PUT  tournaments/:tournament/matches/:match_id
 *   </pre>
 */
const Matches = exports.Matches = function(options) {
	Client.call(this, options); // call parent constructor
};

// inherit from Client base object
util.inherits(Matches, Client);

/**
 * @function
 * @memberof Matches
 * @param  {object} obj params to pass to the api request
 * @param {string} obj.id The url of the tournament to get the matches from
 * @param {function} obj.callback A method to call when the API returns.  Arguments are (error, data)
 * @description
 *   Retrieve a tournament's match list.
 *   See the {@link http://api.challonge.com/v1/documents/matches/index|Challonge API Doc} for a full list of object properties.
 * @example

client.matches.index({
  id: 'my-tournament-url',
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Matches.prototype.index = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/matches';
	delete obj.id;
	obj.method = 'GET';
	this.makeRequest(obj);
};

/**
 * @function
 * @memberof Matches
 * @param  {object} obj params to pass to the api request
 * @param {string} obj.id The url of the tournament to get the match from
 * @param {string} obj.matchId The id of the match to get
 * @param {function} obj.callback A method to call when the API returns.  Arguments are (error, data)
 * @description
 *   Retrieve a single match record for a tournament.
 *   See the {@link http://api.challonge.com/v1/documents/matches/show|Challonge API Doc} for a full list of object properties.
 * @example

client.matches.show({
  id: 'my-tournament-url',
  matchId: '12345678',
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Matches.prototype.show = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/matches/' + obj.matchId;
	delete obj.id;
	delete obj.matchId;
	obj.method = 'GET';
	this.makeRequest(obj);
};

/**
 * @function
 * @memberof Matches
 * @param  {object} obj params to pass to the api request
 * @param {string} obj.id The url of the tournament to update the match in
 * @param {string} obj.matchId The id of the match to update
 * @param {object} obj.match The match object with updates.  See challonge docs for available properties.
 * @param {function} obj.callback A method to call when the API returns.  Arguments are (error, data)
 * @description
 *   Update/submit the score(s) for a match.
 *   See the {@link http://api.challonge.com/v1/documents/matches/update|Challonge API Doc} for a full list of object properties.
 * @example

client.matches.update({
  id: 'my-tournament-url',
  matchId: '12345678',
  match: {
    scoresCsv: '3-0',
    winnerId: '678910'
  },
  callback: (err, data) => {
    console.log(err, data);
  }
});

 */
Matches.prototype.update = function(obj) {
	obj.path = '/' + this.options.get('subdomain') + obj.id + '/matches/' + obj.matchId;
	delete obj.id;
	delete obj.matchId;
	obj.method = 'PUT';
	this.makeRequest(obj);
};
