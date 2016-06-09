var APP = APP || {};

APP.Tile = function(data) {
  this.material = data.material;
  this.scent = 0;
  this.revealed = false;
  this.selected = false;

  this.select = function() {
    this.selected = true;
  }

  this.deselect = function() {
    this.selected = false;
  }

  this.reveal = function() {
    this.revealed = true;
  };

  this.addScent = function(amount) {
    if ( this.scent < 100 ) {
      this.scent = 100;
    }
  };

  this.decayScent = function() {
    if ( this.scent > 0 ) {
      this.scent -= 1;
    }
  };

  this.getScent = function() {
    return this.scent;
  };

  this.update = function() {
    this.decayScent();
  };
};
