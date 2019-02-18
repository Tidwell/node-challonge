const HandleFn = require('./error-handler').handle;

//exports.handle = function(res, resData, callback, format)

describe('error handler', () => {
	it('should throw an error if the statusCode is 401 402 or 404, or an unknown', () => {
		const errStatus = [401, 402, 404, 999];

		function cb(err, res) {
			expect(err).toBeDefined();
		}
		errStatus.forEach((status) => {
			HandleFn({
				statusCode: status
			}, {}, cb, 'json');
		});
	});

	it('should have error, errors, statusCode, and text props', () => {
		const errStatus = [401, 402, 404];

		function cb(err, res) {
			expect(err.error).toBeDefined(true);
			expect(typeof err.errors).toBeDefined([]);
			expect(errStatus.indexOf(err.statusCode) > -1).toBe(true);
			expect(err.text).toBeDefined();
		}
		errStatus.forEach((status) => {
			HandleFn({
				statusCode: status
			}, {}, cb, 'json');
		});
	});

	it('should parse resData as json if json is passed as a 422', () => {

		function cb(err, res) {
			expect(err.text).toEqual({
				some: 'prop'
			});
		}

		HandleFn({
			statusCode: 422
		}, '{"some":"prop"}', cb, 'json');

	});

	it('should throw the correct error on a timeout', () => {

		function cb(err, res) {
			expect(err).toEqual({
				error: true,
				errors: [],
				statusCode: 'timeout',
				text: ''
			});
		}

		HandleFn({
			timeout: true
		}, '', cb, 'json');

	});

	it('should not parse resData if not json type and passed as a 422', () => {

		function cb(err, res) {
			expect(err.text).toEqual('<prop>');
		}

		HandleFn({
			statusCode: 422
		}, '<prop>', cb, 'xml');

	});
});
