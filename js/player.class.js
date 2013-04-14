var Player = $.inherit({
	__constructor : function(id,name, color){
		this.id = id;
		this.name = name;
		this.color = color;

		$('#user_list').append('<tr><td>'+this.name+'</td><td>'+this.color+'</td></tr>');
	},

	get_name : function(){
		return this.name;
	},
	get_color : function(){
		return this.color;
	},
	set_x : function(x){
		this.x = x;
	},
	set_y : function(y){
		this.y = y;
	},


});