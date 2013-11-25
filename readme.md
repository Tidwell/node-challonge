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

----

##Comments
Server throws nginx error without a content-length in header.

All methods are qs based, so I would assume nginx would ignore content-length for api requests (it is optional in the spec). I lost about 20 mins to this one because node doesn't auto-calculate content-length in the core https lib.

---

##Etc
The other language wrappers are AWESOME. I consulted their sources often when trying to figure out WTF the API actually wanted. One of the most important examples was from the python lib's api.py - it confirmed I wasn't insane about how to construct the querystring.  Ruby and PHP provide native ways to stringify objects in ```object[property]=value``` syntax, but python and node don't.

---

##TODO
* move /v1/tournaments to config
* abstract path suffix for partcipants, matches
* abstract destroy of qs params

1. fix randomize
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

Also, I think the server might be sending an invalid content-length header on randomize somehow. Node doesn't handle invalid headers well, will look into the causes for:

```
[Error: Parse Error] bytesParsed: 0, code: 'HPE_INVALID_CONSTANT' in node.
```

hrm, works via curl:
curl -d ''  https://tidwell:key@api.challonge.com/v1/tournaments/sometesttourney1/participants/randomize.json

---

####The structure of this api wrapper is ripped off from https://github.com/nodejitsu/nodejitsu-api