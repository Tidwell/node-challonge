'use strict';

const qs = require('querystring');
const request = require('request');
const errorHandler = require('./error-handler');

/**
 * Constructor function for the Client base.
 * Responsible for communicating with Challonge API.
 * @param {object} options Options for this instance.
 */
const Client = exports.Client = function(options) {
	this.options = options;
	// Defaults - todo convert to an object merge.
	if (!this.options.version) this.options.version = 1;
	if (!this.options.massageProperties) this.options.massageProperties = true;
	if (!this.options.format) this.options.format = 'json';

	this.setSubdomain(this.options.subdomain);

	// Add a getter to the options passed in.
	// DO NOT mess with instance configs in resources.
	if (typeof this.options.get !== 'function')
		this.options.get = function(key) {
			return this[key];
		};
};

// Serialize nested params to tournament[name] style.
function serializeProperties(obj) {
	let compiledParams = '';
	const serializedProperties = [];
	for (const prop in obj)
		if (obj.hasOwnProperty(prop) && typeof(obj[prop]) === 'object' && obj[prop] !== null) {
			for (const attr in obj[prop])
				compiledParams += '&' + prop + '[' + attr + ']=' + encodeURIComponent(obj[prop][attr]);
			serializedProperties.push(prop);
		}
	return {
		serialized: compiledParams,
		properties: serializedProperties
	};
}

// resources generate props internal to https requests
let propertiesToDelete = [ 'callback', 'path', 'method' ];

function camelToUnderscore(str) {
	return str.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
}

function UnderscoreToCamel(str) {
	return str.replace(/_([a-z])/g, g => g[1].toUpperCase());
}

function convertProperties(obj, conversionFunction) {
	// Determine which we want to check with to see if we should convert.
	const checkRegex = conversionFunction === UnderscoreToCamel ? /_/ : /[A-Z]/;
	for (const prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			// Objects recurse.
			if (typeof obj[prop] === 'object' && obj[prop] !== null)
				obj[conversionFunction(prop)] = convertProperties(obj[prop], conversionFunction);
			else if (prop.search(checkRegex) > -1) {
				obj[conversionFunction(prop)] = obj[prop];
				delete obj[prop]; // Remove it.
			}

			//otherwise leave it alone
		}
	}
	return obj;
}

Client.prototype.setSubdomain = function (subdomain) {
	// Generate the subdomain URL string if there is one.
	if (!subdomain)
		this.options.subdomain = '';
	else if (this.options.subdomain.indexOf('-') === -1)
		this.options.subdomain = subdomain + '-';
	
};

// Cleans the passed in object, generates the API url/query-string, makes the request, delegates errors and calls callbacks.
Client.prototype.makeRequest = function (obj) {
	const self = this;
	// Cache vars that are about to be removed.
	const callback = obj.callback;
	const method = obj.method;
	let path = obj.path;

	// Normalize the rest of the properties.
	obj = convertProperties(obj, camelToUnderscore);

	// Add on the api key.
	obj.api_key = this.options.get('apiKey'); // Convert for url.
	obj.cache_bust = Math.random();

	// Serialize the properties.
	const serialized = serializeProperties(obj);
	const compiledParams = serialized.serialized;

	// Generate path.
	const versionPaths = { 1: '/v1/tournaments' };
	path = versionPaths[this.options.get('version')] + (path ? path : '') + '.' + this.options.get('format');

	// The callback of the request.
	const requestCallback = (error, response, body) => {
		if (error) return;
		if (response.statusCode !== 200) {
			errorHandler.handle(response, body, callback, self.options.get('format'));
			return;
		}
		let resData = '';
		if (self.options.get('format') === 'json') {
			resData = typeof body === 'object' ? body : JSON.parse(body);
			if (self.options.get('massageProperties'))
				resData = convertProperties(resData, UnderscoreToCamel);
		}
		callback(null, resData);
	};

	const methodLow = method.toLowerCase();

	// Merges parameters that are not needed for a GET request.
	if (methodLow === 'get' && serialized.properties.length > 0)
		propertiesToDelete = propertiesToDelete.concat(serialized.properties);
	// Remove params.
	propertiesToDelete.forEach(prop => delete obj[prop]);

	// Filter for request method.
	switch (methodLow) {
		case 'get':
			const options = {
				baseUrl: 'https://api.challonge.com',
				url: path,
				qs: obj,
				method: method,
				headers: {
					'Content-Length': 0 // Server throws nginx error without a content-length.
				}
			};
			request.get(options, requestCallback);
			break;
		case 'post': {
			const options = { qs: obj, json: true };
			const url = 'https://api.challonge.com' + path;
			request.post(url, options, requestCallback);
			break;
		}
	}
};