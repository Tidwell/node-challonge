const Challonge = require('./challonge');

describe('Challonge object', () => {
	it('should expose each of the api route class constructors', () => {
		expect(Challonge.Client).toBeDefined();
		expect(Challonge.Tournaments).toBeDefined();
		expect(Challonge.Participants).toBeDefined();
		expect(Challonge.Matches).toBeDefined();
	});

	it('should have a createClient method', () => {
		expect(Challonge.createClient).toBeDefined();
	});

	describe('createClient method', () => {
		let client;
		beforeEach(() => {
			client = Challonge.createClient({});
		});
		it('should return a new object with instantiated versions of the route classes', () => {
			expect(client.client).toBeDefined();
			expect(client.tournaments).toBeDefined();
			expect(client.participants).toBeDefined();
			expect(client.matches).toBeDefined();
		});
		it('should return a client with a setSubdomain method', () => {
			expect(client.setSubdomain).toBeDefined();
		});
		it('should not fail if created with no arguments', () => {
			client = Challonge.createClient();
		});
	});

	describe('client.setSubdomain method', () => {
		it('should proxy to setSubdomain on each of the clients route instances', () => {
			const client = Challonge.createClient({});

			spyOn(client.client, 'setSubdomain');
			spyOn(client.tournaments, 'setSubdomain');
			spyOn(client.participants, 'setSubdomain');
			spyOn(client.matches, 'setSubdomain');

			client.setSubdomain('somedomain');

			expect(client.client.setSubdomain).toHaveBeenCalled();
			expect(client.tournaments.setSubdomain).toHaveBeenCalled();
			expect(client.participants.setSubdomain).toHaveBeenCalled();
			expect(client.matches.setSubdomain).toHaveBeenCalled();
		});
	});
});
