var count_points = function (word) {
    var i;
    var score = 0;
    for (i = 0; i < word.length; i += 1) {
        score += LETTER_TO_POINTS[word.charAt(i)];
    }
    return score;
}


var LETTER_TO_POINTS = {};

LETTER_TO_POINTS['A'] = 1;
LETTER_TO_POINTS['I'] = 1;
LETTER_TO_POINTS['E'] = 1;
LETTER_TO_POINTS['O'] = 1;
LETTER_TO_POINTS['N'] = 1;
LETTER_TO_POINTS['Z'] = 1;
LETTER_TO_POINTS['R'] = 1;
LETTER_TO_POINTS['S'] = 1;
LETTER_TO_POINTS['W'] = 1;
LETTER_TO_POINTS['Y'] = 2;
LETTER_TO_POINTS['C'] = 2;
LETTER_TO_POINTS['D'] = 2;
LETTER_TO_POINTS['K'] = 2;
LETTER_TO_POINTS['L'] = 2;
LETTER_TO_POINTS['M'] = 2;
LETTER_TO_POINTS['P'] = 2;
LETTER_TO_POINTS['T'] = 2;
LETTER_TO_POINTS['B'] = 3;
LETTER_TO_POINTS['G'] = 3;
LETTER_TO_POINTS['H'] = 3;
LETTER_TO_POINTS['J'] = 3;
LETTER_TO_POINTS['Ł'] = 3;
LETTER_TO_POINTS['U'] = 3;
LETTER_TO_POINTS['Ą'] = 5;
LETTER_TO_POINTS['Ę'] = 5;
LETTER_TO_POINTS['F'] = 5;
LETTER_TO_POINTS['Ó'] = 5;
LETTER_TO_POINTS['Ś'] = 5;
LETTER_TO_POINTS['Ż'] = 5;
LETTER_TO_POINTS['Ć'] = 6;
LETTER_TO_POINTS['Ń'] = 7;
LETTER_TO_POINTS['Ź'] = 9;

