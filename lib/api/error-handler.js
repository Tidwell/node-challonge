// Response Codes
// The following HTTP response codes are issued by the API. All other codes are the result of a request not reaching the application.

// 200 - OK
// 401 - Invalid API key
// 404 - Object not found within your account scope
// 422 - Validation error(s) for create or update method

exports.handle = function(res, resData, callback, format) {
	var err;
	// 401 - Invalid API key
	if (res.statusCode === 401) {
		err = {
			error: true,
			errors: [],
			statusCode: res.statusCode,
			text: 'Invalid API key'
		};
		callback(err,res);
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
		callback(err,res);
		return;
	}

	// 422 - Validation error(s) for create or update method
	if (res.statusCode === 422) {
		if (format == 'json') { resData = JSON.parse(resData); }
		err = {
			error: true,
			errors: resData.errors,
			statusCode: res.statusCode,
			text: resData
		};
		callback(err, res);
		return;
	}

	// not an api-documented error
	err = {
		error: true,
		errors: [],
		statusCode:  res.statusCode,
		text: resData
	};

	// ship the response object back as the data
	callback(err, res);
	return;
}