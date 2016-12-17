/*const http = require('http');

const options = {
  host: 'api.challonge.com',
  path: '/v1/tournaments.json',

  headers: {
    'Content-Length': 0
    api_key: 'NAc5yMiXBxTxp7lGFOUfUhAp0xROObWnWFLt6RSI'
  }
};
callback = function(response) {
  let str = '';
  response.on('data', (chunk) => str += chunk);
  response.on('end', () => console.log(str));
}
http.request(options, callback).end();
*/

/*const http = require('http');

var api = http.createClient(80, 'api.challonge.com');
var request = api.request('GET', '/v1/tournaments.json', 
{
  'host': 'api.challonge.com',
  'accept': 'application/json', 
  'api-key': 'apikeygoeshere' 
});

request.on('response', function (response) { console.log(response); });    
request.end();*/

/*
var options = {
  baseUrl: 'https://api.challonge.com',
  url: path,
  qs: obj,
  method: method,
  headers: {
    'Content-Length': 0 // server throws nginx error without a content-length
  }
};
*/

const request = require('request');
request.post('https://api.challonge.com/v1/tournaments.json', {
  qs: {
    api_key: 'ccdcrMkbdm2DiESCHB4sqSKQVKMuGiVokKYzKmoL',
    tournament: {
      name: 'suprawsmtourny2',
      tournament_type: 'single elimination',
      description: 'super awesome description',
      url: 'suprawsmtourny_url2'
    }
  },/*
  headers: {
    'Content-Length': 0 // server throws nginx error without a content-length
  },*/
  json: true
}, function (error, response, body) {
  console.log('Status code: ' + response.statusCode);
  console.log(body);
  console.log(error);
});

/*
request.post(options, function (error, response, body) {
  console.log('Status code: ' + response.statusCode);
  if(error) {
    callback(error, null);
    return;
  }
  if (response.statusCode !== 200) {
    callback(null, null);
    return;
  }

  var resData = JSON.parse(body);
  callback(null, resData);
});
*/

