var APP = APP || {};

APP.Ant = function(board, data) {
  this.x = data.x;
  this.y = data.y;
  this.z = data.z;
  this.color = data.color;
  this.kind = data.kind;
  this.carry = null;

  this.update = function() {
    board.addScent(this.x, this.y, this.z);
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
    if ( board.isSelected( x, y, z ) ) {
      var result = board.dig( x, y, z );
      if ( result ) {
        this.carry = result;
      } else {
        this.crawl( x, y, z );
      }
    }
  };

  this.crawl = function( x, y, z ) {
    if (board.isCrawlable( x, y, z ) ) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  };

  this.build = function( x, y, z ) {
    if ( board.isBuildable( x, y, z ) ) {
      board.build( x, y, z, this.carry );
      this.carry = null;
    } else {
      this.crawl( x, y, z );
    }
  };
};
