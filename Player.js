class Player {
  static get VERSION() {
    return '0.1';
  }



  static isPair(cards){
    if(cards.length==2){
      if(cards[0].rank == cards[1].rank){
        return true;
      }
    }
    return false;
  }

  static isSameSuit(cards){
    if(cards.length==2){
      if(cards[0].suit == cards[1].suit){
        return true;
      }
    }
    return false;
  }

  static haveAnyPair(communityCards, myCards){
    for (let i = 0; i < communityCards.length; i++) {
      let cCard = communityCards[i];
      for (let k = 0; k < myCards.length; k++) {
        let mCard = myCards[k];
        if ( cCard.rank===mCard.rank ) {
          return true
        }
      }
    }
    return false;
  }

  static betRequest(gameState, bet) {

    console.log(gameState);

    let myCards = '',
        myStack = 0;
    for (var step = 0; step < 4; step++) {
      if (gameState.players[step].name==='PocketRockets') {
        myCards = gameState.players[step].hole_cards;
        myStack = gameState.players[step].stack;
        console.info('myCards', myCards);
      }
    }

    let howMuchShouldIBet = 0;

    if(this.isPair(myCards)){
      howMuchShouldIBet = gameState.minimum_raise;
    }
    
    if(this.isSameSuit(myCards)){
      howMuchShouldIBet = gameState.minimum_raise;
    }

    if(this.haveAnyPair(gameState.community_cards, myCards)){
      howMuchShouldIBet = gameState.minimum_raise;
    }

    bet(howMuchShouldIBet);

  }

  static showdown(gameState) {
  }
}

module.exports = Player;
