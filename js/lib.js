var isEven = function(someNumber){
    return (someNumber%2 == 0) ? true : false;
};

function get_id(x, y){
	return '#'+y+'-'+x;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};