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

  this.chooseNeighbor = function() {
    var neighbors = board.getNeighbors(this.x, this.y, this.z);
    var totalScent = 0;

    for ( var n = 0; n < neighbors.length; n++ ) {
      totalScent += neighbors[n].getScent();
    }

    for ( var n = 0; n < neighbors.length; n++ ) {
      neighbors[n].getScent() / totalScent;
    }

    return {
      x: 0,
      y: 0,
      z: 0,
    };
  };

  this.move = function() {
    // var dX = Math.round( Math.random() * 2 - 1 );
    // var dY = Math.round( Math.random() * 2 - 1 );
    // var dZ = Math.round( Math.random() * 2 - 1 );
    // var choose = Math.round(Math.random());
    // switch (choose) {
    //   case 0:
    //   this.crawl( this.x + dX, this.y + dY, this.z + dZ );
    //     break;
    //   default:
    //   if ( this.carry ) {
    //     this.build( this.x + dX, this.y + dY, this.z + dZ );
    //   } else {
    //     this.dig( this.x + dX, this.y + dY, this.z + dZ );
    //   }
    // }
    var neighbors = board.getNeighbors(this.x, this.y, this.z);
    var crawlable = [];
    var diggable = [];
    var buildable = [];

    for ( var n = 0; n < neighbors.length; n++ ) {
      var neighbor = neighbors[n];
      if ( board.isCrawlable( neighbor.x, neighbor.y, neighbor.z ) ) {
        crawlable.push(neighbor);
      }

      if ( board.isSelected( neighbor.x, neighbor.y, neighbor.z ) ) {
        diggable.push(neighbor);
      }

      if ( board.isBuildable(  neighbor.x, neighbor.y, neighbor.z ) ) {
        buildable.push(neighbor)
      }
    }

    if ( this.carry === "dirt" ) {
      if ( buildable.length > 0 ) {
        var location = buildable[ Math.floor( Math.random() * buildable.length ) ]
        this.build(location.x, location.y, location.z);
      } else {
        var location = crawlable[ Math.floor( Math.random() * crawlable.length )]
        this.crawl(location.x, location.y, location.z)
      }
    } else if () {
      // Diggable avail and not carrying anything

    } else {
      // Otherwise
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
