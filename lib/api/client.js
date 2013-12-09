'use strict';

var qs = require('querystring');
var https = require('https');
var errorHandler = require('./error-handler');

/*
	### function Client (options)
	#### @options {Object} Options for this instance
	Constructor function for the Client base responsible
	for communicating with Challonge API
*/
var Client = exports.Client = function(options) {
	this.options = options;
	if (!this.options.version) { this.options.version = 1; }

	this.setSubdomain(this.options.subdomain);

	// add a getter to the options passed in - DO NOT mess with instance configs in resources
	if (typeof this.options.get !== 'function') {
		this.options.get = function(key) {
			return this[key];
		};
	}
};

// serialize nested params to tournament[name] style
function serializeProperties(obj) {
	var compiledParams = '';
	var serializedProperties = [];
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			if (typeof(obj[prop]) === 'object') {
				for (var attr in obj[prop]) {
					compiledParams += '&';
					compiledParams += prop + '[' + attr + ']=' + encodeURIComponent(obj[prop][attr]);
				}
				serializedProperties.push(prop);
			}
		}
	}
	return {
		serialized: compiledParams,
		properties: serializedProperties
	};
}

var propertiesToDelete = ['callback', 'path', 'method']; // resources generate props internal to https requests

//all the stuff we have to convert camelCase to underScores
var propertiesToConvert = [
	'create_after',
	'created_before',
	'include_participants',
	'include_matches',
	'tournament_type',
	'open_signup',
	'hold_third_place_match',
	'pts_for_match_win',
	'pts_for_match_tie',
	'pts_for_game_win',
	'pts_for_game_tie',
	'pts_for_bye',
	'swiss_rounds',
	'ranked_by',
	'rr_pts_for_match_win',
	'rr_pts_for_match_tie',
	'rr_pts_for_game_win',
	'rr_pts_for_game_tie',
	'accept_attachments',
	'hide_forum',
	'show_rounds',
	'notify_users_when_matches_open',
	'notify_users_when_the_tournament_ends',
	'sequential_pairings',
	'signup_cap',
	'challonge_username',
	'participant_id',
	'scores_csv',
	'winner_id',
	'player1_votes',
	'player2_votes',
];

Client.prototype.setSubdomain = function(subdomain) {
	//generate the subdomain URL string if there is one
	if (!subdomain) {
		this.options.subdomain = '';
	} else if (this.options.subdomain.indexOf('-') === -1) {
		this.options.subdomain = subdomain + '-';
	}
};

// cleans the passed in object, generates the API url/query-string, makes the request, delegates errors and calls callbacks
Client.prototype.makeRequest = function(obj) {
	var self = this;
	// cache vars that are about to be removed
	var callback = obj.callback;
	var path = obj.path;
	var method = obj.method;

	// massage camel to underscore
	obj.api_key = this.options.get('apiKey'); //convert for url

	//serialize the properties
	var serialized = serializeProperties(obj);
	var compiledParams = serialized.serialized;
	//merge the stuff to remove
	propertiesToDelete = propertiesToDelete.concat(serialized.properties);

	// remove params
	propertiesToDelete.forEach(function(prop) {
		delete obj[prop];
	});

	// generate path
	var versionPaths = {
		1: '/v1/tournaments'
	};
	path = versionPaths[this.options.get('version')] + (path ? path : '') + '.' + this.options.get('format') + '?' + qs.stringify(obj) + compiledParams;

	// create options for the https call
	var options = {
		hostname: 'api.challonge.com',
		path: path,
		method: method,
		headers: {
			'Content-Length': 0 // server throws nginx error without a content-length
		}
	};

	var req = https.request(options, function(res) {
		// store the chunked data as it comes back
		var resData = '';
		res.on('data', function(chunk) {
			resData += chunk;
		});

		res.on('end', function() {
			// error
			if (res.statusCode !== 200) {
				errorHandler.handle(res, resData, callback, self.options.get('format'));
				return;
			}
			// 200 ok
			if (self.options.get('format') == 'json') {
				resData = JSON.parse(resData);
			}
			callback(null, resData); //no error, so no err object
		});
	});

	req.end();
};