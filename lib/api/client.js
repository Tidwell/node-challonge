const qs = require('querystring');
const https = require('https');
const errorHandler = require('./error-handler');
const util = require('../util');

/**
 * @class Client
 * @param {object} options configuration options for this instance
 * @param {string} options.apiKey Your challonge API Key
 * @param {string} [options.subdomain] - Sets the subdomain and automatically passes tournament[subdomain] and prefixes the subdomain to tournament urls.  If you don't want to pass a subdomain to the constructor, and want to use an organization (or multiple organizations), you must use client.setSubdomain('subdomain') before making api calls.
 * @param {string} [options.format] The format of the response data. Defaults to 'json'.  If set to 'json', will return javascript objects.  Anything else (including 'xml') will return the raw text string.
 * @param {boolean} [options.massageProperties] If the response object should be massaged into camelCase properties when using json format.  Defaults to true.
 * @description
 *   Constructor function for the Client base responsible for communicating with Challonge API
 *   createClient takes one argument for configuration and returns an instance of the api client.
 *   You should never need to call new Client().  Instead, call challonge.createClient() and it will create
 *   a new instance and set defaults.
 * @example
const challonge = require('challonge');

const client = challonge.createClient({
	apiKey: '***yourAPIKey***'
});
 */
const Client = exports.Client = function(options) {
	this.options = options || {};
	// defaults - todo convert to an object merge
	if (!this.options.version) {
		this.options.version = 1;
	}
	if (typeof this.options.massageProperties === 'undefined') {
		this.options.massageProperties = true;
	}
	if (!this.options.format) {
		this.options.format = 'json';
	}

	this.setSubdomain(this.options.subdomain);

	// add a getter to the options passed in - DO NOT mess with instance configs in resources
	if (typeof this.options.get !== 'function') {
		this.options.get = function(key) { // not an arrow function to maintain "this" reference
			return this[key];
		};
	}
};

Client.prototype.setSubdomain = function(subdomain) {
	// generate the subdomain URL string if there is one
	if (!subdomain) {
		this.options.subdomain = '';
	} else if (subdomain[subdomain.length - 1] !== '-') {
		this.options.subdomain = subdomain + '-';
	} else {
		this.options.subdomain = subdomain;
	}
};

// cleans the passed in object, generates the API url/query-string, makes the request, delegates errors and calls callbacks
Client.prototype.makeRequest = function(obj) {
	const self = this;

	const propertiesToDelete = ['callback', 'path', 'method'];

	// cache vars that are to be removed
	const callback = obj.callback;
	const method = obj.method;
	let path = obj.path;

	// normalize the rest of the properties
	obj = util.convert(obj, util.camelToUnderscore);

	// Add on the api key
	obj.api_key = this.options.get('apiKey');
	obj.cache_bust = Math.random();

	// remove internal properties
	propertiesToDelete.forEach((prop) => {
		delete obj[prop];
	});

	// generate path
	const versionPaths = {
		1: '/v1/tournaments'
	};

	const serialized = util.serializeToQSParams(obj);

	path = versionPaths[this.options.get('version')] + (path ? path : '') + '.' + this.options.get('format') + '?' + serialized;

	// create options for the https call
	const options = {
		hostname: 'api.challonge.com',
		path: path,
		method: method,
		headers: {
			'Content-Length': 0 // server throws nginx error without a content-length
		}
	};

	const req = https.request(options, (res) => {
		// store the chunked data as it comes back
		let resData = '';
		res.on('data', (chunk) => {
			resData += chunk;
		});

		res.on('end', () => {
			// error
			if (res.statusCode !== 200) {
				errorHandler.handle(res, resData, callback, self.options.get('format'));
				return;
			}
			// 200 ok
			if (self.options.get('format') == 'json') {
				resData = JSON.parse(resData);
				if (self.options.get('massageProperties')) {
					resData = util.convert(resData, util.underscoreToCamel);
				}
			}
			callback(null, resData); //no error, so no err object
		});
	});

	req.end();
};
