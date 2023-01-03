import { gql, useMutation, useQuery } from "@apollo/client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useSound from "use-sound";
import gameOverSound from "../assets/audios/game-over.mp3";
import clickMachineSound from "../assets/audios/machine.mp3";
import weTiedSound from "../assets/audios/tied.mp3";
import winnerSound from "../assets/audios/winner.mp3";
import { getRecordsQueryResponse, GET_RECORDS } from "../db/getRecords";
import {
  checkingPossibilityOfCreatingHighStrategy,
  checkingPossibilityOfCreatingMediaStrategy,
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

interface publishRecordMutationResponse {
  publishRecord: { id: string };
}

interface registerRecordMutationResponse {
  createRecord: { id: string };
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
  level: 1 | 2 | 3;
  setLevel: Dispatch<SetStateAction<1 | 2 | 3>>;
  records: undefined | getRecordsQueryResponse["records"];
  isRecord: boolean;
  registerRecord: (name: string) => void;
};

export const GameContext = createContext({} as GameData);

export function GameProvider({ children }: GameProviderProps) {
  const [gameData, setGameData] = useState<number[]>(
    Array.from({ length: 9 }, () => 0)
  );

  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [isAutomatic, setIsAutomatic] = useState(true);
  const [isRecord, setIsRecord] = useState(false);
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
  const [records, setRecords] = useState<
    undefined | getRecordsQueryResponse["records"]
  >(undefined);

  const [playSoundGameOver] = useSound(gameOverSound);
  const [playSoundWinner] = useSound(winnerSound);
  const [playSoundClickMachine] = useSound(clickMachineSound);
  const [playSoundWeTied] = useSound(weTiedSound);

  const { data: dataGetRecords, refetch: refetchGetRecords } =
    useQuery<getRecordsQueryResponse>(GET_RECORDS, {
      variables: {
        level,
      },
    });

  useEffect(() => {
    refetchGetRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refetchGetRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  useEffect(() => {
    setRecords(dataGetRecords?.records);
  }, [dataGetRecords]);

  const REGISTER_RECORD = gql`
    mutation RegisterRecord($name: String!, $score: Int!, $level: Int!) {
      createRecord(data: { name: $name, score: $score, level: $level }) {
        id
      }
    }
  `;

  const PUBLISH_RECORD = gql`
    mutation PublishRecord($id: ID!) {
      publishRecord(where: { id: $id }, to: PUBLISHED) {
        id
      }
    }
  `;

  const [registerRecordMutateFunction] =
    useMutation<registerRecordMutationResponse>(REGISTER_RECORD);

  const [publishRecordMutateFunction] =
    useMutation<publishRecordMutationResponse>(PUBLISH_RECORD);

  const checkRecord = () => {
    let isRecord = false;

    if ((!records || (records && records.length < 10)) && points[1] > 0) {
      isRecord = true;
    }

    if (!isRecord) {
      records?.forEach((record) => {
        record.score < points[1] && (isRecord = true);
      });
    }

    setIsRecord(isRecord);
  };

  const registerRecord = async (name: string) => {
    try {
      await registerRecordMutateFunction({
        variables: { name, score: points[1], level },
      }).then(async ({ data }) => {
        await publishRecordMutateFunction({
          variables: {
            id: (data as registerRecordMutationResponse).createRecord.id,
          },
        }).then(() => {
          refetchGetRecords();
          restartPoints();
        });
      });
    } catch {
    } finally {
      restart();
    }
  };

  let idGame = 1;

  const handleSymbolsPlayers = () => {
    setSymbolsPlayers((prev) => ({
      1: prev[1] === "X" ? "O" : "X",
      2: prev[2] === "X" ? "O" : "X",
    }));
  };

  const playAutomatically = () => {
    if (isWeTied || playerWinner) return;

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

    if (
      positionSelected !== 0 &&
      !positionSelected &&
      (level === 2 || level === 3)
    ) {
      positionSelected = checkPossibilityOfDisruptingOpponent(
        possibility,
        gameData
      );
    }

    if (
      positionSelected !== 0 &&
      !positionSelected &&
      (level === 2 || level === 3)
    ) {
      positionSelected = checkingPossibilityOfCreatingMediaStrategy(gameData);
    }

    if (positionSelected !== 0 && !positionSelected && level === 3) {
      positionSelected = checkingPossibilityOfCreatingHighStrategy(gameData);
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
        playSoundClickMachine();
      }
    }, Math.floor(Math.random() * 3000));
  };

  const checkWeTied = () => {
    const possibilitiesFiltered = possibilities(gameData).map((value) =>
      [...new Set(value)].filter((value) => value !== 0 && value)
    );

    let isWeTied = true;

    possibilitiesFiltered.forEach(
      (values) => values.length !== 2 && (isWeTied = false)
    );

    if (isWeTied) {
      playSoundWeTied();
      setIsWeTied(isWeTied);
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
        if (isWinner) {
          if (
            !isAutomatic ||
            (isAutomatic && gameData[combination[0] as number] === 1)
          ) {
            playSoundWinner();
          }
        }
        isWinner &&
          isAutomatic &&
          gameData[combination[0] as number] === 2 &&
          playSoundGameOver();
      }
    });

    isWinner && isAutomatic && checkRecord();

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
      checkWeTied();
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
  }, [isAutomatic, level]);

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
        level,
        setLevel,
        records,
        registerRecord,
        isRecord,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
