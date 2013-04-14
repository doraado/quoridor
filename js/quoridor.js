jQuery(function($){
	$(document).ready(function(){
		var player = [];
		var map = new Map(player);

		$('#add_player').click(function(){
			if(player.length == 4){
				$(this).parent().remove();
			}
			else {
				var name = $('#player_name').val();
				var color = $('#player_color').val();

				var t_player = new Player(player.length, name, color);

				player.push(t_player);

				map.add_player(t_player);

			}
		});

		$('td').click(function(){
			if($(this).hasClass('unwall') ||$(this).hasClass('possible_case') ){
				map.manage_turn(player, $(this) );				
			}
		});			
	})
});
/*
function init_map(){
	possible_moves(player.a);

	return player;
}

function move_player( player, next_case ){
	var player_name = player.attr('data-player');
	player.attr('data-player', '');

	next_case = '#'+next_case.attr('id');

	$(next_case).attr('data-player' , player_name);

	print_players();

	return player;
}


/*
 * Erreur à trouver et à déboguer
 */
 /*
function manage_turn(player, clicked_td){
	var turn = parseFloat(localStorage['turn']);

	if( clicked_td.hasClass('possible_case')){
		if( isEven(turn) ){
			player = move_player(player.a, clicked_td);
			possible_moves(player.b);
		}
		else{
			player = move_player(player.b, clicked_td);
			possible_moves(player.a);
		}
	}

	localStorage['turn'] = turn +1;

	return player;
} 

function set_wall(x, y){
	$(get_id(x, y)).addClass('wall').removeClass('unwall');
}


function print_players(){
	$('td').removeClass('player_a').removeClass('player_b');

	$('td[data-player="a"]').addClass('player_a');
	$('td[data-player="b"]').addClass('player_b');
}

function start_game(player){
	$('td').on('click', function(){
		manage_turn(player, $(this));
	});
}
*/