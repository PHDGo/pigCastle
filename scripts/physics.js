/**
 * 角色使用的physicsBox，角色初始化选项pb为true时启用
 */

import { resolvedBoxData } from './boxData.js'
import levelManager from './levelManager.js'
import om from './obstacle.js'

export const gravity = 0.3

// whole 用于判断是否碰撞地图

export default function physicsBox(holder, assetName) {
  /* more properties: wholeArea, bodyArea, attackArea and box, which are injected when setArea function rendered */
  this.holder = holder
  this.boxes = resolvedBoxData[assetName]
  this.run()
}

physicsBox.prototype = {
  constructor: physicsBox,
  run () {
    let holder = this.holder,
        jumping = false;
    ['whole', 'body', 'attack'].forEach(area => this.setArea(area)) // 更新 wholeArea、 bodyArea 和 attack 属性
    this.setBox() // 根据 wholeArea 更新 box 属性，box 含有的四个属性代表角色的四个边缘在地图上的位置
    console.log(this.holder.physicsBox)
    holder.vx += holder.ax
    if (holder.vx > holder.vx_max) {
      holder.vx = holder.vx_max
    } else if (holder.vx < -holder.vx_max) {
      holder.vx = -holder.vx_max
    }
    if (holder.vy < 0) {
      jumping = true
    }
    holder.vy += holder.ay
    if (holder.vy > 0 && jumping) {
      holder.vy = 0
    }
    holder.x += holder.vx
    holder.y += holder.vy
    this.collideMapDetection() // 检测是否碰撞地图
  },
  collideMapDetection () {
    if (!this.box) return
    let tileWidth = levelManager.map.tileWidth,
        tileHeight = levelManager.map.tileHeight,
        tileDataBase = om.tileDatabase,
        box = this.box,
        holder = this.holder,
        mapTileXLeft, mapTileXRight, mapTileYTop, mapTileYBot
        
    mapTileXLeft = Math.floor(box.left / tileWidth)
    mapTileXRight = Math.floor(box.right / tileWidth)
    mapTileYTop = Math.floor(box.top / tileHeight)
    mapTileYBot = Math.floor(box.bottom / tileHeight)

    if (holder.vx > 0) { // 角色有向右速度
      for (let tileY in tileDataBase) {
        for (let tileX in tileDataBase[tileY]) {
          if (Number(tileX) === mapTileXRight) {
            let obj = tileDataBase[tileY][tileX].physicsBox
            if (intersect(box, obj)) {
              holder.x = obj.left - (box.right - box.left + 1) // 角色坐标修正
              holder.vx = 0 // 角色速度归零
            }
          }
        }
      }
    } else if (holder.vx < 0) { // 角色有向左速度
      for (let tileY in tileDataBase) {
        for (let tileX in tileDataBase[tileY]) {
          if (Number(tileX) === mapTileXRight) {
            let obj = tileDataBase[tileY][tileX].physicsBox
            if (intersect(box, obj)) {
              holder.x = obj.right + 1
              holder.vx = 0
            }
          }
        }
      }
    }
    if (holder.vy > 0) { // 角色有向下速度
      if (tileDataBase[mapTileYTop]) {
        for (let tileX in tileDataBase[mapTileYTop]) {
          let obj = tileDataBase[mapTileYTop][tileX].physicsBox
          if (intersect(box, obj)) {
            holder.y = obj.top - (box.bottom - box.top + 1)
            holder.vy = 0
          }
        }
      }
    } else if (holder.vy < 0) {// 角色有向上速度
      if (tileDataBase[mapTileYTop]) {
        for (let tileX in tileDataBase[mapTileYBot]) {
          let obj = tileDataBase[mapTileYBot][tileX].physicsBox
          if (intersect(box, obj)) {
            holder.y = obj.bottom - 1
            holder.vy = 0
          }
        }
      }
    }
  },
  collideRoleDetection () {

  },
  setBox () {
    // 由 whole 产生 box
    let wholeArea = this.wholeArea,
        holder = this.holder,
        w, h
    if (!wholeArea) {
      this.box = null
    } else {
      w = wholeArea.right - wholeArea.left + 1
      h = wholeArea.bottom - wholeArea.top + 1
      this.box = {
        left: holder.x,
        top: holder.y,
        right: holder.x + w - 1,
        bottom: holder.y + h - 1
      }
    }
  },
  setArea (type) { // value of param 'type' is 'attack'\'body'\'whole'
    let holder = this.holder,
        boxes = this.boxes[holder._state.name][type]
    if (boxes && boxes.length) { // boxes 必定是数组，若非空则长度必和对应状态的帧数相同
      this[type + 'Area'] = boxes[holder.frameIdx]
    } else {
      this[type + 'Area'] = null
    }
  }
}

export function intersect(a, b, type) {
  let moreThanArea = b.moreThanArea || 0
  if (!(a.top < b.bottom || a.right < b.left || a.bottom > b.top || a.left > b.right)) {
    if (!moreThanArea) {
      return true
    } else {
      let width, height
      width = a.left < b.left ? a.right - a.left + 1 : b.right - b.left + 1
      height = a.top < b.top ? a.bottom - a.top + 1 : b.bottom - b.top + 1
      if ((width - Math.abs(a.left - b.left)) * (height - Math.abs(a.top - b.top)) > moreThanArea) {
        return true
      }
    }
  }
  return false
}