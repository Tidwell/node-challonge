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

	// add a getter to the options passed in - DO NOT mess with instance configs in resources
	if (typeof this.options.get !== 'function') {
		this.options.get = function(key) {
			return this[key];
		};
	}
};

// serialize nested params to tournament[name] style
function serializeProperties(obj) {
	console.log(obj)
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