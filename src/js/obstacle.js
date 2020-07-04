// flyweight mode
function Tile (texture, w_obsfraction = 0, h_obsfraction = 0, movementCost = 0) {
  this.texture = texture
  this.w_obsfraction = w_obsfraction
  this.h_obsfraction = h_obsfraction
  this.movementCost = movementCost
}

let obstacleTexture = [21, 22, 23, 25, 27, 28, 30, 31, 33, 34, 36, 40, 41, 42, 44, 46, 47, 49, 50, 52, 53, 55, 56, 59, 60, 61, 63, 84, 85, 87, 88, 90, 91, 93, 94, 97, 98, 99, 101, 103, 104, 106, 107, 109, 110, 112, 113],
    quaterTexture = [257, 258, 259, 260],
    halfTexture = [264, 265, 266, 267]

let tileFactory = (function(){
  let tiles = {}
  return {
    createTile (texture) {
      let tile = tiles.texture
      if (tile) return tile
      else {
        let w_obsfraction, h_obsfraction
        let movementCost = 1
        // 此处省略其他情况，需要时记得添加分支，否则可能造成bug
        if (obstacleTexture.indexOf(texture) > -1) {
          w_obsfraction = 1,
          h_obsfraction = 1
        } else if (quaterTexture.indexOf(texture) > -1) {
          w_obsfraction = 1,
          h_obsfraction = 0.25
        } else if (halfTexture.indexOf(texture) > -1) {
          w_obsfraction = 1,
          h_obsfraction = 0.5
        } else {
          movementCost = 0
        }
        return tiles.texture = new Tile(texture, w_obsfraction, h_obsfraction, movementCost)
      }
    }
  }
})()

let ObstacleManager = function(){
  this.tileDatabase = {}
}

ObstacleManager.prototype = {
  addTile (texture, tileX, tileY) {
    let tile = tileFactory.createTile(texture),
      tileDatabase = this.tileDatabase

    if (!tileDatabase[tileY]) {
      tileDatabase[tileY] = {}
    }

    tileDatabase[tileY][tileX] = {
      tileX,
      tileY,
      tile
    }
  },
  getMovementCost (tileX, tileY) {
    return this.tileDatabase[tileY][tileX][tile].movementCost
  },
  getTexture (tileX, tileY) {
    return this.tileDatabase[tileY][tileX][tile].texture
  },
  clear () {
    this.tileDatabase = {}
  }
}

export default new ObstacleManager()