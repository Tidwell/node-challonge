const mockery = require('mockery');
mockery.enable({
	warnOnReplace: false,
	warnOnUnregistered: false
});

const httpsMock = {
	reset: function() {
		this.reqListeners = {};
		this.listeners = {};
		this.opts = {};
		this.res.statusCode = '';
	},
	opts: {},
	listeners: {
	},
	reqListeners: {},
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
			},
			destroy: () => {
			},
			on: (method, cb) => {
				if (!httpsMock.reqListeners[method]) {
					httpsMock.reqListeners[method] = [];
				}
				httpsMock.reqListeners[method].push(cb);
			}
		};
	}
};

mockery.registerMock('https', httpsMock);
