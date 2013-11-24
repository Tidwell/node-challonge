##example

checkout this repo into ./

```
var challonge = require('./node-challonge');

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

For docs: http://api.challonge.com/v1

Library is organized into resource.method

For API calls that require nested params (eg: http://api.challonge.com/v1/documents/tournaments/create) properties should be specified nested.  example:

```
var challonge = require('./node-challonge');

var client = challonge.createClient({
	apiKey: '***yourAPIKey***'
});
client.tournaments.create({
	tournament: {
		name: 'new_tournament_name',
		url: 'new_tournament_url',  //also can be used as id
		tournament_type: 'single elimination',
	},
	callback: function(err,data){
		if (err) { console.log(err); return; }
		console.log(data);
	}
});
```