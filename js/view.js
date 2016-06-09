var APP = APP || {};

APP.View = (function() {
  var TILE_SIZE = 12;

  var canvas, ctx;

  var init = function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
  };

  var _clear = function() {
    ctx.fillStyle = "#eee";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  var _render = function(canvasData) {

    var z = canvasData.level;
    var tiles = canvasData.tiles;
    var ants = canvasData.ants;

    _renderTiles( tiles, z );
    _renderAnts( ants, z );

  };

  var _renderTiles = function( tiles, z ) {
    for ( var y = 0; y < tiles.length; y++ ) {
      for ( var x = 0; x < tiles[z][y].length; x++ ) {
        _renderTile( tiles, x, y, z );
        _renderScent( tiles[z][y][x].getScent(), { x: x * TILE_SIZE + TILE_SIZE/2, y: y * TILE_SIZE + TILE_SIZE/2 } );
      }
    }
  };

  var _renderTile = function( tiles, x, y, z ) {
    if ( tiles[z][y][x].material === "air" && tiles[z-1][y][x].material === "dirt" ) {
      if ( tiles[z-1][y][x].selected ) {
        ctx.fillStyle = "#282";
      } else {
        ctx.fillStyle = "#642";
      }
    } else if ( tiles[z][y][x].material === "dirt" ) {
      if ( tiles[z][y][x].selected ) {
        ctx.fillStyle = "#151";
      } else {
        ctx.fillStyle = "#321";
      }
    } else {
      ctx.fillStyle = "#eee";
    }

    ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  var _renderScent = function( scent, center ) {
    ctx.beginPath();
    ctx.arc(center.x, center.y, (scent/100)*(TILE_SIZE/2), 0, 2 * Math.PI);
    ctx.fillStyle = "#e1e";
    ctx.fill();
  };

  var _renderAnts = function( ants, z ) {
    for ( var i = 0; i < ants.length; i++ ) {
      var ant = ants[i];
      if ( ant.z === z ) {
        ctx.beginPath();
        ctx.arc(ant.x * TILE_SIZE + TILE_SIZE/2, ant.y * TILE_SIZE + TILE_SIZE/2, TILE_SIZE/2, 0, 2 * Math.PI);
        ctx.fillStyle = ant.color;
        ctx.fill();
      }
    }
  };

  var draw = function(canvasData) {
    _clear();
    _render(canvasData);
  };

  return {
    init: init,
    draw: draw,
  }
})();
