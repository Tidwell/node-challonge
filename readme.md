##example

checkout this repo into ./

```
var challonge = require('./../');

var client = challonge.createClient({
	apiKey: '***yourAPIKey***'
});

function index() {
	client.tournaments.index({
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}

```