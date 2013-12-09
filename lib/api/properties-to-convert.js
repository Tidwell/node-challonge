//all the stuff we have to convert camelCase to under_scores
var propertiesToConvert = [
	'create_after',
	'created_before',

	'include_participants',
	'include_matches',

	'tournament_type',
	'open_signup',
	'hold_third_place_match',
	'pts_for_match_win',
	'pts_for_match_tie',
	'pts_for_game_win',
	'pts_for_game_tie',
	'pts_for_bye',
	'swiss_rounds',
	'ranked_by',
	'rr_pts_for_match_win',
	'rr_pts_for_match_tie',
	'rr_pts_for_game_win',
	'rr_pts_for_game_tie',
	'accept_attachments',
	'hide_forum',
	'show_rounds',
	'notify_users_when_matches_open',
	'notify_users_when_the_tournament_ends',
	'sequential_pairings',
	'signup_cap',

	'challonge_username',

	'participant_id',

	'scores_csv',
	'winner_id',
	'player1_votes',
	'player2_votes',
];

module.exports = propertiesToConvert;