import levelManager from './levelManager.js'
import game from './game.js'
import loader from './loader.js'

export let metaMap = [
  {
    width: 13,
    height: 14,
    tileWidth: 32,
    tileHeight: 32,
    tilesets: [
      { firstgid: 1, source: "Terrain (32x32).tsx" },
      { firstgid: 248, source: "Decorations (32x32).tsx" },
    ],
    layers: [
      {
        name: "background0",
        x: 0,
        y: 0,
        width: 13,
        height: 14,
        data: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 135, 136, 136, 136, 136, 136, 136, 136, 136, 136, 137, 0],
          [0, 154, 155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0],
          [0, 154, 155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0],
          [0, 173, 142, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0],
          [0, 0, 154, 155, 155, 155, 155, 155, 155, 141, 174, 175, 0],
          [0, 135, 161, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0],
          [0, 154, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0],
          [0, 154, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0],
          [0, 154, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0],
          [0, 154, 155, 155, 155, 155, 155, 155, 155, 160, 136, 137, 0],
          [0, 154, 155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0],
          [0, 173, 174, 174, 174, 174, 174, 174, 174, 174, 174, 175, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        opacity: 1,
      },
      {
        name: "background1",
        x: 0,
        y: 0,
        width: 13,
        height: 14,
        data: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 256, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 263, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 263, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 277, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 273, 274, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 280, 281, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 256, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 263, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 270, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        opacity: 1,
      },
      {
        name: "terrain0",
        x: 0,
        y: 0,
        width: 13,
        height: 14,
        data: [
          [27, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 28],
          [42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40],
          [42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40],
          [42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40],
          [42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40],
          [50, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40],
          [42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 22, 47],
          [42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0],
          [42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0],
          [42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 59, 60, 28],
          [42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40],
          [42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40],
          [42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40],
          [46, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 47],
        ],
        opacity: 1,
      },
      {
        name: "terrain1",
        x: 0,
        y: 0,
        width: 13,
        height: 14,
        data: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 257, 258, 258, 259, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 264, 265, 266, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 267, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 264, 265, 266, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 260, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        opacity: 1,
      },
      {
        name: "foreground",
        x: 0,
        y: 0,
        width: 13,
        height: 14,
        data: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 256, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 263, 0, 0, 0, 0],
          [0, 0, 0, 0, 256, 0, 0, 0, 270, 0, 0, 0, 0],
          [0, 0, 0, 0, 263, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 263, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 270, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        opacity: 0.7,
      },
    ],
  },
]

export default {
  renderXoffset: undefined,
  renderYoffset: undefined,
  computeRenderOffset () {
    let map = levelManager.level[levelManager.n]['map'],
        width = map.tileWidth * map.width,
        height = map.tileHeight * map.height,
        stage = game.stage
    
    // if the map's size is small than canvas's
    if (width < stage.width && height < stage.height) {
      this.renderXoffset = (stage.width - width) / 2
      this.renderYoffset = (stage.height - height) / 2
    }

    // to be supplymented: if the map is larger than canvas
  },
  render () {
    let layers = levelManager.map.layers,
        tilesets = levelManager.map.tilesets,
        firstgidArray = [],
        sourceArray = []
    
    tilesets.forEach(tileset => {
      let to = loader.assets.sprite.TileSets[convertFileName(tileset.source)]
      firstgidArray.push(tileset.firstgid)
      sourceArray.push(to)
    })

    layers.forEach((layer) => {
      if (/foreground/.test(layer.name) !== true) {
        let data = layer.data
        for (let y in data) {
          for (let x in data) {
            let texture = data[y][x],
                n = -1

            if (texture === 0) continue
            for (let i in firstgidArray) {
              if (firstgidArray[i] > texture) break
              n++
            }

            let tilesetObj = sourceArray[n]
            let width = tilesetObj.width
            let height = tilesetObj.height
            let ctx = game.stage.bCtx
            let frame = tilesetObj.frame

            texture -= firstgidArray[n]
            mapXOffset = texture % frame
            mapYOffset = Math.floor(texture / frame)

            ctx.save()
            ctx.translate(this.renderXoffset, this.renderYoffset)
            ctx.drawImage(tilesetObj.sprite, mapXOffset * width, mapYOffset * height, width, height, x * width, y * height, width, height)
            ctx.restore()
          }
        }
      }
    })
  }
}