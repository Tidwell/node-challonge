####This is in very early alpha
---
##super basic example

checkout this repo into ./

To get all tournaments on your account:

```
var challonge = require('./node-challonge');

var client = challonge.createClient({
	apiKey: '***yourAPIKey***'
});


client.tournaments.index({
	callback: function(err,data){
		if (err) { console.log(err); return; }
		console.log(data);
	}
});

```

The wrapper is organized into resource.method to match the API

For API calls that require nested params (eg: http://api.challonge.com/v1/documents/tournaments/create) properties should be specified as a nested config option.

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
---
###test/test.js has examples of all the api methods.
---
###Challonge docs: http://api.challonge.com/v1

##TODO
2. support camelCase -> under_score params
3. validate required params
4. docs
5. tests

---

##Bugs in the API / docs
server 500s if trying to finalize() a tournament that has not yet been start()ed

http://api.challonge.com/v1 shows particpants.randomize as GET when method is actually POST

http://api.challonge.com/v1/documents/participants/create shows participant_id as a required field when the server does not respect passing it, and is not required.

http://api.challonge.com/v1/documents/participants/randomize shows participant_id as a required field when the server does not respect passing it, and is not required.

---

####The structure of this api wrapper is ripped off from https://github.com/nodejitsu/nodejitsu-api