var Client = require('./client').Client;

describe('Client Class', () => {
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
});
