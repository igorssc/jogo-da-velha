import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import styles from "./Points.module.css";

export const Points = () => {
  const { points } = useContext(GameContext);

  return (
    <>
      <div className={styles.box}>
        <div className={styles.points}>
          <div>
            <h1>Jogador 1 - "X"</h1>
            <h2>{points[1]}</h2>
          </div>
          <div>
            <h1>Jogador 2 - "O"</h1>
            <h2>{points[2]}</h2>
          </div>
        </div>
      </div>
    </>
  );
};
