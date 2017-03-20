var challonge = require('./../');

var client = challonge.createClient({
	apiKey: require('./../key.js').challonge,
	format: 'json',
	version: 1,
});

var tourneyName = 'new_api_test' + Math.floor(Math.random()*10000);

client.tournaments.create({
	tournament: {
		name: 'name-'+tourneyName,
		url: tourneyName,
		signupCap: 8,
		tournamentType: 'single elimination',
	},
	callback: function(err,data){
		if (err) { console.log(err); return; }
		console.log(data);

		update();
	}
});

function update() {
	client.tournaments.update({
		id: tourneyName,
		tournament: {
			name: 'name-'+tourneyName,
			url: tourneyName,
			signupCap: 16,
			tournamentType: 'double elimination',
			description: 'some new description',
			acceptAttachments: true

		},
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);

			pcreate('player1');
		}
	});
}

function pcreate(name) {
	client.participants.create({
		id: tourneyName,
		participant: {
			name: name
		},
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
			if (name === 'player1') {
				pcreate('player2');
			} else {
				start();
			}
		}
	});
}

function start() {
	client.tournaments.start({
		id: tourneyName,
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);

			mindex();
		}
	});
}

function mindex() {
	client.matches.index({
		id: tourneyName,
		callback: function(err,data){
			if (err) { console.log(err); return; }

			mupdate(data[0].match.id, data[0].match.player1Id);
		}
	});
}

function mupdate(matchId, winnerId) {
	client.matches.update({
		id: tourneyName,
		matchId: matchId,
		match: {
			scoresCsv: '3-0',
			winnerId: winnerId
		},
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}
