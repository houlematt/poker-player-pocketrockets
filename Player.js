// SUITS: Spades, Hearts, Diamonds, and Clubs// Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King

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

  static haveStraight(communityCards, myCards) {

    // combine hole cards and community cards and sort
    var sequence = myCards.concat(communityCards);
    sequence = sequence.sort(function (a, b) { return a - b });

    // holds 5 cards of sequential value
    var straightSequence = [10];

    for (let i = 0; i <= 5; i++) {
      var checkValue = sequence[i];      var neighborValue = sequence[i + 1];

      // check for next incremental value in sorted sequence
      if (neighborValue === (checkValue + 1)) {        console.log("added incremental: " + checkValue);        straightSequence.push(checkValue);
        console.log("added incremental: " + neighborValue);        straightSequence.push(neighborValue);      } else {        straightSequence = [];        console.log("break incremental");      }      i++;    }

    // get distinct values from straightSequence    var straightSequenceDistinct = [5];

    for (let j = 0; j <= 9; j++) {      var currentSSValue = straightSequence[j];

      if (straightSequenceDistinct.indexOf(currentSSValue) === -1) {        straightSequenceDistinct.push(currentSSValue);      }    }

    // check for 5 cards of sequential value
    if (straightSequenceDistinct.length === 5) {      return true;    }

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
      console.log('isPair found');
      howMuchShouldIBet = gameState.minimum_raise;
    }
    
    if(this.isSameSuit(myCards)){
      console.log('isSameSuit found');
      howMuchShouldIBet = gameState.minimum_raise;
    }

    if(this.haveAnyPair(gameState.community_cards, myCards)){
      console.log('haveAnyPair found');
      howMuchShouldIBet = gameState.minimum_raise;
    }

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
