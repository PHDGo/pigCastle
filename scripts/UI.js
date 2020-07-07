function UI ({
  loadingScreen,
  startScreen,
  endScreen,
  gameoverScreen
}) {
  this.loadingScreen = loadingScreen
  this.startScreen = startScreen
  this.endScreen = endScreen
  this.gameoverScreen = gameoverScreen
}

UI.prototype = {
  constructor: UI,
  showScreen (screen, msg) {
    
  },
  hideScreen () {
    
  }
}

let startScreen = {

}

let endScreen = {

}

let gameoverScreen = {

}

let loadingScreen = {

}

export default new UI({
  loadingScreen,
  startScreen,
  endScreen,
  gameoverScreen
})