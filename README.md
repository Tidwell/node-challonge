## Usage

### Install

```bash
$ npm install challonge --save
```

### Get all tournaments on your account

```js
var challonge = require('challonge');

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

### Create a tournament
```js
var challonge = require('challonge');

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

## API Client

_createClient_ takes one argument for configuration and returns an instance of the api client. The configuration object can contain the following options:

 * `apiKey` string (required) - Your challonge API Key

 * `subdomain` string (optional) - Setting the subdomain automatically passes tournament[subdomain] and prefixes the subdomain to tournament urls.  If you don't want to pass a subdomain to the constructor, and want to use an organization (or multiple organizations), you must use client.setSubdomain('subdomain') before making api calls.

 * `format` string (optional) - The format of the response data. Defaults to 'json'.  If set to 'json', will return javascript objects.  'xml' will return the raw text string.

 * `massageProperties` boolean (optional) - If the response object should be massaged into camelCase properties when using json format.  Defaults to true.

The wrapper is organized into resource.method to match the API

For API calls that require nested params (eg: http://api.challonge.com/v1/documents/tournaments/create) properties should be specified as a nested object:

```js
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

```js
tournament: { tournamentType: 'single elimination' }
```
```js
tournament: { tournament_type: 'single elimination' }
```

## Development

### Install

```bash
 $ git clone https://github.com/Tidwell/node-challonge
 $ cd node-challonge
 $ npm install
```

### Run Tests
[![Build Status](https://travis-ci.org/Tidwell/node-challonge.svg?branch=master)](https://travis-ci.org/Tidwell/node-challonge)

```bash
$ npm test
```

### Run JsFmt/JsHint

```bash
$ npm run-script format
```

```bash
$ npm run-script lint
```

### All (travis integration tests)

```bash
$ npm run-script integrate
```

### Issue Tracking

Issues are tracked on github: https://github.com/Tidwell/node-challonge/issues

The [Zenhub Browser Plugin](https://www.zenhub.com/) is used to organize issues.

The structure of this api wrapper is ripped off from https://github.com/nodejitsu/nodejitsu-api


### Branching

``master`` is the active development branch

``live`` is the latest published build on npm
