const qs = require('querystring');

const Client = require('./client').Client;
const errorHandler = require('./error-handler');

const httpsMock = require('https'); //replaced with mock by mockery

function parseOpts() {
	return qs.parse(httpsMock.opts.path.split('?')[1]);
}

describe('Client Class', () => {
	beforeEach(() => {
		httpsMock.reset();
	});
	describe('constructor', () => {
		it('should set options to the object that is passed', () => {
			const opts = {};
			const client = new Client(opts);

			expect(client.options).toBe(opts);
		});

		it('should default the version to 1 or use the number passed', () => {
			expect(new Client().options.version).toBe(1);
			expect(new Client({
				version: 10
			}).options.version).toBe(10);
		});

		it('should set massageProperties to true by default, or override to false if passed', () => {
			expect(new Client().options.massageProperties).toBe(true);
			expect(new Client({
				massageProperties: false
			}).options.massageProperties).toBe(false);
		});

		it('should set the format to json by default, or override if passed', () => {
			expect(new Client().options.format).toBe('json');
			expect(new Client({
				format: 'xml'
			}).options.format).toBe('xml');
		});

		it('should set the subdomain to whatever was passed', () => {
			spyOn(Client.prototype, 'setSubdomain');
			const client = new Client({
				subdomain: 'somedomain'
			});

			expect(Client.prototype.setSubdomain).toHaveBeenCalledWith('somedomain');
		});

		it('should attach a getter to the options object', () => {
			const client = new Client();

			expect(typeof client.options.get).toBe('function');
		});

		it('should attach a getter to the options object', () => {
			const client = new Client();

			expect(typeof client.options.get).toBe('function');

			client.options.someProp = 'someVal';
			expect(client.options.get('someProp')).toBe('someVal');
		});
	});

	describe('setSubdomain', () => {
		let client;

		beforeEach(() => {
			client = new Client();
		});

		it('should set the subdomain to an empty string if it is not passed', () => {
			[null, '', undefined, false].forEach(prop => {
				client.setSubdomain(prop);
				expect(client.options.subdomain).toBe('');
			});
		});

		it('should set the subdomain to a passed value and append a -', () => {
			client.setSubdomain('mydomain');
			expect(client.options.subdomain).toBe('mydomain-');
		});

		it('should not append a - if the subdomain already has a dash', () => {
			expect(client.options.subdomain).toBe('');
			client.setSubdomain('mydomain-');
			expect(client.options.subdomain).toBe('mydomain-');
		});

		it('should still append a - if the subdomain has a dash in the middle', () => {
			expect(client.options.subdomain).toBe('');
			client.setSubdomain('my-domain');
			expect(client.options.subdomain).toBe('my-domain-');
		});
	});

	describe('makeRequest', () => {
		let client;

		beforeEach(() => {
			client = new Client();
		});

		it('should convert camelCased properties to underscores', () => {
			client.makeRequest({
				path: '/some/path',
				method: 'GET',
				someProperty: 'thing',
				anotherProperty: 'anotherthing'
			});

			const opts = parseOpts();

			expect(opts.some_property).toBe('thing');
			expect(opts.another_property).toBe('anotherthing');
		});

		it('should recurse down properties to camelCase to underscore', () => {
			client.makeRequest({
				path: '/some/path',
				method: 'GET',
				someProperty: {
					anotherProperty: 'anotherthing'
				}
			});

			const opts = parseOpts();

			expect(opts['some_property[another_property]']).toBe('anotherthing');
		});

		it('should recurse down properties to camelCase but not parent prototype props', () => {
			const parent = Object.create({});
			parent.something = 'a thing';

			const child = Object.create(parent);

			child.path = '/some/path';
			child.method = 'GET';
			child.someProperty = {
				anotherProperty: 'anotherthing'
			};

			expect(child.something).toBe('a thing');
			client.makeRequest(child);

			const opts = parseOpts();

			expect(opts['some_property[another_property]']).toBe('anotherthing');
			expect(opts.something).not.toBeDefined();
		});

		it('should add the api key to request', () => {
			client.options.apiKey = 'mykey';
			client.makeRequest({});

			const opts = parseOpts();
			expect(opts.api_key).toBe('mykey');
		});

		it('should add a random cache busting value', () => {
			client.options.apiKey = 'mykey';
			client.makeRequest({});

			const opts = parseOpts();
			expect(opts.cache_bust).toBeDefined();
		});

		it('should add a timeout if one is passed', () => {
			client.options.timeout = 20000;
			client.makeRequest({});

			expect(httpsMock.opts.timeout).toEqual(20000);
		});

		it('should delete the callback, path, and method from the object', () => {
			client.makeRequest({
				callback: '',
				path: '',
				method: ''
			});

			const opts = parseOpts();
			expect(opts.callback).not.toBeDefined();
			expect(opts.path).not.toBeDefined();
			expect(opts.method).not.toBeDefined();
		});

		it('should make an https request with the correct properties', () => {
			spyOn(Math, 'random').and.returnValue(1);
			client.options.apiKey = 'mykey';
			client.makeRequest({
				method: 'PUT'
			});

			expect(httpsMock.opts).toEqual({
				hostname: 'api.challonge.com',
				path: '/v1/tournaments.json?api_key=mykey&cache_bust=1',
				method: 'PUT',
				headers: {
					'Content-Length': 0
				}
			});
		});

		it('should make an https request with the correct properties when there is complex data', () => {
			spyOn(Math, 'random').and.returnValue(1);
			client.options.apiKey = 'mykey';
			client.makeRequest({
				path: '/some/path',
				method: 'GET',
				randomprop: 'thingie',
				someProperty: {
					anotherProperty: 'anotherthing'
				}
			});

			expect(httpsMock.opts).toEqual({
				hostname: 'api.challonge.com',
				path: '/v1/tournaments/some/path.json?randomprop=thingie&some_property%5Banother_property%5D=anotherthing&api_key=mykey&cache_bust=1',
				method: 'GET',
				headers: {
					'Content-Length': 0
				}
			});
		});

		it('should make a request with escaped data for extended characters', () => {
			spyOn(Math, 'random').and.returnValue(1);
			client.options.apiKey = 'mykey';
			client.makeRequest({
				path: '/some/path',
				method: 'GET',
				randomprop: '扶摇ståleSÓLO独播'
			});

			expect(httpsMock.opts).toEqual({
				hostname: 'api.challonge.com',
				path: '/v1/tournaments/some/path.json?randomprop=%E6%89%B6%E6%91%87st%C3%A5leS%C3%93LO%E7%8B%AC%E6%92%AD&api_key=mykey&cache_bust=1',
				method: 'GET',
				headers: {
					'Content-Length': 0
				}
			});
		});

		it('should call the error handler on a timeout', () => {
			spyOn(errorHandler, 'handle');

			client.makeRequest({});

			httpsMock.reqListeners.timeout[0]();
			expect(errorHandler.handle).toHaveBeenCalledWith({
				timeout: true
			}, '', undefined, 'json');
		});

		it('should call the error handler on anything but a 200 response', () => {
			spyOn(errorHandler, 'handle');

			client.makeRequest({});
			httpsMock.res.statusCode = 500;

			httpsMock.listeners.end[0]();
			expect(errorHandler.handle).toHaveBeenCalled();
		});

		it('should call the callback on a 200 response', () => {
			const spy = jasmine.createSpy();

			client.makeRequest({
				callback: spy
			});
			httpsMock.res.statusCode = 200;

			httpsMock.listeners.data[0]('{}');
			httpsMock.listeners.end[0]();
			expect(spy).toHaveBeenCalled();
		});


		it('should parse the response as json', () => {
			const spy = jasmine.createSpy();

			client.makeRequest({
				callback: spy
			});
			httpsMock.res.statusCode = 200;

			httpsMock.listeners.data[0]('{}');
			httpsMock.listeners.end[0]();
			expect(spy).toHaveBeenCalledWith(null, {});
		});

		it('should convert _ to camelCase if set', () => {
			const spy = jasmine.createSpy();

			client.makeRequest({
				callback: spy
			});
			httpsMock.res.statusCode = 200;

			httpsMock.listeners.data[0]('{"some_prop": 123}');
			httpsMock.listeners.end[0]();
			expect(spy).toHaveBeenCalledWith(null, {
				someProp: 123
			});
		});

		it('should not convert _ to camelCase if unset', () => {
			const spy = jasmine.createSpy();

			client.options.massageProperties = false;
			client.makeRequest({
				callback: spy
			});
			httpsMock.res.statusCode = 200;

			httpsMock.listeners.data[0]('{"some_prop": 123}');
			httpsMock.listeners.end[0]();
			expect(spy).toHaveBeenCalledWith(null, {
				some_prop: 123
			});
		});

		it('should not parse the response as json if set to another format', () => {
			const spy = jasmine.createSpy();

			client.options.format = 'xml';
			client.makeRequest({
				callback: spy
			});
			httpsMock.res.statusCode = 200;

			httpsMock.listeners.data[0]('<bla>');
			httpsMock.listeners.end[0]();
			expect(spy).toHaveBeenCalledWith(null, '<bla>');
		});
	});
});
