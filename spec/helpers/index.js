const mockery = require('mockery');
mockery.enable({
	warnOnReplace: false,
	warnOnUnregistered: false
});

const httpsMock = {
	reset: function() {
		this.listeners = {};
		this.opts = {};
		this.res.statusCode = '';
	},
	opts: {},
	listeners: {
	},
	res: {
		on: (method, cb) => {
			if (!httpsMock.listeners[method]) {
				httpsMock.listeners[method] = [];
			}
			httpsMock.listeners[method].push(cb);
		}
	},
	request: function(opts, pipe) {
		this.opts = opts;
		pipe(this.res);

		return {
			end: () => {
			}
		};
	}
};

mockery.registerMock('https', httpsMock);
