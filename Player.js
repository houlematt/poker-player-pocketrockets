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
          return true;
        }
      }
    }
    return false;
  }
  static haveFlush(communityCards, myCards){
    try{
      console.log('-- haveFlush --');
      console.log(JSON.stringify(myCards));
      console.log(JSON.stringify(communityCards));

      myCards.forEach(card => {
        console.log('my card: ' + card);
      });
      communityCards.forEach(card => {
        console.log('community card: ' + card);
      });

    } catch(error){
      console.log('has flush error: '+ error);
    }
    return false;
  }

  static highPair(myCards){
    let valuableCards = [10,"J","Q","K","A"];
    if(valuableCards.indexOf(myCards[0].rank) != -1){
      return true;
    }
    return false;
  }
  static betRequest(gameState, bet) {

    try {

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
      if(this.highPair(myCards)){

        howMuchShouldIBet = myStack;
      }else {
        howMuchShouldIBet = myStack / 4;
      }
    } else if(this.isSameSuit(myCards)){
      console.log('isSameSuit found');
      howMuchShouldIBet = gameState.minimum_raise;
    } else if(this.haveAnyPair(gameState.community_cards, myCards)){
      console.log('haveAnyPair found');
      howMuchShouldIBet = gameState.minimum_raise;
    }

    this.haveFlush(gameState.community_cards, myCards);
    bet(howMuchShouldIBet);

  } catch(error){
    console.log('we have an error: ' + error);
    bet(10);
  }

  }

  static showdown(gameState) {
    try{

      console.log('##########show down: ');
      console.log(gameState)
    } catch(error){
    console.log('we have an error: ' + error);
  }
  }
}

module.exports = Player;
