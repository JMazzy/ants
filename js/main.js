var APP = APP || {};

APP.Main = (function(view, antModule, board) {
  var SIZE = 64;
  var selecting = false;
  var deselecting = false;

  var d = new Date();
  var lastTime = d.getTime();

  var init = function() {
    board.init(SIZE);
    antModule.init(board);
    view.init();

    $( document ).keydown( function(e) {

      switch (e.keyCode) {
        case 38:
        board.changeLevel(1);
          break;
        case 40:
        board.changeLevel(-1);
          break;
        default:

      }
    });

    var canvas = $("#canvas");

    canvas.mousedown(function(e) {
      selecting = true;
    });

    canvas.mouseup(function(e) {
      selecting = false;
    });

    canvas.mousemove(function(e) {
      var x = e.offsetX;
      var y = e.offsetY;

      var tileX = Math.floor(x/12);
      var tileY = Math.floor(y/12);

      if ( selecting ) {
        board.select( tileX, tileY );
      }
    });

    canvas.bind('mousewheel', function(e){
      if(e.originalEvent.wheelDelta /120 > 0) {
        board.changeLevel(1);
      } else {
        board.changeLevel(-1);
      }
    });
  };

  var update = function() {
    d = new Date();
    var currentTime = d.getTime();
    var dT = currentTime - lastTime;

    if ( dT > 1000 ) {
      antModule.update();
      board.update();
      lastTime = currentTime;
    }

    var canvasData = { level: board.getCurrentLevel(), tiles: board.getTiles(), ants: antModule.getAnts() };

    view.draw(canvasData);
  };

  return {
    init: init,
    update: update,
  };
})(APP.View, APP.AntModule, APP.Board);

$( document ).ready(function() {
  APP.Main.init();

  setInterval( function() {
    APP.Main.update();
  }, 40)
});
