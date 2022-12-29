export const winnerCombinations = [
  [0, 1, 2, "line-1"],
  [3, 4, 5, "line-2"],
  [6, 7, 8, "line-3"],
  [0, 3, 6, "column-1"],
  [1, 4, 7, "column-2"],
  [2, 5, 8, "column-3"],
  [0, 4, 8, "diagonal-1"],
  [6, 4, 2, "diagonal-2"],
];

export const possibilities = (gameData: number[]) =>
  Array.from({ length: winnerCombinations.length }, (_, index) => {
    return [
      gameData[winnerCombinations[index][0] as number],
      gameData[winnerCombinations[index][1] as number],
      gameData[winnerCombinations[index][2] as number],
    ];
  });

export const checkPossibilityOfWinning = (
  possibility: {
    0: number;
    1: number;
    2: number;
  }[],
  gameData: number[]
): null | number => {
  let positionSelected: number | null = null;

  possibility.forEach((v, i) => {
    if (v[1] === 0 && v[2] === 2) {
      winnerCombinations[i].forEach((value) => {
        gameData[value as number] === 0 && (positionSelected = value as number);
      });
    }
  });

  return positionSelected;
};

export const checkPossibilityOfDisruptingOpponent = (
  possibility: {
    0: number;
    1: number;
    2: number;
  }[],
  gameData: number[]
): null | number => {
  let positionSelected: number | null = null;

  possibility.forEach((v, i) => {
    if (v[1] === 2 && v[2] === 0) {
      winnerCombinations[i].forEach((value) => {
        gameData[value as number] === 0 && (positionSelected = value as number);
      });
    }
  });

  return positionSelected;
};

export const checkPossibilityOfWinningInTheFuture = (
  possibility: {
    0: number;
    1: number;
    2: number;
  }[],
  gameData: number[]
): null | number => {
  let positionSelected: number | null = null;

  possibility.forEach((v, i) => {
    if (v[1] === 0 && v[2] === 1) {
      winnerCombinations[i].forEach((value) => {
        gameData[value as number] === 0 && (positionSelected = value as number);
      });
    }
  });

  return positionSelected;
};

export const generateRandomPosition = (availablePositions: number[]) =>
  availablePositions[Math.floor(Math.random() * availablePositions.length)];

