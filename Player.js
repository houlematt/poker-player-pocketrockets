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
  // remember gameState
  static writeGame(gameState){
    try{

    
    var request = require("request");

// var options = { 
//     method: 'POST',
//     url: 'https://poker-1721.restdb.io/rest/games',
//     headers: 
//     {   'cache-control': 'no-cache',
//         'x-apikey': 'fdbae10e99aa9814474124823a0a058cb9973',
//         'content-type': 'application/json' },
//     body: { game_id: gameState.game_id, rounds: '1' },
//     json: true 
// };

// request(options, function (error, response, body) {
//     if (error) throw new Error(error);
//     console.log(body);
// });
    } catch(error){
      console.log('writeGame: ' + error)

    }
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

  static haveStraightFlush(communityCards, myCards) {

    if (haveStraight(communityCards, myCards) && haveFlush(communityCards, myCards)) {      return true;    }

    return false;  }

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
    let hasFlush = false;
    try{
      function countInArray(array, value) {
        return array.reduce((n, x) => n + (x === value), 0);
      }
      console.log('-- haveFlush --');
      console.log(JSON.stringify(myCards));
      console.log(JSON.stringify(communityCards));
      let suitsMyCards = [];
      let suitsCommunitycards = [];
      let myCardSuitesEqual = false;

      myCards.forEach(card => {
        suitsMyCards.push(card.suit);
        console.log('my card: ' + JSON.stringify(card));
      });
      communityCards.forEach(card => {
        suitsCommunitycards.push(card.suit);
        console.log('community card: ' + JSON.stringify(card));
      });
      if(suitsMyCards[0] == suitsMyCards[1]){
        myCardSuitesEqual = true;
      }
      if(suitsCommunitycards.length >=3 && myCardSuitesEqual){
        console.log('myCards equal suites');
        suitsMyCards.forEach(suit => {
          let numSuits = 0;
          numSuits = countInArray(suitsCommunitycards, suit);
          console.log('suit: '+ suit + ' occurs ' + numSuits + ' times in community cards' )
          if(numSuits >=3){
            console.log('### flush');
            hasFlush = true;
          }
        });
      } else {
        console.log('myCards no equal suites');
        suitsMyCards.forEach(suit => {
          let numSuits = 0;
          numSuits = countInArray(suitsCommunitycards, suit);
          console.log('suit: '+ suit + ' occurs ' + numSuits + ' times in community cards' )
          if(numSuits >=4){
            console.log('### flush');
            hasFlush = true;
          }
        });

      }
      return hasFlush;

    } catch(error){
      console.log('has flush error: '+ error);
    }
    return false;
  }

  static highPair(myCards){
    let valuableCards = ["10","J","Q","K","A"];
    if(valuableCards.indexOf(myCards[0].rank) != -1){
      console.log('high pair');
      return true;
    }
    console.log('not high pair');
    return false;
  }

  static highCard(myCards){
      let valuableCards = ["J","Q","K","A"];
      for (let i = 0; i < myCards.length; i++) {
        if(valuableCards.indexOf(myCards[0].rank) != -1){
          console.log('high single');
          return true;
        }
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
      if(this.highPair(myCards)&& this.isPreFlop(gameState.community_cards)){
        howMuchShouldIBet = myStack/8;
      }else if (this.isPreFlop(gameState.community_cards)){
        howMuchShouldIBet = myStack / 10;
      }
    } else if(this.isPreFlop(gameState.community_cards) && highCard(myCards) && gameState.bet_index < 10){
        if(gameState.minimum_raise < 100){
          howMuchShouldIBet = gameState.minimum_raise * 2;
        }
    } else if(this.isSameSuit(myCards) && this.isPreFlop(gameState.community_cards)&& gameState.bet_index < 10){

      console.log('isSameSuit found');
      if(gameState.minimum_raise < 100){
        howMuchShouldIBet = gameState.minimum_raise * 2;
      }
    } else if(this.haveAnyPair(gameState.community_cards, myCards)){
      console.log('haveAnyPair found');
      howMuchShouldIBet = gameState.minimum_raise;
    }


    console.log('\r\n \r\n', howMuchShouldIBet)

    // if(!this.isPreFlop(gameState.community_cards)){
    //   if(gameState.in_action > 0){

    //   }
    // }

    this.haveFlush(gameState.community_cards, myCards);
    this.writeGame(gameState);
        bet(Math.round(howMuchShouldIBet));

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
