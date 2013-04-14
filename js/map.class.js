var Map = $.inherit({
	__constructor : function(){
		var map = this;

		$('tr').each(function(k_tr, tr){
			$(this).children().each(function(k_td, td){
				$(td).attr('id', k_tr+'-'+k_td);
				$(td).attr('data-x', k_td).attr('data-y', k_tr);

				if( !isEven(k_td) || !isEven(k_tr) ) $(td).addClass('unwall');
			});
		});

		$('#start_game').click(function(){
			map.turn = 0;

			$('td#0-8').addClass('possible_case');
			$('td#0-8').trigger('click');	
			$('td#0-8').removeClass('possible_case');
		});
	},

	add_player : function(player){
		var x = 8;
		var y = 0;

		switch(player.id){
			case 1:
				x = 8;
				y = 16;
			break;
			case 2:
				x = 16;
				y = 8;
			break;
			case 3:
				x = 0;
				y = 8;
			break;
		}
		player.set_x(x);
		player.set_y(y);

		this.place_player(player);
	},
	place_player : function(player){
		$(get_id(player.x, player.y)).addClass('player_'+player.color);
	},
	manage_turn : function(player, clicked_case){
		

		var this_map = this;
		var next_player_id = parseFloat(this.turn)%(player.length);
		var player_id = next_player_id - 1;

		var case_id = clicked_case.attr('id');
		var case_x = parseFloat(clicked_case.attr('data-x'));
		var case_y = parseFloat(clicked_case.attr('data-y'));

		var case_x1 = case_x;
		var case_x2 = case_x;
		var case_y1 = case_y;
		var case_y2 = case_y;

		if( player_id == -1 ) player_id += player.length;

		if( clicked_case.hasClass('unwall')){

			clicked_case.removeClass('unwall').addClass('wall');

			if( !isEven(case_y) ) {
				case_x1 += 2;
				case_x2 -= 2;
			}
			else {
				case_y1 += 2;
				case_y2 -= 2;
			}

			$(get_id(case_x1, case_y1)).removeClass('unwall').addClass('possible_wall');
			$(get_id(case_x2, case_y2)).removeClass('unwall').addClass('possible_wall');

			$('.possible_case').removeClass('possible_case');

			$('.possible_wall').on('click', function(){
				$(this).removeClass('possible_wall').addClass('wall');			
				$('.possible_wall').removeClass('possible_wall').addClass('unwall');

				this_map.turn +=1;
				this_map.print_possible_moves(player[next_player_id]);
			});
		}
		else if(clicked_case.hasClass('wall')){

		}
		else if(clicked_case.hasClass('possible_wall')){

		}
		else{
			this.move_player(player[player_id], clicked_case);	

			this.turn +=1;

			this.print_possible_moves(player[next_player_id]);
		}

		console.log(this.turn);
	},
	move_player : function(player, next_case){
		if( this.turn == 0 ) return;
		$('.player_'+player.color).removeClass();
		$('.player_'+player.color).attr('data-player', '');

		next_case.addClass('player_'+player.color);
		next_case.attr('data-player', '');

		player.x = next_case.attr('data-x')
		player.y = next_case.attr('data-y')

		return player; 
	},
	print_possible_moves : function ( player ){
		$('.possible_case').removeClass('possible_case');

		var x = parseFloat(player.x);
		var y = parseFloat(player.y);

		var possible_moves = [];

		if( $( get_id( x+1, y) ).hasClass('wall') != true ) possible_moves.push( get_id( x+2, y));
		if( $( get_id( x-1, y) ).hasClass('wall') != true ) possible_moves.push( get_id( x-2, y));
		if( $( get_id( x, y+1) ).hasClass('wall') != true ) possible_moves.push( get_id( x, y+2));
		if( $( get_id( x, y-1) ).hasClass('wall') != true ) possible_moves.push( get_id( x, y-2));

		for( k in possible_moves ){
			$(possible_moves[k]).addClass('possible_case');
		}
	}


});