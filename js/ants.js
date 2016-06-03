var APP = APP || {};

APP.AntModule = (function(){
  var _ants = [];
  var _max;
  var _board;

  var init = function(board) {
    _max = board.getSize();
    _board = board;

    for ( var i = 0; i < 1; i++ ) {
      addAnt({
        x: Math.floor(Math.random() * 64),
        y: Math.floor(Math.random() * 64),
        z: 33,
        color: "#e11",
        kind: "normal"
      });
    }
  };

  var _Ant = function(data) {
    this.directions = [[0,1], [1,0], [0,-1], [-1,0]]

    this.x = data.x;
    this.y = data.y;
    this.z = data.z;
    this.color = data.color;
    this.kind = data.kind;
    this.carry = null;

    this.update = function() {
      this.move();
    };

    this.move = function() {
      var dX = Math.round( Math.random() * 2 - 1 );
      var dY = Math.round( Math.random() * 2 - 1 );
      var dZ = Math.round( Math.random() * 2 - 1 );

      if ( this.carry ) {
        this.build( dX, dY, dZ );
      } else {
        dZ = Math.round( Math.random() * -1 );
        this.dig( dX, dY, dZ );
      }
    };

    this.dig = function( dX, dY, dZ ) {
      var result = _board.dig( this.x + dX, this.y + dY, this.z + dZ );
      if ( result ) {
        this.carry = result;
      } else {
        this.crawl( dX, dY, dZ );
      }
    };

    this.crawl = function( dX, dY, dZ ) {
      if (_board.isCrawlable( this.x + dX, this.y + dY, this.z + dZ ) ) {
        this.x += dX;
        this.y += dY;
        this.z += dZ;
      }
    };

    this.build = function( dX, dY, dZ ) {
      if ( _board.isBuildable( this.x + dX, this.y + dY, this.z + dZ ) ) {
        _board.build( this.x + dX, this.y + dY, this.z + dZ, this.carry );
        this.carry = null;
      } else {
        this.crawl( dX, dY, dZ );
      }
    };
  };

  var getAnts = function() {
    return _ants;
  };

  var addAnt = function(data) {
    _ants.push( new _Ant(data) );
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
