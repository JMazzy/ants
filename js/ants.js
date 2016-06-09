var APP = APP || {};

APP.AntModule = (function(){
  var _ants = [];
  var _max;
  var _board;

  var init = function(board) {
    _max = board.getSize();
    _board = board;

    for ( var i = 0; i < 10; i++ ) {
      addAnt({
        x: 33,//Math.floor(Math.random() * 64),
        y: 33,//Math.floor(Math.random() * 64),
        z: 33,
        color: "#e11",
        kind: "normal"
      });
    }
  };

  var getAnts = function() {
    return _ants;
  };

  var addAnt = function(data) {
    _ants.push( new APP.Ant(_board, data) );
  };

  var update = function() {
    for ( var i = 0; i < _ants.length; i++ ) {
      _ants[i].update();
    }
  };

  return {
    init: init,
    update: update,
    getAnts: getAnts,
    addAnt: addAnt,
  };
})();
