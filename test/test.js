var challonge = require('./../');

var client = challonge.createClient({
	apiKey: require('./../key.js'),
	format: 'json'
});

var tourneyName = '710101';

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
			signup_cap: 8,
			tournament_type: 'single elimination',
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
		id: 'test-tourney',
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
		participantId: 'arbitraryid',
		participant: {
			name: 'Tidwell'
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
		participantId: 10846707,
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}

function pupdate() {
	client.participants.update({
		id: tourneyName,
		participantId: 10846707,
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
			scores_csv: '3-0',
			winner_id: 10847219
		},
		callback: function(err,data){
			if (err) { console.log(err); return; }
			console.log(data);
		}
	});
}



//index();
//create();
//show();
//update();
//destroy();
//start();
//finalize();
//reset();


//pindex();
//pshow();
//pupdate();
//pdestroy();
prandomize();

//mindex();
//mshow();
//mupdate();