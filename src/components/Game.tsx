import clsx from "clsx";
import { useContext } from "react";
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
  } = useContext(GameContext);

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
  };

  return (
    <>
      <div className={styles.game_area}>
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
              (gameData[index] !== 0 || playerWinner) && "disabled",
              isAutomatic && currentPlayer === 2 && "disabled"
            )}
          >
            {value === 1 && "X"}
            {value === 2 && "O"}
          </span>
        ))}
      </div>
    </>
  );
};
