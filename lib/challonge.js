const endpoints = ['Client', 'Tournaments', 'Participants', 'Matches'];

endpoints.forEach(endpointName => {
	exports[endpointName] = require('./api/' + endpointName.toLowerCase())[endpointName];
});

/**
 * @function createClient(options)
 * @methodof modules:Client
 * @param {object} options configuration options for this instance
 * @returns {object} new api client instance
 * @description
 *   Generates a new API client.
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
