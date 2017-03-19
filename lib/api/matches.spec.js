const Matches = require('./matches').Matches;
const Client = require('./client').Client;

let matchesInstance;
describe('matches endpoints', () => {
	beforeEach(() => {
		matchesInstance = new Matches();
	});

	describe('matches constructor', () => {
		it('should inherit from the client', () => {
			expect(Object.getPrototypeOf(Matches.prototype)).toBe(Client.prototype);
		});
	});
	// index	GET	tournaments/:tournament/matches
	describe('index', () => {
		it('should create an appropriate url without a subdomain', () => {
			matchesInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/25/matches',
					method: 'GET'
				});
			};
			matchesInstance.index({
				id: 25
			});
		});

		it('should create an appropriate url with a subdomain', () => {
			matchesInstance.options.subdomain = 'somedomain-';
			matchesInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/somedomain-25/matches',
					method: 'GET'
				});
			};
			matchesInstance.index({
				id: 25
			});
		});
	});

	// show	GET	tournaments/:tournament/matches/:match_id
	describe('show', () => {
		it('should create an appropriate url without a subdomain', () => {
			matchesInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/25/matches/123',
					method: 'GET'
				});
			};
			matchesInstance.show({
				id: 25,
				matchId: 123
			});
		});

		it('should create an appropriate url with a subdomain', () => {
			matchesInstance.options.subdomain = 'somedomain-';
			matchesInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/somedomain-25/matches/123',
					method: 'GET'
				});
			};
			matchesInstance.show({
				id: 25,
				matchId: 123
			});
		});
	});

	// update	PUT	tournaments/:tournament/matches/:match_id
	describe('update', () => {
		it('should create an appropriate url without a subdomain', () => {
			matchesInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/25/matches/123',
					method: 'PUT'
				});
			};
			matchesInstance.update({
				id: 25,
				matchId: 123
			});
		});

		it('should create an appropriate url with a subdomain', () => {
			matchesInstance.options.subdomain = 'somedomain-';
			matchesInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/somedomain-25/matches/123',
					method: 'PUT'
				});
			};
			matchesInstance.update({
				id: 25,
				matchId: 123
			});
		});
	});
});
