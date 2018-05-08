class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {

    console.log(gameState);
    bet(gameState.current_buy_in + 10);


    let myCards = gameState.players.PocketRockets.hole_cards;
    console.log(myCards);

  }

  static showdown(gameState) {
  }
}

module.exports = Player;
