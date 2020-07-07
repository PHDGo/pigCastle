/**
 * 定义各种角色状态机，实例化玩家可操作角色并导出
 * 对于非玩家可操作角色只导出状态机，在初始化关卡时使用
 */

import {
  noob,
  abstractMethod
} from './utils.js'
import { InputHandler } from './control.js'
import { FRAME_SWITCH_PERIOD } from './sequencing.js'
import physicsBox, { gravity } from './physics.js'
import loader from './loader.js'
import game from './game.js'

export default function Role ({
  assetName,
  state,
  dir,
  pb, /* boolean */
  health,
  energy,
  vx_max,
  self_ax,
  self_vy
}) {
  if (!assetName) {
    throw new Error("Role initialization failed: Property assetName is required")
  }

  // 内部状态
  this._frameIdx = 0
  this._assetName = assetName
  switch (assetName) {
    case 'King Human':
      this._states = kingHumanStates
      break
    case 'King Pig':
      this._states = kingPigStates
      break
    case 'door':
      this._states = doorStates
      break
  } // 暂时三种
  this._state = this._states[state || 'Idle']
  this._state.enter(this)
  this._dir = dir || Math.random() > 0.5 ? 'right' : 'left'
  this._tick = 0

  /**
   * 游戏属性
   * more properties: uid, x and y are defined by levelManager
   */
  health ? this.health = health : ''
  energy ? this.energy = energy : ''
  vx_max ? this.vx_max = vx_max : '' // 最大水平移动速度
  self_ax ? this.self_ax = self_ax : '' // 自身能提供的水平加速度
  self_vy ? this.self_vy = self_vy : '' // 起跳时的初始垂直速度
  this.ax = 0
  this.ay = gravity
  this.vx = 0
  this.vy = 0

  if (pb) {
    this.physicsBox = new physicsBox(this, this._assetName)
  }
}

Role.prototype = {
  constructor: Role,
  handleInput (command) {
    this._state.handleInput(this, command)
  },
  update () {
    this._state.update(this)
    if (this.physicsBox) {
      this.physicsBox.run()
    }
  },
  animate () {
    if (++this._tick > FRAME_SWITCH_PERIOD) {
      this._frameIdx++
      this._tick = 1
    }
  },
  setGraphics (graph) {
    this._frameIdx = 0
    this.sprite = loader.assets.sprite[this._assetName][graph]['sprite']
  },
  render (interpolationFactor) {
    // console.log(this.physicsBox)
    let wholeArea = this.physicsBox.wholeArea,
        w = wholeArea.right - wholeArea.left + 1,
        h = wholeArea.down - wholeArea.up + 1,
        mapX = this.x,
        mapY = this.y
    game.stage.ctx.save()
    if (this._dir === 'left') {
      game.stage.ctx.scale(-1, 1)
    }
    game.stage.ctx.drawImage(this.sprite, wholeArea.x, wholeArea.y, w, h, mapX, mapY, w, h)
    game.stage.ctx.restore()
  },
  intersectWith () {
    this.physicsBox.intersectWith()
  },
  bleed (health) {
    this.health -= health
  }
}

export function State ({name, enter, handleInput, update}) {
  this.name = name
  this.enter = enter
  this.handleInput = handleInput
  this.update = update
}

State.prototype = {
  enter: abstractMethod,
  handleInput: abstractMethod,
  update: abstractMethod
}

// states

