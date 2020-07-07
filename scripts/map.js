import levelManager from './levelManager.js'
import game from './game.js'
import loader from './loader.js'
import {convertFileName} from './utils.js'

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

            let tilesetObj = sourceArray[n],
                width = tilesetObj.width,
                height = tilesetObj.height,
                ctx = game.stage.bCtx,
                frame = tilesetObj.frame

            texture -= firstgidArray[n]
            let mapXOffset = texture % frame,
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