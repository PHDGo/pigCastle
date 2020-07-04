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
import physicsBox from './physics.js'
import loader from './loader.js'
import game from './game.js'

export default function Role ({
  assetName,
  states,
  state,
  dir,
  pb /* boolean */
}) {
  /* more properties: uid coor */
  if (!assetName || !state) {
    throw new Error("Role initialization failed: assetName and state properties are required")
  }

  this.frameIdx = 0
  this.assetName = assetName
  this.states = states
  this.state = state
  this.tick = 0

  switch (assetName) {
    case 'King Human':
      this.assets = kingHumanStates
      break
    case 'King Pig':
      this.assets = kingPigStates
      break
    case 'door':
      this.assets = doorStates
      break
  } // 暂时三种

  switch (dir) {
    case 'up':
      this.dir = '_buttonUp_'
      break
    case 'right':
      this.dir = '_buttonRight_'
      break
    case 'down':
      this.dir = '_buttonDown_'
      break
    case 'left':
      this.dir = '_buttonLeft_'
      break
    default:
      this.dir = null
  }

  if (pb) {
    this.physicsBox = new physicsBox(this, this.assetName)
  }

  this.init()
}

Role.prototype = {
  constructor: Role,
  handleInput (command) {
    this.state.handleInput(this, command)
  },
  update () { this.state.update() },
  animate () {
    if (++this.tick > FRAME_SWITCH_PERIOD) {
      this.frameIdx++
      this.tick = 1
    }
    
    if (this.frameIdx >= this.sprite.frame) {
      this.frameIdx = 0
    }
  },
  setGraphics (graph) {
    this.frameIdx = 0
    this.tick = 0
    this.sprite = loader.assets.sprite[this.assetName][graph]['sprite']
  },
  render (interpolationFactor) {
    game.stage.ctx.drawImage()
  },
  init () {
    this.state = this.states[this.state]
    this.state.enter(this)
  },
  intersectWith () {
    this.physicsBox.intersectWith()
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
  doorIn: new State({
    name: 'doorIn',
    enter (ctx) {
      ctx.setGraphics('Door In')
    },
    handleInput: noob,
    update (ctx) {
      ctx.animate()
    }
  }),
  doorOut: new State({
    name: 'doorOut',
    enter (ctx) {
      ctx.setGraphics('Door Out')
    },
    handleInput: noob,
    update (ctx) {
      ctx.animate()
    }
  }),
  idle: new State({
    name: 'idle',
    enter (ctx) {
      ctx.setGraphics('Idle')
    },
    handleInput (context, command) {
      if (command === InputHandler._attack_) {
        context.state = kingStates.attack
        context.state.enter()
      } else if (command === InputHandler._keydown_buttonUp_) {
        context.state = kingStates.jump
        context.state.enter()
      } else if (command === InputHandler._keydown_buttonRight_) {
        context.state = kingStates.run
        context.state.enter(command.command)
      } else if (command === InputHandler._keydown_buttonDown_) {
        context.state = kingStates.jump
        context.state.enter()
      } else if (command === InputHandler._keydown_buttonLeft_) {
        context.state = kingStates.run
        context.state.enter(command.command)
      }
    },
    update (ctx) {
      ctx.animate()
    }
  }),
  hit: new State({
    name: 'hit',
    enter (ctx) {
      ctx.setGraphics('Hit')
    },
    handleInput: noob,
    update () {
      
    }
  }),
  dead: new State({
    name: 'dead',
    enter (ctx) {
      ctx.setGraphics('Dead')
    },
    handleInput: noob,
    update () {
  
    }
  }),
  // active
  run: new State({
    name: 'run',
    enter (ctx, dir) {
      if (dir === ctx.dir) {
        ctx.dir = dir
      }
      ctx.setGraphics('Run')
    },
    handleInput (command) {
      if (command === InputHandler._attack_) {
        context.state = kingStates.attack
        context.state.enter()
      } else if (command === InputHandler._dorge_) {
        context.state = kingStates.dorge
        context.state.enter()
      } else if (command === InputHandler._keydown_buttonUp_) {
        context.state = kingStates.jump
        context.state.enter()
      }
    },
    update () {
      
    }
  }),
  jump: new State({
    name: 'jump',
    enter (ctx) {
      ctx.setGraphics('Jump')
    },
    handleInput: noob,
    update () {
  
    }
  }),
  attack: new State({
    name: 'attack',
    enter (ctx) {
      ctx.setGraphics('Attack')
    },
    handleInput: noob,
    update () {
  
    }
  }),
  dorge: new State({
    name: 'dorge',
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

export let kingPigStates = {

}

export let king = new Role({
  assetName: 'King Human',
  state: 'doorIn',
  dir: 'right',
  pb: true
})