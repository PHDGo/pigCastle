import game from './game.js'

export const MS_PER_UPDATE = 33 // 30 game frame per seconds: updating game state and handling input
export const MS_PER_FRAME = 100 // 10 animation frame per seconds: switching animation frame
let previous = 0,
    update_lag = 0

export const FRAME_SWITCH_PERIOD = Math.floor(MS_PER_FRAME / MS_PER_UPDATE)

export let roleArray = []

export default function gameLoop (timeStamp) {
  let elapsed = timeStamp - previous
  previous = timeStamp
  update_lag += elapsed
  while (update_lag > MS_PER_UPDATE) {
    update()
    update_lag -= MS_PER_UPDATE
  }
  render(update_lag/MS_PER_UPDATE)
  requestAnimationFrame(gameLoop) // update screen in generally 60 FPS: smoothing the shift
}

function update () {
  roleArray.forEach(role => role.update())
}

function render (interpolationFactor) {
  let stage = game.stage
  stage.ctx.clearRect(0, 0, stage.width, stage.height)
  roleArray.forEach(role => role.render())
}
