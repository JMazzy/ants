var APP = APP || {};

APP.Tile = function(data) {
  this.material = data.material;
  this.neighbors = data.neighbors;
  this.scent = 0;
  this.revealed = false;
  this.selected = false;

  this.select = function() {
    this.selected = true;
  };

  this.deselect = function() {
    this.selected = false;
  };

  this.isSelected = function() {
    return this.selected;
  };

  this.reveal = function() {
    this.revealed = true;
  };

  this.removeScent = function(amount) {
    if ( this.scent - amount < 0 ) {
      this.scent = 0;
    } else {
      this.scent -= amount;
    }
  };

  this.addScent = function(amount) {
    if ( this.scent + amount > 100 ) {
      this.scent = 100;
    } else {
      this.scent += amount;
    }
  };

  this.getScent = function() {
    return this.scent;
  };

  this.emptyScent = function() {
    this.scent = 0;
  }

  this.update = function() {
    this.removeScent(1);
  };
};
