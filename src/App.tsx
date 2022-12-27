import clsx from "clsx";
import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Fireworks } from "./components/Fireworks";

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

export function App() {
  const [gameData, setGameData] = useState<number[]>(
    Array.from({ length: 9 }, () => 0)
  );
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerWinner, setPlayerWinner] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showLine, setShowLine] = useState<string | null>(null);

  const handleClick = (indexGame: number) => {
    if (gameData[indexGame] !== 0 || playerWinner !== null) {
      return;
    }

    setGameData((prev) => {
      const newGameData = [...prev];
      newGameData[indexGame] = currentPlayer;
      return newGameData;
    });
  };

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

    setIsGameOver(gameOver);
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
        setShowLine(combination[3] as string);
        isWinner = true;
      }
    });

    !isWinner && setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
  };

  useEffect(() => {
    checkGameOver();
    checkWinner();
  }, [gameData]);

  const restart = () => {
    setCurrentPlayer(1);
    setGameData(Array.from({ length: 9 }, () => 0));
    setPlayerWinner(null);
  };

  return (
    <>
      {(playerWinner || isGameOver) && (
        <div className="backdrop">
          {playerWinner && (
            <div className="winner">
              <h1>Vitória</h1>
              <br />
              <h2>
                Jogador {playerWinner} - "{playerWinner === 1 ? "X" : "O"}"
              </h2>
              <button onClick={restart}>Reiniciar</button>
              <Fireworks />
            </div>
          )}
          {isGameOver && (
            <div className="game_over">
              <h1>Deu velha! :&#40;</h1>
              <button onClick={restart}>Reiniciar</button>
            </div>
          )}
        </div>
      )}
      <h1 className="title">Jogo da Velha</h1>
      <p className="current_player">
        Jogador {currentPlayer} - "{currentPlayer === 1 ? "X" : "O"}"
      </p>
      <div className="game-area">
        <hr
          style={{
            ...(!playerWinner && { display: "none" }),
            ...(showLine === "line-1" && { left: 5, top: 52 }),
            ...(showLine === "line-2" && { left: 5, top: 222 }),
            ...(showLine === "line-3" && { left: 5, top: 391 }),
            ...(showLine === "column-1" && {
              transform: "rotate(90deg) translateY(165px) translateX(220px)",
            }),
            ...(showLine === "column-2" && {
              transform: "rotate(90deg) translateY(-5px) translateX(220px)",
            }),
            ...(showLine === "column-3" && {
              transform: "rotate(90deg) translateY(-175px) translateX(220px)",
            }),
            ...(showLine === "diagonal-1" && {
              width: 600,
              transform: "rotate(45deg) translateY(205px) translateX(110px)",
            }),
            ...(showLine === "diagonal-2" && {
              width: 600,
              transform: "rotate(-45deg) translateY(105px) translateX(-205px)",
            }),
          }}
        />
        {gameData.map((value, index) => (
          <span
            key={index}
            onClick={() => handleClick(index)}
            className={clsx(
              (gameData[index] !== 0 || playerWinner) && "disabled"
            )}
          >
            {value === 1 && "X"}
            {value === 2 && "O"}
          </span>
        ))}
      </div>
      <Button onClick={restart}>Reiniciar</Button>
    </>
  );
}
