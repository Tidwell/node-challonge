var challonge = require('./../');

var client = challonge.createClient({
	apiKey: require('./../key.js'),
	format: 'json',
	version: 1,
});

var tourneyName = 'nodeapite3stcamel';

function index() {
	client.tournaments.index({
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}

function create() {
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
		}
	});
}

function show() {
	client.tournaments.show({
		id: tourneyName,
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}

function update() {
	client.tournaments.update({
		id: tourneyName,
		tournament: {
			name: 'renamed test tournet'
		},
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}

function destroy() {
	client.tournaments.destroy({
		id: tourneyName,
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}

function start() {
	client.tournaments.start({
		id: tourneyName,
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}

function finalize() {
	client.tournaments.finalize({
		id: tourneyName,
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}

function reset() {
	client.tournaments.reset({
		id: tourneyName,
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}

function pindex() {
	client.participants.index({
		id: tourneyName,
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}

function pcreate() {
	client.participants.create({
		id: tourneyName,
		participant: {
			name: 'Tidwell345678901239331'
		},
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}

function pshow() {
	client.participants.show({
		id: tourneyName,
		participantId: 11150708,
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}

function pupdate() {
	client.participants.update({
		id: tourneyName,
		participantId: 11150708,
		participant: {
			name: 'updatdguy'
		},
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}

function pdestroy() {
	client.participants.destroy({
		id: tourneyName,
		participantId: 10846707,
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}

function prandomize() {
	client.participants.randomize({
		id: tourneyName,
		callback: function(err,data){
			if (err) { console.log('err', err); return; }
			console.log(data);
		}
	});
}

function mindex() {
	client.matches.index({
		id: tourneyName,
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}

function mshow() {
	client.matches.show({
		id: tourneyName,
		matchId: 15606254,
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}

function mupdate() {
	client.matches.update({
		id: tourneyName,
		matchId: 15606254,
		match: {
			scoresCsv: '3-0',
			winnerId: 10847219
		},
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}



//index();
//client.setSubdomain('nodeapitest');
create();
//show();
//update();
//destroy();
//start();
//finalize();
//reset();


//pindex();
//pcreate();
//pshow();
//pupdate();
//pdestroy();
//prandomize();

//mindex();
//mshow();
//mupdate();