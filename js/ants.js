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
      var choose = Math.round(Math.random());
      switch (choose) {
        case 0:
        this.crawl( this.x + dX, this.y + dY, this.z + dZ );
          break;
        default:
        if ( this.carry ) {
          this.build( this.x + dX, this.y + dY, this.z + dZ );
        } else {
          this.dig( this.x + dX, this.y + dY, this.z + dZ );
        }
      }
    };

    this.dig = function( x, y, z ) {
      if ( _board.isSelected( x, y, z ) ) {
        var result = _board.dig( x, y, z );
        if ( result ) {
          this.carry = result;
        } else {
          this.crawl( x, y, z );
        }
      }
    };

    this.crawl = function( x, y, z ) {
      if (_board.isCrawlable( x, y, z ) ) {
        this.x = x;
        this.y = y;
        this.z = z;
      }
    };

    this.build = function( x, y, z ) {
      if ( _board.isBuildable( x, y, z ) ) {
        _board.build( x, y, z, this.carry );
        this.carry = null;
      } else {
        this.crawl( x, y, z );
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