export const checkingPossibilityOfCreatingStrategy = (
  gameData: number[]
): null | number => {
  let positionSelected: number | null = null;

  // x | - | XX
  // - | - | -
  // - | - | x

  gameData[0] === 2 &&
    gameData[8] === 2 &&
    gameData[1] === 0 &&
    gameData[2] === 0 &&
    gameData[5] === 0 &&
    (positionSelected = 2);

  gameData[0] === 2 &&
    gameData[8] === 2 &&
    gameData[3] === 0 &&
    gameData[6] === 0 &&
    gameData[7] === 0 &&
    (positionSelected = 6);

  gameData[2] === 2 &&
    gameData[6] === 2 &&
    gameData[0] === 0 &&
    gameData[1] === 0 &&
    gameData[3] === 0 &&
    (positionSelected = 0);

  gameData[2] === 2 &&
    gameData[6] === 2 &&
    gameData[5] === 0 &&
    gameData[7] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 8);

  // -------------------------------------

  // XX | - | x
  // -  | - | -
  // x  | - | -

  gameData[2] === 2 &&
    gameData[6] === 2 &&
    gameData[0] === 0 &&
    gameData[1] === 0 &&
    gameData[3] === 0 &&
    (positionSelected = 0);

  gameData[0] === 2 &&
    gameData[8] === 2 &&
    gameData[1] === 0 &&
    gameData[2] === 0 &&
    gameData[5] === 0 &&
    (positionSelected = 2);

  gameData[2] === 2 &&
    gameData[6] === 2 &&
    gameData[5] === 0 &&
    gameData[7] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 8);

  gameData[0] === 2 &&
    gameData[8] === 2 &&
    gameData[3] === 0 &&
    gameData[6] === 0 &&
    gameData[7] === 0 &&
    (positionSelected = 6);

  // -------------------------------------

  // - |  XX | x
  // - |  x  | -
  // - |  -  | -

  gameData[2] === 2 &&
    gameData[4] === 2 &&
    gameData[0] === 0 &&
    gameData[1] === 0 &&
    gameData[7] === 0 &&
    (positionSelected = 1);

  gameData[4] === 2 &&
    gameData[8] === 2 &&
    gameData[2] === 0 &&
    gameData[3] === 0 &&
    gameData[5] === 0 &&
    (positionSelected = 5);

  gameData[4] === 2 &&
    gameData[6] === 2 &&
    gameData[1] === 0 &&
    gameData[7] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 7);

  gameData[0] === 2 &&
    gameData[4] === 2 &&
    gameData[3] === 0 &&
    gameData[5] === 0 &&
    gameData[6] === 0 &&
    (positionSelected = 3);

  // -------------------------------------

  // XX | x | -
  // x  | - | -
  // -  | - | -

  gameData[1] === 2 &&
    gameData[3] === 2 &&
    gameData[0] === 0 &&
    gameData[2] === 0 &&
    gameData[6] === 0 &&
    (positionSelected = 0);

  gameData[1] === 2 &&
    gameData[5] === 2 &&
    gameData[0] === 0 &&
    gameData[2] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 2);

  gameData[5] === 2 &&
    gameData[7] === 2 &&
    gameData[2] === 0 &&
    gameData[6] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 8);

  gameData[3] === 2 &&
    gameData[7] === 2 &&
    gameData[0] === 0 &&
    gameData[6] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 6);

  // -------------------------------------

  // x  | - | -
  // -  | - | -
  // XX | x | -

  gameData[0] === 2 &&
    gameData[7] === 2 &&
    gameData[3] === 0 &&
    gameData[6] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 6);

  gameData[2] === 2 &&
    gameData[3] === 2 &&
    gameData[0] === 0 &&
    gameData[1] === 0 &&
    gameData[6] === 0 &&
    (positionSelected = 0);

  gameData[1] === 2 &&
    gameData[8] === 2 &&
    gameData[0] === 0 &&
    gameData[2] === 0 &&
    gameData[5] === 0 &&
    (positionSelected = 2);

  gameData[5] === 2 &&
    gameData[6] === 2 &&
    gameData[2] === 0 &&
    gameData[7] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 8);

  // -------------------------------------

  // - |  x  | -
  // - |  -  | -
  // x |  XX | -

  gameData[1] === 2 &&
    gameData[6] === 2 &&
    gameData[4] === 0 &&
    gameData[7] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 7);

  gameData[0] === 2 &&
    gameData[5] === 2 &&
    gameData[3] === 0 &&
    gameData[4] === 0 &&
    gameData[6] === 0 &&
    (positionSelected = 3);

  gameData[2] === 2 &&
    gameData[7] === 2 &&
    gameData[0] === 0 &&
    gameData[1] === 0 &&
    gameData[4] === 0 &&
    (positionSelected = 1);

  gameData[3] === 2 &&
    gameData[8] === 2 &&
    gameData[2] === 0 &&
    gameData[4] === 0 &&
    gameData[5] === 0 &&
    (positionSelected = 5);

  // -------------------------------------

  // x |  -  | -
  // - |  XX | -
  // x |  -  | -

  gameData[0] === 2 &&
    gameData[6] === 2 &&
    gameData[2] === 0 &&
    gameData[4] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 4);

  gameData[0] === 2 &&
    gameData[2] === 2 &&
    gameData[4] === 0 &&
    gameData[6] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 4);

  gameData[2] === 2 &&
    gameData[8] === 2 &&
    gameData[0] === 0 &&
    gameData[4] === 0 &&
    gameData[6] === 0 &&
    (positionSelected = 4);

  gameData[6] === 2 &&
    gameData[8] === 2 &&
    gameData[0] === 0 &&
    gameData[2] === 0 &&
    gameData[4] === 0 &&
    (positionSelected = 4);

  // -------------------------------------

  // x  |  -  | -
  // -  |  x  | -
  // XX |  -  | -

  gameData[4] === 2 &&
    gameData[6] === 2 &&
    gameData[0] === 0 &&
    gameData[7] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 8);

  gameData[0] === 2 &&
    gameData[4] === 2 &&
    gameData[2] === 0 &&
    gameData[3] === 0 &&
    gameData[6] === 0 &&
    (positionSelected = 6);

  gameData[2] === 2 &&
    gameData[4] === 2 &&
    gameData[0] === 0 &&
    gameData[1] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 0);

  gameData[4] === 2 &&
    gameData[8] === 2 &&
    gameData[2] === 0 &&
    gameData[5] === 0 &&
    gameData[6] === 0 &&
    (positionSelected = 2);

  // -------------------------------------

  // XX |  -  | -
  // -  |  x  | -
  // x  |  -  | -

  gameData[4] === 2 &&
    gameData[6] === 2 &&
    gameData[0] === 0 &&
    gameData[2] === 0 &&
    gameData[3] === 0 &&
    (positionSelected = 0);

  gameData[0] === 2 &&
    gameData[4] === 2 &&
    gameData[1] === 0 &&
    gameData[2] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 2);

  gameData[2] === 2 &&
    gameData[4] === 2 &&
    gameData[5] === 0 &&
    gameData[6] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 8);

  gameData[4] === 2 &&
    gameData[8] === 2 &&
    gameData[0] === 0 &&
    gameData[6] === 0 &&
    gameData[7] === 0 &&
    (positionSelected = 6);

  // -------------------------------------

  // -  |  -  | -
  // -  |  x  | -
  // -  |  -  | -

  gameData[4] === 1 &&
    gameData[0] === 0 &&
    gameData[1] === 0 &&
    gameData[2] === 0 &&
    gameData[3] === 0 &&
    gameData[5] === 0 &&
    gameData[6] === 0 &&
    gameData[7] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = [0, 2, 6, 8][Math.floor(Math.random() * 4)]);

  // -------------------------------------

  // XX |  -  | o
  // -  |  x  | -
  // x  |  -  | -

  gameData[4] === 1 &&
    gameData[0] === 1 &&
    gameData[8] === 2 &&
    gameData[1] === 0 &&
    gameData[2] === 0 &&
    gameData[6] === 0 &&
    (positionSelected = 2);

  gameData[4] === 1 &&
    gameData[0] === 1 &&
    gameData[8] === 2 &&
    gameData[3] === 0 &&
    gameData[6] === 0 &&
    gameData[2] === 0 &&
    (positionSelected = 6);

  gameData[4] === 1 &&
    gameData[2] === 1 &&
    gameData[6] === 2 &&
    gameData[0] === 0 &&
    gameData[1] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 0);

  gameData[4] === 1 &&
    gameData[2] === 1 &&
    gameData[6] === 2 &&
    gameData[0] === 0 &&
    gameData[5] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 8);

  gameData[4] === 1 &&
    gameData[8] === 1 &&
    gameData[0] === 2 &&
    gameData[6] === 0 &&
    gameData[7] === 0 &&
    gameData[2] === 0 &&
    (positionSelected = 6);

  gameData[4] === 1 &&
    gameData[8] === 1 &&
    gameData[0] === 2 &&
    gameData[2] === 0 &&
    gameData[5] === 0 &&
    gameData[6] === 0 &&
    (positionSelected = 2);

  gameData[4] === 1 &&
    gameData[6] === 1 &&
    gameData[2] === 2 &&
    gameData[0] === 0 &&
    gameData[3] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 0);

  gameData[4] === 1 &&
    gameData[6] === 1 &&
    gameData[2] === 2 &&
    gameData[0] === 0 &&
    gameData[7] === 0 &&
    gameData[8] === 0 &&
    (positionSelected = 8);

  return positionSelected;
};
