'use strict';

var qs = require('querystring');
var https = require('https');

//
// ### function Client (options)
// #### @options {Object} Options for this instance
// Constructor function for the Client base responsible
// for communicating with Challonge API
//
var Client = exports.Client = function(options) {
	this.options = options;

	if (typeof this.options.get !== 'function') {
		this.options.get = function(key) {
			return this[key];
		};
	}
};

var propertiesToDelete = ['callback', 'path', 'method'];

//method used to actually make the request to the challonge servers
Client.prototype.makeRequest = function(obj) {
	var err;

	//clean up the object to get ready to send it to the API
	var callback = obj.callback;
	var path = obj.path;
	var format = this.options.get('format');
	var method = obj.method;
	obj.api_key = this.options.get('apiKey'); //convert for url

	//serialize nested params to tournament[name] style
	var compiledParams = '';
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			if (typeof(obj[prop]) === 'object') {
				for (var attr in obj[prop]) {
					compiledParams += '&';
					compiledParams += prop+'['+attr+']='+encodeURIComponent(obj[prop][attr]);
				}
				propertiesToDelete.push(prop);
			}
		}
	}

	propertiesToDelete.forEach(function(prop){ delete obj[prop]; });

	//generate path
	path = path + '.' + format + '?' + qs.stringify(obj) + compiledParams;

	var options = {
		hostname: 'api.challonge.com',
		path: path,
		method: method,
		headers: {
			'Content-Length': 0 //server throww nginx error without a content-length
		}
	};

	console.log('making request to ', path, options);

	var req = https.request(options, function(res) {
		var resData = '';
		res.on('data', function(chunk) {
			resData += chunk;
		});
		res.on('end', function() {
			if (res.statusCode !== 200) {
				// 422 - Validation error(s) for create or update method - we can parse these
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

				// 404 - Object not found within your account scope - we can parse this
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

				// we cant parse the error
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
			// 200 ok
			if (format == 'json') { resData = JSON.parse(resData); }
			callback(err, resData);
		});
	});

	req.end();
};

process.on('uncaughtException',function(error){
  console.log(error);
  console.log("hmph");
});