const Tournaments = require('./tournaments').Tournaments;
const Client = require('./client').Client;

let tournamentsInstance;
describe('tournaments endpoints', () => {
	beforeEach(() => {
		tournamentsInstance = new Tournaments();
	});

	describe('tournaments constructor', () => {
		it('should inherit from the client', () => {
			expect(Object.getPrototypeOf(Tournaments.prototype)).toBe(Client.prototype);
		});
	});

	describe('getRawSubdomain', () => {
		it('should return the subdomain', () => {
			tournamentsInstance.options.subdomain = 'mysubdomain-';
			const domain = tournamentsInstance.getRawSubdomain();

			expect(domain).toEqual('mysubdomain');
		});
		it('should only strip a trailing dash from a subdomain', () => {
			tournamentsInstance.options.subdomain = 'my-sub-domain-';
			const domain = tournamentsInstance.getRawSubdomain();

			expect(domain).toEqual('my-sub-domain');
		});

		it('should return raw if there is no -', () => {
			tournamentsInstance.options.subdomain = 'raw';
			const domain = tournamentsInstance.getRawSubdomain();

			expect(domain).toEqual('raw');
		});

		it('should return nothing if no subdomain -', () => {
			const domain = tournamentsInstance.getRawSubdomain();

			expect(domain).toEqual('');
		});
	});

	// index	GET	tournaments
	describe('index', () => {
		it('should create an appropriate url without a subdomain', () => {
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					id: 25,
					method: 'GET'
				});
			};
			tournamentsInstance.index({
				id: 25
			});
		});
		it('should create an appropriate url with a subdomain', () => {
			tournamentsInstance.options.subdomain = 'somedomain-';
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					id: 25,
					method: 'GET',
					subdomain: 'somedomain'
				});
			};
			tournamentsInstance.index({
				id: 25
			});
		});
	});

	// create	POST	tournaments
	describe('create', () => {
		it('should create an appropriate url without a subdomain', () => {
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					id: 25,
					method: 'POST'
				});
			};
			tournamentsInstance.create({
				id: 25
			});
		});
		it('should create an appropriate url with a subdomain', () => {
			tournamentsInstance.options.subdomain = 'somedomain-';
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					id: 25,
					method: 'POST',
					tournament: {
						subdomain: 'somedomain'
					}
				});
			};
			tournamentsInstance.create({
				id: 25,
				tournament: {}
			});
		});
	});

	// show	GET	tournaments/:tournament
	describe('show', () => {
		it('should create an appropriate url without a subdomain', () => {
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/25',
					method: 'GET'
				});
			};
			tournamentsInstance.show({
				id: 25
			});
		});
		it('should create an appropriate url with a subdomain', () => {
			tournamentsInstance.options.subdomain = 'somedomain-';
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/somedomain-25',
					method: 'GET'
				});
			};
			tournamentsInstance.show({
				id: 25
			});
		});
	});

	// update	PUT	tournaments/:tournament
	describe('update', () => {
		it('should create an appropriate url without a subdomain', () => {
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/25',
					method: 'PUT'
				});
			};
			tournamentsInstance.update({
				id: 25
			});
		});
		it('should create an appropriate url with a subdomain', () => {
			tournamentsInstance.options.subdomain = 'somedomain-';
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/somedomain-25',
					method: 'PUT'
				});
			};
			tournamentsInstance.update({
				id: 25
			});
		});
	});

	// destroy	DELETE	tournaments/:tournament
	describe('destroy', () => {
		it('should create an appropriate url without a subdomain', () => {
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/25',
					method: 'DELETE'
				});
			};
			tournamentsInstance.destroy({
				id: 25
			});
		});
		it('should create an appropriate url with a subdomain', () => {
			tournamentsInstance.options.subdomain = 'somedomain-';
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/somedomain-25',
					method: 'DELETE'
				});
			};
			tournamentsInstance.destroy({
				id: 25
			});
		});
	});

	// start	POST	tournaments/:tournament/start
	describe('start', () => {
		it('should create an appropriate url without a subdomain', () => {
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/25/start',
					method: 'POST'
				});
			};
			tournamentsInstance.start({
				id: 25
			});
		});
		it('should create an appropriate url with a subdomain', () => {
			tournamentsInstance.options.subdomain = 'somedomain-';
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/somedomain-25/start',
					method: 'POST'
				});
			};
			tournamentsInstance.start({
				id: 25
			});
		});
	});

	// finalize	POST	tournaments/:tournament/finalize
	describe('finalize', () => {
		it('should create an appropriate url without a subdomain', () => {
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/25/finalize',
					method: 'POST'
				});
			};
			tournamentsInstance.finalize({
				id: 25
			});
		});
		it('should create an appropriate url with a subdomain', () => {
			tournamentsInstance.options.subdomain = 'somedomain-';
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/somedomain-25/finalize',
					method: 'POST'
				});
			};
			tournamentsInstance.finalize({
				id: 25
			});
		});
	});

	// reset	POST	tournaments/:tournament/reset
	describe('reset', () => {
		it('should create an appropriate url without a subdomain', () => {
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/25/reset',
					method: 'POST'
				});
			};
			tournamentsInstance.reset({
				id: 25
			});
		});
		it('should create an appropriate url with a subdomain', () => {
			tournamentsInstance.options.subdomain = 'somedomain-';
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/somedomain-25/reset',
					method: 'POST'
				});
			};
			tournamentsInstance.reset({
				id: 25
			});
		});
	});

	// process_check_ins	POST	tournaments/:tournament/process_check_ins
	describe('process_check_ins', () => {
		it('should create an appropriate url without a subdomain', () => {
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/25/process_check_ins',
					method: 'POST'
				});
			};
			tournamentsInstance.processCheckIns({
				id: 25
			});
		});
		it('should create an appropriate url with a subdomain', () => {
			tournamentsInstance.options.subdomain = 'somedomain-';
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/somedomain-25/process_check_ins',
					method: 'POST'
				});
			};
			tournamentsInstance.processCheckIns({
				id: 25
			});
		});
	});

	// process_check_ins	POST	tournaments/:tournament/process_check_ins
	describe('abort_check_in', () => {
		it('should create an appropriate url without a subdomain', () => {
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/25/abort_check_in',
					method: 'POST'
				});
			};
			tournamentsInstance.abortCheckIn({
				id: 25
			});
		});
		it('should create an appropriate url with a subdomain', () => {
			tournamentsInstance.options.subdomain = 'somedomain-';
			tournamentsInstance.makeRequest = (obj) => {
				expect(obj).toEqual({
					path: '/somedomain-25/abort_check_in',
					method: 'POST'
				});
			};
			tournamentsInstance.abortCheckIn({
				id: 25
			});
		});
	});
});
