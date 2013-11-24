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

	if (typeof this.options.get !== 'function') {
		this.options.get = function(key) {
			return this[key];
		};
	}
};

var propertiesToDelete = ['callback', 'path', 'method'];

// cleans the passed in object, generates the API url/query-string, makes the request, delegates errors and calls callbacks
Client.prototype.makeRequest = function(obj) {
	var err;

	// clean up the object to get ready to send it to the API
	var callback = obj.callback;
	var path = obj.path;
	var method = obj.method;
	obj.api_key = this.options.get('apiKey'); //convert for url

	var self = this;

	// serialize nested params to tournament[name] style
	var compiledParams = '';
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			if (typeof(obj[prop]) === 'object') {
				for (var attr in obj[prop]) {
					compiledParams += '&';
					compiledParams += prop + '[' + attr + ']=' + encodeURIComponent(obj[prop][attr]);
				}
				propertiesToDelete.push(prop);
			}
		}
	}

	propertiesToDelete.forEach(function(prop) {
		delete obj[prop];
	});

	//generate path
	path = path + '.' + this.options.get('format') + '?' + qs.stringify(obj) + compiledParams;

	var options = {
		hostname: 'api.challonge.com',
		path: path,
		method: method,
		headers: {
			'Content-Length': 0 //server throww nginx error without a content-length
		}
	};

	console.log('making request to ', path, options);

	var req = https.request(options, function(res) {
		var resData = '';
		res.on('data', function(chunk) {
			resData += chunk;
		});
		res.on('end', function() {
			//error
			if (res.statusCode !== 200) {
				errorHandler.handle(res, resData, callback);
				return;
			}
			// 200 ok
			if (self.options.get('format') == 'json') {
				resData = JSON.parse(resData);
			}
			callback(err, resData);
		});
	});

	req.end();
};