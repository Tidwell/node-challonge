const mockery = require('mockery');
mockery.enable({
	warnOnReplace: false,
    warnOnUnregistered: false
});

const httpsMock = {
	opts: {},
	listeners: {
	},
	request: function(opts, pipe) {
		this.opts = opts;
		pipe({
			on: (method, cb) => {
				if (!this.listeners[method]) { this.listeners[method] = []; }
				this.listeners[method].push(cb);
			}
		});

		return {
			end: () => {}
		};
	}
};

mockery.registerMock('https', httpsMock);
