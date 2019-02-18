/**
 * @module ErrorHandler
 * @description
 *   Internally used to handle errors from the API
 */

/** 
 * @function
 * @methodof ErrorHandler
 * 
 * @param  {object}   res      the http response object
 * @param  {object}   resData  the data contained in the response
 * @param  {Function} callback the users callback function to call
 * @param  {string}   format   the format of the response data (json, xml, etc)
 * @description
 *   Handles HTTP response codes issued by the API.
 *   All other codes are the result of a request not reaching the application.
 */
exports.handle = function(res, resData, callback, format) {
	let err;
	// 401 - Invalid API key
	if (res.statusCode === 401) {
		err = {
			error: true,
			errors: [],
			statusCode: res.statusCode,
			text: 'Invalid API key'
		};
		callback(err, res);
		return;
	}

	// 404 - Object not found within your account scope
	if (res.statusCode === 404) {
		err = {
			error: true,
			errors: [],
			statusCode: res.statusCode,
			text: 'Object not found within your account scope'
		};
		callback(err, res);
		return;
	}

	// 422 - Validation error(s) for create or update method
	if (res.statusCode === 422) {
		if (format === 'json') {
			resData = JSON.parse(resData);
		}
		err = {
			error: true,
			errors: resData.errors,
			statusCode: res.statusCode,
			text: resData
		};
		callback(err, res);
		return;
	}

	if (res.timeout) {
		err = {
			error: true,
			errors: [],
			statusCode: 'timeout',
			text: ''
		};
		callback(err, res);
		return;
	}

	// not an api-documented error
	err = {
		error: true,
		errors: [],
		statusCode: res.statusCode,
		text: resData
	};

	// ship the response object back as the data
	callback(err, res);
	return;
};
