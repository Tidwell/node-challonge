##Usage

###Get all tournaments on your account

```
var challonge = require('./node-challonge');

var client = challonge.createClient({
	apiKey: '***yourAPIKey***'
});


client.tournaments.index({
	callback: function(err, data){
		if (err) { console.log(err); return; }
		console.log(data);
	}
});

```

###Create a tournament
```
var challonge = require('./node-challonge');

// create a new instance of the client
var client = challonge.createClient({
	apiKey: '***yourAPIKey***',
});

// create a tournament
client.tournaments.create({
	tournament: {
		name: 'new_tournament_name',
		url: 'new_tournament_url',
		tournamentType: 'single elimination',
	},
	callback: function(err, data){
		if (err) { console.log(err); return; }
		console.log(data);
	}
});
```

##API Client

_createClient_ takes one argument for configuration and returns an instance of the api client. The configuration object can contain the following options:

 * `apiKey` string (required) - Your challonge API Key

 * `subdomain` string (optional) - Setting the subdomain automatically passes tournament[subdomain] and prefixes the subdomain to tournament urls.  If you don't want to pass a subdomain to the constructor, and want to use an organization (or multiple organizations), you must use client.setSubdomain('subdomain') before making api calls.

 * `format` string (optional) - The format of the response data. Defaults to 'json'.  If set to 'json', will return javascript objects.  'xml' will return the raw text string.

 * `massageProperties` boolean (optional) - If the response object should be massaged into camelCase properties when using json format.  Defaults to true.

The wrapper is organized into resource.method to match the API

For API calls that require nested params (eg: http://api.challonge.com/v1/documents/tournaments/create) properties should be specified as a nested object:
```
{
	tournament: {
		name: 'new_tournament_name',
		url: 'new_tournament_url',
		tournamentType: 'single elimination',
	},
	callback: function(err, data){}
}
```

All properties can be specified camelCase instead of using under_scores Both of the following are valid:
```
tournament: { tournamentType: 'single elimination' }
```
```
tournament: { tournament_type: 'single elimination' }
```

##TODO
1. validate required params
2. docs
3. tests


##Bugs in the API / docs

Some minor gatchas:

 * server 500s if trying to finalize() a tournament that has not yet been start()ed

 * http://api.challonge.com/v1/documents/participants/create shows participant_id as a required field when the server does not respect passing it, and is not required.

 * http://api.challonge.com/v1/documents/participants/randomize shows participant_id as a required field when the server does not respect passing it, and is not required.

---

The structure of this api wrapper is ripped off from https://github.com/nodejitsu/nodejitsu-api