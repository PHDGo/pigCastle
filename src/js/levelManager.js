import { toType } from './utils.js'
import om from './obstacle.js'

let uid = 0

export default {
  n: undefined,
  map: undefined,
  init (level) {
    this.n = level
    level = this.level[level]
    
    let map = this.map = level['map']
    map.layers.forEach((layer) => {
      if (/terrain/.test(layer.name)) {
        let data = layer.data
        for (let tileY = 0, len = layer.height; tileY < len; tileY++) {
          for (let tileX = 0, len = layer.width; tileX < len; tileX++) {
            let texture = data[tileY][tileX]
            if (texture !== 0) {
              om.addTile(texture, tileX, tileY)
              // inject physicsBox into tiles
              let W = map.tileWidth,
                  H = map.tileHeight,
                  tile = om.tileDatabase[tileY][tileX]['tile'],
                  x = tileX * W,
                  y = tileY * H,
                  w = tile.w_obsfraction * W,
                  h = tile.h_obsfraction * H
              om.tileDatabase[tileY][tileX]['physicsBox'] = {x, y, w, h}
            }
          }
        }
      }
    })
    /**
     * 如果是玩家角色，只注入坐标信息
     * 非玩家角色则根据states属性实例化，并注入坐标信息
     */
    let keys = level.roles.keys()
    keys.forEach((role) => {
      let info = level.roles[role]
      if (Array.isArray(info)) {
        if (role = player.assetName) { // 是玩家角色
          player.uid = uid++
          player.coor = {
            x: info.x,
            y: info.y
          }
          roleArray.push(player)
        } else { // 多个非玩家角色
          info.forEach((coor) => {
            let role = this.generateRole(coor, role)
            roleArray.push(role)
          })
        }
      } else if (toType(info) === "Object") { // 单个非玩家角色
        let role = this.generateRole(coor, role)
        roleArray.push(role)
      } else {
        throw new Error('Info should be array or object type.')
      }
    })    
  },
  // 关卡信息
  level: [
    {
      name: 'test',
      map: metaMap[0],
      roles: {
        'King Human': {
          x: 0,
          y: 0
        },
        door: {
          x: 0,
          y: 0
        },
        'King Pig': {
          x: 0,
          y: 0
        }
      }
    },
  ],
  generateRole (coor, assetName) {
    let role = new Role({
      assetName,
      state: 'idle', // enter state
      dir: Math.random() > 0.5 ? 'right' : 'left', // 随机朝向
    })
    role.coor = {
      x: coor.x,
      y: coor.y
    }
    role.uid = uid++
    return role
  }
}
