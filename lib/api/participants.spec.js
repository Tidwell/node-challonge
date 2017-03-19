const Participants = require('./participants').Participants;
const Client = require('./client').Client;

let participantsInstance;
describe('participants endpoints', () => {
	beforeEach(() => {
		participantsInstance = new Participants();
	});

	describe('participants constructor', () => {
		it('should inherit from the client', () => {
			expect(Object.getPrototypeOf(Participants.prototype)).toBe(Client.prototype);
		});
	});

	// index	GET	tournaments/:tournament/participants
	describe('index', () => {
		it('should create an appropriate url without a subdomain', () => {
			participantsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/25/participants',
					method: 'GET'
				});
			};
			participantsInstance.index({
				id: 25
			});
		});
		it('should create an appropriate url with a subdomain', () => {
			participantsInstance.options.subdomain = 'somedomain-';
			participantsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/somedomain-25/participants',
					method: 'GET'
				});
			};
			participantsInstance.index({
				id: 25
			});
		});
	});

	// create	POST	tournaments/:tournament/participants
	describe('create', () => {
		it('should create an appropriate url without a subdomain', () => {
			participantsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/25/participants',
					method: 'POST'
				});
			};
			participantsInstance.create({
				id: 25
			});
		});
		it('should create an appropriate url with a subdomain', () => {
			participantsInstance.options.subdomain = 'somedomain-';
			participantsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/somedomain-25/participants',
					method: 'POST'
				});
			};
			participantsInstance.create({
				id: 25
			});
		});
	});

	// show	GET	tournaments/:tournament/participants/:participant_id
	describe('show', () => {
		it('should create an appropriate url without a subdomain', () => {
			participantsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/25/participants/456',
					method: 'GET'
				});
			};
			participantsInstance.show({
				id: 25,
				participantId: 456
			});
		});
		it('should create an appropriate url with a subdomain', () => {
			participantsInstance.options.subdomain = 'somedomain-';
			participantsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/somedomain-25/participants/456',
					method: 'GET'
				});
			};
			participantsInstance.show({
				id: 25,
				participantId: 456
			});
		});
	});

	// update	PUT	tournaments/:tournament/participants/:participant_id
	describe('update', () => {
		it('should create an appropriate url without a subdomain', () => {
			participantsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/25/participants/456',
					method: 'PUT'
				});
			};
			participantsInstance.update({
				id: 25,
				participantId: 456
			});
		});
		it('should create an appropriate url with a subdomain', () => {
			participantsInstance.options.subdomain = 'somedomain-';
			participantsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/somedomain-25/participants/456',
					method: 'PUT'
				});
			};
			participantsInstance.update({
				id: 25,
				participantId: 456
			});
		});
	});

	// destroy	DELETE	tournaments/:tournament/participants/:participant_id
	describe('destroy', () => {
		it('should create an appropriate url without a subdomain', () => {
			participantsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/25/participants/456',
					method: 'DELETE'
				});
			};
			participantsInstance.destroy({
				id: 25,
				participantId: 456
			});
		});
		it('should create an appropriate url with a subdomain', () => {
			participantsInstance.options.subdomain = 'somedomain-';
			participantsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/somedomain-25/participants/456',
					method: 'DELETE'
				});
			};
			participantsInstance.destroy({
				id: 25,
				participantId: 456
			});
		});
	});

	// randomize	GET	tournaments/:tournament/participants/randomize
	describe('randomize', () => {
		it('should create an appropriate url without a subdomain', () => {
			participantsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/25/participants/randomize',
					method: 'POST'
				});
			};
			participantsInstance.randomize({
				id: 25
			});
		});
		it('should create an appropriate url with a subdomain', () => {
			participantsInstance.options.subdomain = 'somedomain-';
			participantsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/somedomain-25/participants/randomize',
					method: 'POST'
				});
			};
			participantsInstance.randomize({
				id: 25
			});
		});
	});

});
