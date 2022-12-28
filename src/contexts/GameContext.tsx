import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface GameProviderProps {
  children: ReactNode;
}

type GameData = {
  restart: () => void;
  currentPlayer: number;
  playerWinner: number | null;
  isWeTied: boolean;
  showLine: string | null;
  gameData: number[];
  setGameData: Dispatch<SetStateAction<number[]>>;
  isAutomatic: boolean;
  setIsAutomatic: Dispatch<SetStateAction<boolean>>;
  points: { 1: number; 2: number };
};

export const GameContext = createContext({} as GameData);

export function GameProvider({ children }: GameProviderProps) {
  const [isAutomatic, setIsAutomatic] = useState(true);
  const [gameData, setGameData] = useState<number[]>(
    Array.from({ length: 9 }, () => 0)
  );
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerWinner, setPlayerWinner] = useState<number | null>(null);
  const [isWeTied, setIsWeTied] = useState(false);
  const [showLine, setShowLine] = useState<string | null>(null);
  const [points, setPoints] = useState({ 1: 0, 2: 0 });
  let idGame = 1;

  const winnerCombinations = [
    [0, 1, 2, "line-1"],
    [3, 4, 5, "line-2"],
    [6, 7, 8, "line-3"],
    [0, 3, 6, "column-1"],
    [1, 4, 7, "column-2"],
    [2, 5, 8, "column-3"],
    [0, 4, 8, "diagonal-1"],
    [6, 4, 2, "diagonal-2"],
  ];

  const checkGameOver = () => {
    const possibilities = Array.from(
      { length: winnerCombinations.length },
      (_, index) => {
        return [
          gameData[winnerCombinations[index][0] as number],
          gameData[winnerCombinations[index][1] as number],
          gameData[winnerCombinations[index][2] as number],
        ];
      }
    );

    const possibilitiesFiltered = possibilities.map((value) =>
      [...new Set(value)].filter((value) => value !== 0 && value)
    );

    let gameOver = true;

    possibilitiesFiltered.forEach(
      (values) => values.length !== 2 && (gameOver = false)
    );

    setIsWeTied(gameOver);
  };

  const checkWinner = () => {
    let isWinner = false;

    winnerCombinations.forEach((combination) => {
      if (
        gameData[combination[0] as number] !== 0 &&
        gameData[combination[0] as number] ===
          gameData[combination[1] as number] &&
        gameData[combination[0] as number] ===
          gameData[combination[2] as number]
      ) {
        setPlayerWinner(gameData[combination[0] as number]);
        setPoints((prev) => {
          const newValue = { ...prev };
          newValue[gameData[combination[0] as number] as 1 | 2] += 1;
          return newValue;
        });
        setShowLine(combination[3] as string);
        isWinner = true;
      }
    });

    !isWinner && setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
  };

  const restart = () => {
    idGame++;
    setCurrentPlayer(1);
    setGameData(Array.from({ length: 9 }, () => 0));
    setPlayerWinner(null);
    setIsWeTied(false);
  };

  const restartPoints = () => {
    setPoints({ 1: 0, 2: 0 });
  };

  useEffect(() => {
    if (gameData.some((v) => v === 1 || v === 2)) {
      checkGameOver();
      checkWinner();
    }
  }, [gameData]);

  useEffect(() => {
    if (gameData.some((v) => v === 1 || v === 2)) {
      restart();
    }

    restartPoints();
  }, [isAutomatic]);

  useEffect(() => {
    if (isAutomatic && currentPlayer === 2) {
      const idTemporary = idGame;

      const availablePositions = [] as number[];
      let positionSelected: number | null = null;

      gameData.forEach((v, i) => {
        v === 0 && availablePositions.push(i);
      });

      let possibility = [] as { 0: number; 1: number; 2: number }[];

      winnerCombinations.forEach((combinations, index) => {
        possibility.push(
          [
            gameData[combinations[0] as number],
            gameData[combinations[1] as number],
            gameData[combinations[2] as number],
          ].reduce(
            (prev, acc) => {
              let current = { ...prev };

              current[acc as 0 | 1 | 2]++;

              return current;
            },
            { 0: 0, 1: 0, 2: 0 }
          )
        );
      });

      possibility.forEach((v, i) => {
        if (v[1] === 0 && v[2] === 2) {
          winnerCombinations[i].forEach((value) => {
            gameData[value as number] === 0 &&
              (positionSelected = value as number);
          });
        }
      });

      if (!positionSelected) {
        possibility.forEach((v, i) => {
          if (v[1] === 2 && v[2] === 0) {
            winnerCombinations[i].forEach((value) => {
              gameData[value as number] === 0 &&
                (positionSelected = value as number);
            });
          }
        });
      }

      positionSelected =
        positionSelected ||
        availablePositions[
          Math.floor(Math.random() * availablePositions.length)
        ];

      setTimeout(() => {
        if (idTemporary === idGame) {
          setGameData((prev) => {
            const newGameData = [...prev];
            newGameData[positionSelected as number] = currentPlayer;
            return newGameData;
          });
        }
      }, Math.floor(Math.random() * 3000));
    }
  }, [currentPlayer]);

  return (
    <GameContext.Provider
      value={{
        restart,
        currentPlayer,
        playerWinner,
        isWeTied,
        showLine,
        gameData,
        setGameData,
        isAutomatic,
        setIsAutomatic,
        points,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
