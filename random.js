var LETTERS = flatten(LETTERS_ARRAYS);

var random_letter = function() {
    return LETTERS[Math.floor((Math.random()*LETTERS.length))]
}