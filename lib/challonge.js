'use strict';

const parts = ['Client', 'Tournaments', 'Participants', 'Matches'];
parts.forEach(k => exports[k] = require('./api/' + k.toLowerCase())[k]);

/**
 * Generates a new API client.
 * @param  {object} options Options for the clients.
 * @return {object}         The API Client
 */
exports.createClient = function createClient(options) {
	const client = {};
	// Require each lib in ./api and instantiate a new instance of each object, passing the options we were passed.
	// Store for the user to reference via instance.resource.
	parts.forEach(k => client[k.toLowerCase()] = new exports[k](options));
	client.setSubdomain = subdomain => parts.forEach(k => client[k.toLowerCase()].setSubdomain(subdomain));

	return client;
};
