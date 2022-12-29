import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import styles from "./Points.module.css";

export const Points = () => {
  const { points, isAutomatic, symbolsPlayers } = useContext(GameContext);

  return (
    <>
      <div className={styles.box}>
        <div className={styles.points}>
          <div>
            <h1>
              {isAutomatic ? "Você" : "Jogador 1"}
              &nbsp;&nbsp;&nbsp;
              {symbolsPlayers[1] === "O" ? "⭕" : "❌"}
            </h1>
            <h2>{points[1]}</h2>
          </div>
          <div>
            <h1>
              {isAutomatic ? "Adversário" : "Jogador 2"}
              &nbsp;&nbsp;&nbsp;
              {symbolsPlayers[2] === "O" ? "⭕" : "❌"}
            </h1>
            <h2>{points[2]}</h2>
          </div>
        </div>
      </div>
    </>
  );
};
