import boxData from './boxData.js'

export const gravity = 10

// whole 用于判断是否碰撞地图

export default function physicsBox(holder, assetName) {
  /* more properties: wholeArea bodyArea attackArea */
  this.holder = holder
  this.boxes = boxData[assetName]
  this.switchPhase()
}

physicsBox.prototype = {
  constructor: physicsBox,
  switchPhase () {
    let state = this.boxes[this.holder.state],
        frameIdx = holder.frameIdx,
        wholeArea = this.wholeArea = {}
    let box = state['whole'][frameIdx]
    if (box) {
      wholeArea.up = box.y
      wholeArea.right = box.x + box.w
      wholeArea.down = box.y + box.h
      wholeArea.left = box.x
    }
    box = state['body'] && state['body'][frameIdx]
    box ? this.setArea('body')
        : this.clearArea('body')

    box = state['attack'] && state['attack'][frameIdx]
    box ? this.setArea('attack')
        : this.clearArea('attack')
  },
  intersectWith (box, moreThanArea) {
    moreThanArea = moreThanArea || 0
    if (!(this.up < box.down || this.right < box.left || this.down > box.up || this.left > this.right)) {
      if (!moreThanArea) {
        return true
      } else {
        let width, height
        width = this.x < box.x ? this.width : box.width
        height = this.y < box.y ? this.height : box.height
        if ((width - Math.abs(this.x - box.x)) * (height - Math.abs(this.y - box.y)) > moreThanArea) {
          return true
        }
      }
    }
    return false
  },
  setArea (type) { // value of param 'type' is 'attack'\'body'\'whole'
    let holder = this.holder
    if (boxes = this.box[holder.state.name][type]) {
      this[type + 'Area'] = boxes[holder.frameIdx] // type is object or array
    }
  },
  clearArea (type) {
    this[type + 'Area'] = null
  }
}

export function intersectWith (box, moreThanArea) {
  moreThanArea = moreThanArea || 0
  if (!(this.up < box.down || this.right < box.left || this.down > box.up || this.left > this.right)) {
    if (!moreThanArea) {
      return true
    } else {
      let width, height
      width = this.x < box.x ? this.width : box.width
      height = this.y < box.y ? this.height : box.height
      if ((width - Math.abs(this.x - box.x)) * (height - Math.abs(this.y - box.y)) > moreThanArea) {
        return true
      }
    }
  }
  return false
}