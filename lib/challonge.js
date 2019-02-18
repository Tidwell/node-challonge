const endpoints = ['Client', 'Tournaments', 'Participants', 'Matches'];

endpoints.forEach(endpointName => {
	exports[endpointName] = require('./api/' + endpointName.toLowerCase())[endpointName];
});

/**
 * @function createClient
 * @param {object} options configuration options for this instance
 * @param {string} options.apiKey Your challonge API Key
 * @param {string} [options.subdomain] - Sets the subdomain and automatically passes tournament[subdomain] and prefixes the subdomain to tournament urls.  If you don't want to pass a subdomain to the constructor, and want to use an organization (or multiple organizations), you must use client.setSubdomain('subdomain') before making api calls.
 * @param {string} [options.format] The format of the response data. Defaults to 'json'.  If set to 'json', will return javascript objects.  Anything else (including 'xml') will return the raw text string.
 * @param {number} [options.timeout] Duration in ms to wait for a timeout, passed to https request as timeout option
 * @param {boolean} [options.massageProperties] If the response object should be massaged into camelCase properties when using json format.  Defaults to true.
 * @returns {object} new api client instance
 * @description
 *   Generates a new API client.
 * @example
const challonge = require('challonge');

const client = challonge.createClient({
	apiKey: '***yourAPIKey***'
});
 */
exports.createClient = function createClient(options) {
	const client = {};

	// require each lib in ./api and instantiate a new instance of each object, passing the options we were passed
	endpoints.forEach(endpointName => {
		// store for the user to reference via instance.resource
		client[endpointName.toLowerCase()] = new exports[endpointName](options);
	});

	client.setSubdomain = subdomain => {
		endpoints.forEach(endpointName => {
			client[endpointName.toLowerCase()].setSubdomain(subdomain);
		});
	};

	return client;
};
