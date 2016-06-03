var APP = APP || {};

APP.Main = (function(view, antModule, board) {
  var SIZE = 64;

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
  };

  var update = function() {
    antModule.update();
    board.update();

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
  }, 1000 / 24)
});
