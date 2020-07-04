import Stage from './stage.js'
import { king } from './role.js'

export default {
  stage: undefined,
  // player: undefined,
  init () {
    this.stage = new Stage({
      backgroundId: 'back',
      id: 'mainStage',
      anti_aliasing: false
    })

    player = king

    let inputHandler = {
      onKeyDown: throttledInputHandler(player, 'keydown', 1),
      onKeyUp: throttledInputHandler(player, 'keyup', 1),
      onKeyPress: throttledInputHandler(player, 'keypress', 1)
    }

    this.stage.installInputHandler(inputHandler, this.stage.canvas)
  },
  start () {
    levelManager.init(0)
    map.computeRenderOffset()
    map.render()

    update()
    render()
    requestAnimationFrame(gameLoop)
  },
  // switchPlayer (role) {
  //   this.player = role
  // }
}
