export default function Stage ({
  id,
  backgroundId,
  inputHandler,
  anti_aliasing
}) {
  if (!(id && backgroundId)) throw new Error('Id & backgroundId are required')

  var canvas = this.canvas = document.getElementById(id),
      backCanvas = document.getElementById(backgroundId)

  if (inputHandler) {
    this.installInputHandler(inputHandler, canvas)
  }

  this.width = canvas.width
  this.height = canvas.height

  this.bCtx = backCanvas.getContext('2d')
  this.ctx = canvas.getContext('2d')

  this.bCtx.imageSmoothingEnabled = anti_aliasing || true
  this.ctx.imageSmoothingEnabled = anti_aliasing || true // true as default
}

Stage.prototype = {
  constructor: Stage,
  installInputHandler (inputHandler, canvas) {
    // keyboardEvent binding
    if (inputHandler.onKeyDown) canvas.addEventListener('keydown', inputHandler.onKeyDown)
    if (inputHandler.onKeyUp) canvas.addEventListener('keyup', inputHandler.onKeyUp)
    if (inputHandler.onKeyPress) canvas.addEventListener('keypress', inputHandler.onKeyPress)

    // mouseEvent binding
    if (inputHandler.onMousemove) canvas.addEventListener('mousemove', inputHandler.onMousemove)
    if (inputHandler.onMouseenter) canvas.addEventListener('mouseenter', inputHandler.onMouseEnter)
    if (inputHandler.onMouseLeave) canvas.addEventListener('mouseleave', inputHandler.onMouseLeave)
    if (inputHandler.onMouseDown) canvas.addEventListener('mousedown', inputHandler.onMouseDown)
    if (inputHandler.onMouseUp) canvas.addEventListener('mouseup', inputHandler.onMouseUp)
    if (inputHandler.onContextMenu) canvas.addEventListener('contextmenu', inputHandler.onContextMenu)
  }
}