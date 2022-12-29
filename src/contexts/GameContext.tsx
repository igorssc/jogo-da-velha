import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  checkingPossibilityOfCreatingStrategy,
  checkPossibilityOfDisruptingOpponent,
  checkPossibilityOfWinning,
  checkPossibilityOfWinningInTheFuture,
  generateRandomPosition,
  possibilities,
  winnerCombinations,
} from "../utils/strategies";

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
  startingPlayer: number;
  symbolsPlayers: { 1: "X" | "O"; 2: "X" | "O" };
  handleSymbolsPlayers: () => void;
};

export const GameContext = createContext({} as GameData);

export function GameProvider({ children }: GameProviderProps) {
  const [gameData, setGameData] = useState<number[]>(
    Array.from({ length: 9 }, () => 0)
  );

  const [isAutomatic, setIsAutomatic] = useState(true);
  const [startingPlayer, setStartingPlayer] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerWinner, setPlayerWinner] = useState<number | null>(null);
  const [isWeTied, setIsWeTied] = useState(false);
  const [showLine, setShowLine] = useState<string | null>(null);
  const [points, setPoints] = useState({ 1: 0, 2: 0 });
  const [symbolsPlayers, setSymbolsPlayers] = useState<{
    1: "X" | "O";
    2: "X" | "O";
  }>({ 1: "X", 2: "O" });

  let idGame = 1;

  const handleSymbolsPlayers = () => {
    setSymbolsPlayers((prev) => ({
      1: prev[1] === "X" ? "O" : "X",
      2: prev[2] === "X" ? "O" : "X",
    }));
  };

  const playAutomatically = () => {
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

    positionSelected = checkPossibilityOfWinning(possibility, gameData);

    if (positionSelected !== 0 && !positionSelected) {
      positionSelected = checkPossibilityOfDisruptingOpponent(
        possibility,
        gameData
      );
    }

    if (positionSelected !== 0 && !positionSelected) {
      positionSelected = checkingPossibilityOfCreatingStrategy(gameData);
    }

    if (positionSelected !== 0 && !positionSelected) {
      positionSelected = checkPossibilityOfWinningInTheFuture(
        possibility,
        gameData
      );
    }

    positionSelected =
      positionSelected ?? generateRandomPosition(availablePositions);

    setTimeout(() => {
      if (idTemporary === idGame) {
        setGameData((prev) => {
          const newGameData = [...prev];
          newGameData[positionSelected as number] = currentPlayer;
          return newGameData;
        });
      }
    }, Math.floor(Math.random() * 3000));
  };

  const checkGameOver = () => {
    const possibilitiesFiltered = possibilities(gameData).map((value) =>
      [...new Set(value)].filter((value) => value !== 0 && value)
    );

    let isGameOver = true;

    possibilitiesFiltered.forEach(
      (values) => values.length !== 2 && (isGameOver = false)
    );

    if (isGameOver) {
      setIsWeTied(isGameOver);
      setStartingPlayer((prev) => (prev === 1 ? 2 : 1));
    }
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
        setStartingPlayer(gameData[combination[0] as number]);
        isWinner = true;
      }
    });

    !isWinner && setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
  };

  const restart = () => {
    idGame++;
    setCurrentPlayer(startingPlayer);
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
    setCurrentPlayer(1);
    setStartingPlayer(1);
  }, [isAutomatic]);

  useEffect(() => {
    if (isAutomatic && currentPlayer === 2 && gameData.some((v) => v === 1)) {
      playAutomatically();
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (isAutomatic && currentPlayer === 2 && startingPlayer === 2) {
      if (!gameData.some((v) => v === 1 || v === 2)) {
        playAutomatically();
      }
    }
  }, [gameData]);

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
        startingPlayer,
        symbolsPlayers,
        handleSymbolsPlayers,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
