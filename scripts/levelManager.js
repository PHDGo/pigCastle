import { toType } from './utils.js'
import { roleArray } from './sequencing.js'
import metaMap from './metaMap.js'
import om from './obstacle.js'
import game from './game.js'
import Role from './role.js'

let uid = 0

export default {
  n: undefined,
  map: undefined,
  init (level) {
    this.n = level
    level = this.level[level]
    // 将关卡地图信息注入om.tileDatabase
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
              om.tileDatabase[tileY][tileX]['physicsBox'] = {
                left: x,
                top: y,
                right: x + w,
                bottom: y + h
              }
            }
          }
        }
      }
    })
    /**
     * 如果是玩家角色，只注入坐标信息
     * 非玩家角色则根据states属性实例化，并注入坐标信息
     */
    let keys = Object.keys(level.roles)
    keys.forEach((role) => {
      let info = level.roles[role]
      if (Array.isArray(info)) {
        // 多个非玩家角色
        info.forEach((coor) => {
          role = this.generateRole(coor, role)
          roleArray.push(role)
        })
      } else if (toType(info) === "Object") {
        let player = game.player
        console.log(player.assetName, role)
        if (role === player.assetName) {// 是玩家角色
          player.uid = uid++
          player.x = info.x
          player.y = info.y
          roleArray.push(player)
        } else {
          role = this.generateRole(info, role)// 单个非玩家角色
          roleArray.push(role)
        }
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
          y: 0,
          pb: true
        },
        /**
        'King Pig': {
          x: 0,
          y: 0,
          state: 'Idle'
        }
         */
      }
    },
  ],
  generateRole (info, assetName) {
    let role = new Role({
      assetName,
      state: info.state, // enter state
      dir: info.dir,
      pb: info.pb
    })

    role.x = info.x
    role.y = info.y
    role.uid = uid++
    return role
  }
}
