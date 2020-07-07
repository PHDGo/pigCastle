import Stage from './stage.js'
import map from './map.js'
import levelManager from './levelManager.js'
import gameLoop from './sequencing.js'
import { throttledInputHandler } from './control.js'

export default {
  stage: undefined,
  player: undefined,
  init () {
    this.stage = new Stage({
      backgroundId: 'back',
      id: 'mainStage',
      anti_aliasing: false
    })
    let inputHandler = {
      onKeyDown: throttledInputHandler(this.player, 'keydown', 1),
      onKeyUp: throttledInputHandler(this.player, 'keyup', 1),
      onKeyPress: throttledInputHandler(this.player, 'keypress', 1)
    }
    this.stage.installInputHandler(inputHandler, this.stage.canvas)
  },
  start () {
    levelManager.init(0)
    map.computeRenderOffset()
    map.render()

    gameLoop()
    requestAnimationFrame(gameLoop)
  },
  setPlayer (role) {
    this.player = role
  }
}
