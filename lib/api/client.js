const qs = require('querystring');
const https = require('https');
const errorHandler = require('./error-handler');

/**
 * @class Client(options)
 * @param {object} options configuration options for this instance
 * @description
 *   Constructor function for the Client base responsible for communicating with Challonge API
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

// serialize nested params to tournament[name] style
function serializeProperties(obj) {
	let compiledParams = '';
	let serializedProperties = [];
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop) && typeof obj[prop] === 'object' && obj[prop] !== null) {
			for (let attr in obj[prop]) {
				compiledParams += '&' + prop + '[' + attr + ']=' + encodeURIComponent(obj[prop][attr]);
			}
			serializedProperties.push(prop);
		}
	}
	return {
		serialized: compiledParams,
		properties: serializedProperties
	};
}

// resources generate props internal to https requests
let propertiesToDelete = ['callback', 'path', 'method'];

function camelToUnderscore(str) {
	return str.replace(/\W+/g, '-')
		.replace(/([a-z\d])([A-Z])/g, '$1_$2')
		.toLowerCase();
}

function UnderscoreToCamel(str) {
	return str.replace(/_([a-z])/g, g => g[1].toUpperCase());
}

function convertProperties(obj, conversionFunction) {
	// determine which we want to check with to see if we should convert
	const checkRegex = conversionFunction === UnderscoreToCamel ? /_/ : /[A-Z]/;
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			// objects recurse
			if (typeof obj[prop] === 'object' && obj[prop] !== null) {
				obj[conversionFunction(prop)] = convertProperties(obj[prop], conversionFunction);
			} else if (prop.search(checkRegex) > -1) {
				obj[conversionFunction(prop)] = obj[prop];
				delete obj[prop]; // remove it
			}

		//otherwise leave it alone
		}
	}
	return obj;
}

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
	// cache vars that are about to be removed
	const callback = obj.callback;
	const method = obj.method;
	let path = obj.path;

	// normalize the rest of the properties
	obj = convertProperties(obj, camelToUnderscore);

	// Add on the api key
	obj.api_key = this.options.get('apiKey'); //convert for url
	obj.cache_bust = Math.random();

	// serialize the properties
	const serialized = serializeProperties(obj);

	// get the non-standard-formatted properties (this is to support the tournament[score] kind of params the api expects)
	const compiledParams = serialized.serialized;

	// merge the stuff to remove
	propertiesToDelete = propertiesToDelete.concat(serialized.properties);

	// remove params
	propertiesToDelete.forEach((prop) => {
		delete obj[prop];
	});

	// generate path
	const versionPaths = {
		1: '/v1/tournaments'
	};
	path = versionPaths[this.options.get('version')] + (path ? path : '') + '.' + this.options.get('format') + '?' + qs.stringify(obj) + compiledParams;

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
					resData = convertProperties(resData, UnderscoreToCamel);
				}
			}
			callback(null, resData); //no error, so no err object
		});
	});

	req.end();
};
