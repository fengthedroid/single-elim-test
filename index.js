
function matr(bracketSize, sizeA, pintra, pab) {
  var winRateMatrix = {};

  for (var i = 1; i <= bracketSize; ++i) {
    winRateMatrix[i] = {};
    for (var j = 1; j <= bracketSize; ++j) {
      if (i <= sizeA && j <= sizeA) {
        winRateMatrix[i][j] = pintra;
      } else if (i > sizeA && j > sizeA) {
        winRateMatrix[i][j] = pintra;
      } else if (i <= sizeA && j > sizeA) {
        winRateMatrix[i][j] = pab;
      } else if (i > sizeA && j <= sizeA) {
        winRateMatrix[i][j] = 1 - pab;
      }
    }
  }

  return winRateMatrix;
}

function teamAwin(bracketSize, sizeA, pab) {
  
  var pintra = 0.5; //shouldn't change
  var winRateMatrix = matr(bracketSize, sizeA, pintra, pab);

  function prob(seed, round) {
    if (round < 0 || round > Math.log(bracketSize) / Math.log(2)) {
      throw new Error();
    }

    //between 1 and sizeA + sizeB
    if (seed < 1 || seed > bracketSize) {
      return 0;
    }

    if (round === 0) {
      return 1;
    } else {
      var opponentRangeLow = 1 + Math.pow(2, round - 1) + Math.pow(2, round + 1) * Math.floor((seed - 1) / Math.pow(2, round)) - Math.pow(2, round - 1) * Math.floor((seed - 1) / Math.pow(2, round - 1));
      var opponentRangeHigh = opponentRangeLow + Math.pow(2, round - 1) - 1;

      var combinedOpponentWinRates = 0;

      for(var o = opponentRangeLow; o <= opponentRangeHigh; ++o) {

        combinedOpponentWinRates += prob(o, round - 1) * winRateMatrix[seed][o];
      }

      return prob(seed, round - 1) * combinedOpponentWinRates;
    }
  }

  var allProb = 0;
  if (sizeA != 0) {
    //rounds start at 0;
    var rounds = Math.ceil(Math.log(bracketSize) / Math.log(2));
    for(var i = 1; i <= sizeA; ++i) {
      allProb += prob(i, rounds, winRateMatrix);
    }
  }
  return allProb;
}
