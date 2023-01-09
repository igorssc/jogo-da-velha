import clsx from "clsx";
import { useContext } from "react";
import useSound from "use-sound";
import clickSound from "../assets/audios/click.mp3";
import { GameContext } from "../contexts/GameContext";
import styles from "./Game.module.css";

export const Game = () => {
  const {
    currentPlayer,
    playerWinner,
    showLine,
    gameData,
    setGameData,
    isAutomatic,
    symbolsPlayers,
    isSound,
  } = useContext(GameContext);

  const [playSoundClick] = useSound(clickSound);

  const handleClick = (indexGame: number) => {
    if (
      gameData[indexGame] !== 0 ||
      playerWinner !== null ||
      (isAutomatic && currentPlayer === 2)
    ) {
      return;
    }

    setGameData((prev) => {
      const newGameData = [...prev];
      newGameData[indexGame] = currentPlayer;
      return newGameData;
    });

    isSound && playSoundClick();
  };

  return (
    <>
      <div className={styles.game_area}>
        <hr
          className={clsx(
            !playerWinner && styles.none,
            showLine === "line-1" && styles.line_1,
            showLine === "line-2" && styles.line_2,
            showLine === "line-3" && styles.line_3,
            showLine === "column-1" && styles.column_1,
            showLine === "column-2" && styles.column_2,
            showLine === "column-3" && styles.column_3,
            showLine === "diagonal-1" && styles.diagonal_1,
            showLine === "diagonal-2" && styles.diagonal_2
          )}
        />
        {gameData.map((value, index) => (
          <span
            key={index}
            onClick={() => handleClick(index)}
            className={clsx(
              (gameData[index] !== 0 || playerWinner) && "disabled",
              isAutomatic && currentPlayer === 2 && "disabled"
            )}
          >
            {value === 1 && <span>{symbolsPlayers[1]}</span>}
            {isAutomatic && value === 2 && symbolsPlayers[2] === "O" && (
              <span>⭕</span>
            )}
            {isAutomatic && value === 2 && symbolsPlayers[2] === "X" && (
              <span>❌</span>
            )}
            {!isAutomatic && value === 2 && <span>{symbolsPlayers[2]}</span>}
          </span>
        ))}
      </div>
    </>
  );
};
