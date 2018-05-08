class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {

    console.log(gameState);
    bet(gameState.current_buy_in + 10);

    let myCards = '';
    for (var step = 0; step < 4; step++) {
      if (gameState.players[step].name==='PocketRockets') {
        myCards = gameState.players[step].hole_cards;
        console.info('myCards', myCards);
      }
    }

  }

  static showdown(gameState) {
  }
}

module.exports = Player;
