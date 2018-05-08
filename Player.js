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
      function countInArray(array, value) {
        return array.reduce((n, x) => n + (x === value), 0);
      }
      console.log('-- haveFlush --');
      console.log(JSON.stringify(myCards));
      console.log(JSON.stringify(communityCards));
      let suitsMyCards = [];
      let suitsCommunitycards = [];

      myCards.forEach(card => {
        suitsMyCards.push(card.suit);
        console.log('my card: ' + JSON.stringify(card));
      });
      communityCards.forEach(card => {
        suitsCommunitycards.push(card.suit);
        console.log('community card: ' + JSON.stringify(card));
      });
      if(suitsCommunitycards.length >=3){
        suitsMyCards.forEach(suit => {
          let numSuits = 0;
          numSuits = countInArray(suitsCommunitycards, suit);
          console.log('suit: '+ suit + ' occurs ' + numSuits + ' times in community cards' )
        });
      }

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

  static isPreFlop(community_cards){
    if (community_cards.length == 0){
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

    // if(gameState.minimum_raise > 0)

    if(this.isPair(myCards)){
      if(this.highPair(myCards)){
        howMuchShouldIBet = myStack;
      }else if (this.isPreFlop(gameState.community_cards)){
        howMuchShouldIBet = myStack / 4;
      }
    } else if(this.isSameSuit(myCards) && this.isPreFlop(gameState.community_cards)){
      console.log('isSameSuit found');
      howMuchShouldIBet = gameState.minimum_raise;
    } else if(this.haveAnyPair(gameState.community_cards, myCards)){
      console.log('haveAnyPair found');
      howMuchShouldIBet = gameState.minimum_raise;
    }


    // if(!this.isPreFlop(gameState.community_cards)){
    //   if(gameState.in_action > 0){

    //   }
    // }

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
