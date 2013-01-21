////////// Shared code (client and server) //////////

Games = new Meteor.Collection('games');
// { board: ['A','I',...], clock: 60,
//   players: [{player_id, name}], winners: [player_id] }

Words = new Meteor.Collection('words');
// {player_id: 10, game_id: 123, word: 'hello', state: 'good', score: 4}

Players = new Meteor.Collection('players');
// {name: 'matt', game_id: 123}

// generate a new random selection of letters.
var new_board = function () {
  var board = [];
  var i;

  // pick random letter from each die
  for (i = 0; i < SIZE * SIZE; i += 1) {
    board[i] = random_letter();
  }
  return board;
};

// returns an array of valid paths to make the specified word on the
// board.  each path is an array of board positions 0-15.  a valid
// path can use each position only once, and each position must be
// adjacent to the previous position.
var paths_for_word = function (board, word) {
  var valid_paths = [];

  var check_path = function (word, path, positions_to_try) {
    // base case: the whole word has been consumed.  path is valid.
    if (word.length === 0) {
      valid_paths.push(path);
      return;
    }

    // otherwise, try to match each available position against the
    // first letter of the word, avoiding any positions that are
    // already used by the path.  for each of those matches, descend
    // recursively, passing the remainder of the word, the accumulated
    // path, and the positions adjacent to the match.

    for (var i = 0; i < positions_to_try.length; i++) {
      var pos = positions_to_try[i];
      if (board[pos] === word[0] && path.indexOf(pos) === -1)
        check_path(word.slice(1),      // cdr of word
                   path.concat([pos]), // append matching loc to path
                   ADJACENCIES[pos]);  // only look at surrounding tiles
    }
  };

  // start recursive search w/ full word, empty path, and all tiles
  // available for the first letter.
  check_path(word, [], all_indexes());

  return valid_paths;
};

function all_indexes(){
    var array = [];
    var i;
    for (i = 0; i < SIZE * SIZE; i += 1) {
        array.push(i);
    }
    return array;
}
Meteor.methods({
  score_word: function (word_id) {
    var word = Words.findOne(word_id);
    var game = Games.findOne(word.game_id);

    // client and server can both check: must be at least three chars
    // long, not already used, and possible to make on the board.
    if (word.length < 3
        || Words.find({game_id: word.game_id, word: word.word}).count() > 1
        || paths_for_word(game.board, word.word).length === 0) {
      Words.update(word._id, {$set: {score: 0, state: 'bad'}});
      return;
    }

    // now only on the server, check against dictionary and score it.
    if (Meteor.isServer) {
      if (DICTIONARY.indexOf(word.word.toLowerCase()) === -1) {
        Words.update(word._id, {$set: {score: 0, state: 'bad'}});
      } else {
//          var score = Math.pow(2, word.word.length - 3);
          var score = count_points(word.word);
        Words.update(word._id, {$set: {score: score, state: 'good'}});
      }
    }
  }
});


if (Meteor.isServer) {
  // publish all the non-idle players.
  Meteor.publish('players', function () {
    return Players.find({idle: false});
  });

  // publish single games
  Meteor.publish('games', function (id) {
    return Games.find({_id: id});
  });

  // publish all my words and opponents' words that the server has
  // scored as good.
  Meteor.publish('words', function (game_id, player_id) {
    return Words.find({$or: [{game_id: game_id, state: 'good'},
                             {player_id: player_id}]});
  });
}

