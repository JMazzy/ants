var APP = APP || {};

APP.Board = (function() {

  var _grid, _currentLevel, _size;

  var init = function(size) {
    _size = size;
    _currentLevel = Math.floor( size / 2 + 1 );

    _grid = [];
    for ( var z = 0; z < size; z++ ) {
      _grid[z] = [];
      for ( var y = 0; y < size; y++ ) {
        _grid[z][y] = [];
        for ( var x = 0; x < size; x++ ) {
          var material;
          var top = Math.floor(size / 2);
          if ( z > top ) {
            material = "air";
          } else {
            material = "dirt";
          }

          _grid[z][y][x] = new APP.Tile({ material: material, neighbors: getNeighbors(x,y,z) });
        }
      }
    }
  };

  var getSize = function() {
    return _size;
  }

  var getTiles = function() {
    return _grid;
  };

  var getNeighbors = function(x,y,z) {
    var neighbors = [];
    for ( var dZ = -1; dZ <= 1; dZ++ ) {
      for ( var dY = -1; dY <= 1; dY++ ) {
        for ( var dX = -1; dX <= 1; dX++ ) {
          if ( ( dX !== 0 || dY !== 0 || dZ !== 0 )
          && isInBounds( x+dX, y+dY, z+dZ )) {
            neighbors.push({
              x: x + dX,
              y: y + dY,
              z: z + dZ,
            });
          }
        }
      }
    }
    return neighbors;
  };

  var getCurrentLevel = function() {
    return _currentLevel;
  };

  var changeLevel = function( amount ) {
    if ( _currentLevel + amount >= 0 && _currentLevel + amount < _size ) {
      _currentLevel += amount;
    }
  };

  var isInBounds = function(x,y,z) {
    return x > 0 && y > 0 && z > 0 && x < _size && y < _size && z < _size
  };

  var isCrawlable = function(x,y,z) {
    if ( !isInBounds(x,y,z) || _grid[z][y][x].material !== "air" ) {
      return false;
    }

    var supportCount = 0;

    for ( var dZ = -1; dZ <= 1; dZ++ ) {
      for ( var dY = -1; dY <= 1; dY++ ) {
        for ( var dX = -1; dX <= 1; dX++ ) {
          if ( isInBounds(x+dX, y+dY, z+dZ) && _grid[z+dZ][y+dY][x+dX].material !== "air" ) {
            supportCount++;
          }
        }
      }
    }
    return supportCount > 0;
  };

  var isBuildable = function(x,y,z) {
    if ( isSelected(x,y,z) || !isInBounds(x,y,z) || ( _grid[z-1] && _grid[z-1][y][x].material === "air") ) {
      return false;
    }

    var dZ = -1;
    var supportCount = 0;

    for ( var dY = -1; dY <= 1; dY++ ) {
      for ( var dX = -1; dX <= 1; dX++ ) {
        if ( !isInBounds(x+dX,y+dY,z+dZ) || _grid[z+dZ][y+dY][x+dX].material !== "air" ) {
          supportCount++;
        }
      }
    }

    return supportCount > 4;
  }

  var dig = function(x,y,z) {
    if ( isInBounds(x,y,z) ) {
      var material = _grid[z][y][x].material
      if ( material === "dirt" ) {
        _grid[z][y][x].material = "air";
        return material;
      }
    }
    return false;
  };

  var build = function(x,y,z,material) {
    _grid[z][y][x].material = material;
    _grid[z][y][x].emptyScent();
  }

  var select = function(x,y) {
    _grid[_currentLevel][y][x].select();
  };

  var isSelected = function(x,y,z) {
    if ( isInBounds(x,y,z)) {
      return _grid[z][y][x].selected;
    }
    return false;
  }

  var update = function() {
    for ( var z = 0; z < _size; z++ ) {
      for ( var y = 0; y < _size; y++ ) {
        for ( var x = 0; x < _size; x++ ) {
          _grid[z][y][x].update();
        }
      }
    }
  };

  var addScent = function( amount, x, y, z ) {
    return _grid[z][y][x].addScent(amount);
  };

  var spreadScent = function() {
    for ( var z = 0; z < _size; z++ ) {
      for ( var y = 0; y < _size; y++ ) {
        for ( var x = 0; x < _size; x++ ) {

        }
      }
    }
  }

  return {
    init: init,
    update: update,
    getTiles: getTiles,
    getCurrentLevel: getCurrentLevel,
    changeLevel: changeLevel,
    getSize: getSize,
    isCrawlable: isCrawlable,
    isBuildable: isBuildable,
    isSelected: isSelected,
    dig: dig,
    build: build,
    select: select,
    addScent: addScent,
    getNeighbors: getNeighbors,
  }
})();
