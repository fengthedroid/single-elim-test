var pab = 0.75;
var pintra = 0.5; //shouldn't change
var bracketSize = 4;
var sizeA = 1;
var sizeB = bracketSize - sizeA;

function prob(seed, round) {
  if (round < 0 || round > Math.log(bracketSize)/Math.log(2)) {
    throw new Error();
  }

  //between 1 and sizeA + sizeB
  if (seed < 1 || seed > bracketSize) {
    return 0;
  }

  var isA = seed - sizeA <= 0;
  var pinter = isA ? pab : 1 - pab;

  if (round === 0) {
    return 1;
  } else {

    var opponentRangeLow = 1 + Math.pow(2, round - 1) + Math.pow(2, round + 1) * Math.floor((seed - 1) / Math.pow(2, round) - Math.pow(2, round - 1) * Math.floor((seed - 1) / Math.pow(2, round - 1)));
    var opponentRangeHigh = opponentRangeLow + Math.pow(2, round - 1) - 1 ;



    return probOfWinLastRound * (combinedProbIntra + combinedProbInter);
  }
}

function teamAwin(){
  if(sizeA === 0) {
    return 0;
  } else {
    //rounds start at 0;
    var rounds = Math.ceil(Math.log(bracketSize) / Math.log(2));
    return prob(1, rounds) * sizeA;
  }
}

console.log(teamAwin());
