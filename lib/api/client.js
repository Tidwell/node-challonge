'use strict';

var qs = require('querystring');
var request = require('request');
var errorHandler = require('./error-handler');

/*
	### function Client (options)
	#### @options {Object} Options for this instance
	Constructor function for the Client base responsible
	for communicating with Challonge API
*/
var Client = exports.Client = function(options) {
	this.options = options;
	//defaults - todo convert to an object merge
	if (!this.options.version) {
		this.options.version = 1;
	}
	if (!this.options.massageProperties) {
		this.options.massageProperties = true;
	}
	if (!this.options.format) {
		this.options.format = 'json';
	}

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
			if (typeof(obj[prop]) === 'object' && obj[prop] !== null) {
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

// resources generate props internal to https requests
var propertiesToDelete = ['callback', 'path', 'method'];

function camelToUnderscore(str) {
	return str.replace(/\W+/g, '-')
		.replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
}

function UnderscoreToCamel(str) {
	return str.replace(/_([a-z])/g, function(g) {
		return g[1].toUpperCase();
	});
}

function convertProperties(obj, converionFunction) {
	//determine which we want to check with to see if we should convert
	var checkRegex = converionFunction === UnderscoreToCamel ? /_/ : /[A-Z]/;
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			//objects recurse
			if (typeof obj[prop] === 'object' && obj[prop] !== null) {
				obj[converionFunction(prop)] = convertProperties(obj[prop], converionFunction);
			}
			else if (prop.search(checkRegex) > -1) {
				obj[converionFunction(prop)] = obj[prop];
				//remove it
				delete obj[prop];
			}

			//otherwise leave it alone
		}
	}
	return obj;
}

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

	// normalize the rest of the properties
	obj = convertProperties(obj, camelToUnderscore);

	// Add on the api key
	obj.api_key = this.options.get('apiKey'); //convert for url
	obj.cache_bust = Math.random()
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
	path = versionPaths[this.options.get('version')] + (path ? path : '') + '.' + this.options.get('format');

	// create options for the https call
	var options = {
		baseUrl: 'https://api.challonge.com',
		url: path,
		qs: obj,
		method: method,
		headers: {
			'Content-Length': 0 // server throws nginx error without a content-length
		}
	};

	request.get(options, function (error, response, body) {
		if(error) {
			return;
		}

		if(response.statusCode !== 200){
			errorHandler.handle(response, body, callback, self.options.get('format'));
				return;
		}


		var resData = '';
		if (self.options.get('format') === 'json') {
			resData = JSON.parse(body);
			if (self.options.get('massageProperties')) {
				resData = convertProperties(resData,UnderscoreToCamel);
			}
		}
		callback(null, resData); //no error, so no err object
	});
};