let kingHumanStates = {
  // perk
  DoorIn: new State({
    name: 'DoorIn',
    enter (ctx) {
      ctx.setGraphics('Door In')
    },
    handleInput: noob,
    update (ctx) {
      ctx.animate()
      if (this._frameIdx >= this.sprite.frame) {
        // 结束关卡
      }
    }
  }),
  DoorOut: new State({
    name: 'DoorOut',
    enter (ctx) {
      ctx.setGraphics('Door Out')
    },
    handleInput: noob,
    update (ctx) {
      ctx.animate()
      if (this._frameIdx >= this.sprite.frame) {
        ctx.state = kingStates.idle
        ctx.state.enter(ctx)
      }
    }
  }),
  Idle: new State({
    name: 'Idle',
    enter (ctx) {
      ctx.setGraphics('Idle')
    },
    handleInput (ctx, command) {
      if (command === InputHandler._attack_) {
        ctx.state = kingStates.attack
        ctx.state.enter(ctx)
      } else if (command === InputHandler._keydown_buttonUp_) {
        ctx.state = kingStates.jump
        ctx.state.enter(ctx)
      } else if (command === InputHandler._keydown_buttonRight_) {
        ctx.state = kingStates.run
        ctx.state.enter(ctx, command.dir)
      } else if (command === InputHandler._keydown_buttonDown_) {
        ctx.state = kingStates.jump
        ctx.state.enter(ctx)
      } else if (command === InputHandler._keydown_buttonLeft_) {
        ctx.state = kingStates.run
        ctx.state.enter(ctx, command.dir)
      }
    },
    update (ctx) {
      ctx.animate()
      if (ctx._frameIdx >= ctx.sprite.frame) {
        ctx._frameIdx = 0
      }
      ctx.ax = 0
      ctx.ay = gravity
      ctx.vx = 0
    }
  }),
  Hit: new State({
    name: 'Hit',
    enter (ctx) {
      ctx.setGraphics('Hit')
    },
    handleInput: noob,
    update (ctx) {
      ctx.animate()
      if (ctx._frameIdx >= ctx.sprite.frame) {
        if (ctx.health <= 0) {
          ctx.state = kingStates.dead
          ctx.state.enter(ctx)
        } else {
          ctx.state = kingStates.idle
          ctx.state.enter(ctx)
        }
      }
      ctx.ax = 0
      ctx.ay = 0
      ctx.vx = 0
      ctx.vy = 0
    }
  }),
  Dead: new State({
    name: 'Dead',
    enter (ctx) {
      ctx.setGraphics('Dead')
    },
    handleInput: noob,
    update (ctx) {
      ctx.animate()
      if (ctx._frameIdx >= ctx.sprite.frame) {
        // game over
      }
      ctx.ax = 0
      ctx.ay = gravity
      ctx.vx = 0
    }
  }),
  // active
  Run: new State({
    name: 'Run',
    enter (ctx, dir) {
      if (dir !== ctx._dir) {
        ctx._dir = dir
        ctx.vx = 0
      }
      ctx.setGraphics('Run')
    },
    handleInput (ctx, command) {
      if (command === InputHandler._attack_) {
        ctx.state = kingStates.attack
        ctx.state.enter(ctx)
      } else if (command === InputHandler._dorge_) {
        ctx.state = kingStates.dorge
        ctx.state.enter(ctx)
      } else if (command === InputHandler._keydown_buttonUp_) {
        ctx.state = kingStates.jump
        ctx.state.enter(ctx)
      }
    },
    update (ctx) {
      ctx.animate()
      if (ctx._frameIdx >= ctx.sprite.frame) {
        ctx._frameIdx = 0
      }
      if (ctx.dir === 'left') {
        ctx.ax = -ctx.self_ax
      } else if (ctx.dir === 'right') {
        ctx.ax = ctx.self_ax
      }
      ctx.ay = gravity
    }
  }),
  Jump: new State({
    name: 'Jump',
    enter (ctx) {
      ctx.setGraphics('Jump')
    },
    handleInput: noob,
    update (ctx) {
      if (ctx._frameIdx >= ctx.sprite.frame) {
        ctx._frameIdx = 0
      }
      if (ctx.vy = 0) {
        ctx.state = kingStates.fall
        ctx.state.enter(ctx)
      }
      ctx.ay = gravity
      ctx.vy = -self_vy
    }
  }),
  Fall: new State({
    name: 'Fall',
    enter (ctx) {
      ctx.setGraphics('Fall')
    },
    handleInput: noob,
    update () {
      if (ctx._frameIdx >= ctx.sprite.frame) {
        ctx._frameIdx = 0
      }
      if (ctx.vy = 0) {
        ctx.state = kingStates.ground
        ctx.state.enter(ctx)
      }
    }
  }),
  Ground: new State({
    name: 'Ground',
    enter (ctx) {
      ctx.setGraphics('Ground')
    },
    handleInput: noob,
    update () {
      if (ctx._frameIdx >= ctx.sprite.frame) {
        ctx.state = kingStates.idle
        ctx.state.enter(ctx)
      }
    }
  }),
  Attack: new State({
    name: 'Attack',
    enter (ctx) {
      ctx.setGraphics('Attack')
    },
    handleInput: noob,
    update () {
      // 判断碰撞

      if (ctx._frameIdx >= ctx.sprite.frame) {
        ctx.state = kingStates.idle
        ctx.state.enter(ctx)
      }
    }
  }),
  // 暂时忽略此状态
  Dorge: new State({
    name: 'Dorge',
    enter (ctx) {
      ctx.setGraphics()
    },
    handleInput: noob,
    update () {
  
    }
  })
}

export let doorStates = {
  idle: new State({
    name: 'idle',
    enter (ctx) {
      ctx.setGraphics('Idle')
    },
    handleInput: noob,
    update () {
      
    }
  }),
  opening: new State({
    name: 'opening',
    enter (ctx) {
      ctx.setGraphics('Opening')
    },
    handleInput: noob,
    update () {
      
    }
  }),
  closing: new State({
    name: 'closing',
    enter (ctx) {
      ctx.setGraphics('Closing')
    },
    handleInput: noob,
    update () {
      
    }
  })
}

let kingPigStates = {

}