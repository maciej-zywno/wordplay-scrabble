var flatten = function (array){
    var flat = [];
    for (var i = 0, l = array.length; i < l; i++){
        var type = Object.prototype.toString.call(array[i]).split(' ').pop().split(']').shift().toLowerCase();
        if (type) { flat = flat.concat(/^(array|collection|arguments|object)$/.test(type) ? flatten(array[i]) : array[i]); }
    }
    return flat;
}

var multiply_char = function (character,times) {
    var chars = [];
    var i;
    for (i = 0; i < times; i += 1) {
        chars.push(character);
    }
    return chars;
}

var format_seconds = function (seconds) {
    // format into M:SS
    var min = Math.floor(seconds / 60);
    var sec = seconds % 60;
    var formatted = min + ':' + (sec < 10 ? ('0' + sec) : sec);
    return formatted;
}
