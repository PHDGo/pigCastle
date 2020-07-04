const fs = require('fs')
const path = require('path')
const { workerData } = require('worker_threads')

let p = '../assets/map'

let results = fs.readdirSync(p)
let jsons = [], world = []

results.forEach((dir) => {
  if (path.extname(dir) === '.json') {
    // dir = path.resolve(__dirname, '../', 'assets/map/' + dir)
    dir = '../assets/map/' + dir
    jsons.push(dir)
  }
})

genMetaMap(jsons)

function genMetaMap (jsons) {
  let n = 0, len = jsons.length
  jsons.forEach(json => {
    fs.readFile(json, (err, data) => {
      n++
      if (err) {
        throw err
      }

      let map = {}
      data = JSON.parse(data)

      // handle map data
      map.width = data.width
      map.height = data.height
      map.tileWidth = data.tilewidth
      map.tileHeight = data.tileheight
      map.tilesets = data.tilesets
      map.layers = []

      data.layers.forEach(layer => {
        if (layer.type !== 'tilelayer') return
        let tileData = [], tempData = layer.data
        for (let i = 0, len = tempData.length; i < len; i++) {
          let y = Math.floor(i / layer.width)
          let x = i - y * layer.width
          if (!tileData[y]) {
            tileData[y] = []
          }
          tileData[y][x] = tempData[i]
        }
        let lo = {
          name: layer.name,
          x: layer.x,
          y: layer.y,
          width: layer.width,
          height: layer.height,
          data: tileData,
          opacity: layer.opacity
        }
        map.layers.push(lo)
      })

      world.push(map)
      if (n === len) {
        writeMapToFile()
      }
    })
  })
}

function writeMapToFile () {
  fs.writeFile('../assets/map/metamap.js', JSON.stringify(world), (err) => {
    if (err) {
      throw err
    }
    console.log('Done')
  })
}