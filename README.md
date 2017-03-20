## [Full Documentation on GH Pages](http://tidwell.github.io/node-challonge/)

## Usage

### Install

```bash
$ npm install challonge --save
```

### Get all tournaments on your account

```js
const challonge = require('challonge');

const client = challonge.createClient({
  apiKey: '***yourAPIKey***'
});

client.tournaments.index({
  callback: (err, data) => {
	  console.log(err, data);
  }
});

```

### Create a tournament
```js
const challonge = require('challonge');

// create a new instance of the client
const client = challonge.createClient({
  apiKey: '***yourAPIKey***',
});

// create a tournament
client.tournaments.create({
  tournament: {
    name: 'new_tournament_name',
    url: 'new_tournament_url',
    tournamentType: 'single elimination',
  },
  callback: (err, data) => {
    console.log(err, data);
  }
});
```

## API Client

The wrapper is organized into resource.method to match the API

For API calls that require nested params (eg: http://api.challonge.com/v1/documents/tournaments/create) properties should be specified as a nested object:

```js
{
  tournament: {
    name: 'new_tournament_name',
    url: 'new_tournament_url',
    tournamentType: 'single elimination',
  },
  callback: (err, data) => {}
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
