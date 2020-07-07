/*  Encapsulate a request as an object, thereby letting users parameterize clients with different requests, 
 *  queue or log requests, and support undoable operations.
 *
 *  鼠标相关的程序未实现
 */

import { AbstractConstructor, throttle } from './utils.js'
import { MS_PER_UPDATE } from './sequencing.js'

const BUTTON_ARROW_UP = 'ArrowUp'
const BUTTON_ARROW_RIGHT = 'ArrowRight'
const BUTTON_ARROW_DOWN = 'ArrowDown'
const BUTTON_ARROW_LEFT = 'ArrowLeft'

// enable keyboard configuration

let button_up = 'w',
    button_right = 'd',
    button_down = 's',
    button_left = 'a',
    button_attack = 'j',
    button_dorge = 'k'

// arrays

let mouseMoveControl = ['mousemove', 'mouseenter', 'mouseleave'],
    mouseClickControl = ['mousedown', 'mouseup', 'click'],
    keyboardControl = ['keydown', 'keyup', 'keypress']

// Command class

const Command = AbstractConstructor.extend(function (command, type) {
  this.command = command
  this.type = type
})

/*
const JumpCommand = Command.extend(function () {
  this.execute = (actor) => { actor.jump() }
})

const AttackCommand = Command.extend(function () {
  this.execute = (actor) => { actor.attack() }
})

const MoveUnitCommand = (unit, x, y) => {
  var xBefore, yBefore
  return {
    execute () {
      xBefore = x
      yBefore = y
      unit.moveTo(x, y)
    },
    undo () {
      unit.moveTo(xBefore, yBefore)
    }
  }
}
*/

// input handler

const a = function (actor, type, e) {
  if (e.button === 0) {
    // to be supplemented
  }
}

const b = function (actor, type, e) {
  /**
   * if (e.key === button_up || e.key === BUTTON_ARROW_UP) { actor.handleInput(InputHandler['_' + type + direction[0]]) }
   * else if (e.key === button_right || e.key === BUTTON_ARROW_RIGHT) { actor.handleInput(InputHandler['_' + type + direction[1]]) }
   * else if (e.key === button_down || e.key === BUTTON_ARROW_DOWN) { actor.handleInput(InputHandler['_' + type + direction[2]]) }
   * else if (e.key === button_left || e.key === BUTTON_ARROW_LEFT) { actor.handleInput(InputHandler['_' + type + direction[3]]) }
   * else if (e.key === button_attack) { actor.handleInput(InputHandler._attack_) }
   * else if (e.key === button_dorge) { actor.handleInput(InputHandler._dorge_) }
   */
  switch (e.key) {
    case button_up:
    case BUTTON_ARROW_UP:
      actor.handleInput(InputHandler['_' + type + direction[0]])
      break
    case button_right:
    case BUTTON_ARROW_RIGHT:
      actor.handleInput(InputHandler['_' + type + direction[1]])
      break
    case button_down:
    case BUTTON_ARROW_DOWN:
      actor.handleInput(InputHandler['_' + type + direction[2]])
      break
    case button_left:
    case BUTTON_ARROW_LEFT:
      actor.handleInput(InputHandler['_' + type + direction[3]])
      break
    case button_attack:
      actor.handleInput(InputHandler._attack_)
      break
    case button_dorge:
      actor.handleInput(InputHandler._dorge_)
      break
  }
}

// 针对一种事件，创建一种InputHandler, 绑定角色和事件类型
export function InputHandler (actor, type) {
  if (mouseClickControl.indexOf(type) !== -1) {
    return a.bind(actor, type)
  } else if (keyboardControl.indexOf(type) !== -1) {
    return b.bind(actor, type)
  } else if (mouseMoveControl.indexOf(type) !== -1) {
    // to be supplemented
  }
}

// 无法控制事件触发频率，就控制回调函数的执行频率
export function throttledInputHandler(actor, inputType, throttleType) {
  return throttle(InputHandler(actor, inputType), MS_PER_UPDATE, throttleType)
}

// commands e.g. InputHandler._keydown_buttonUp_ --> new MoveCommand('keydown_buttonUp_', 'keydown')

let buttons = ['_buttonUp_', '_buttonRight_', '_buttonDown_', '_buttonLeft_']

for (let control of keyboardControl) {
  for (let button of buttons) {
    let command = '_' + control + button,
        dir
    button === '_buttonRight_'
      ? dir = 'right'
      : button === '_buttonLeft_'
        ? dir = 'left'
        : 'else'
    InputHandler[command] = new Command(dir, control)
  }
}

InputHandler._attack_ = new Command('_attack_', 'keydown')
InputHandler._dorge_ = new Command('_dorge_', 'keydown')