import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import styles from "./Backdrop.module.css";
import { Fireworks } from "./Fireworks";

export const Backdrop = () => {
  const { playerWinner, restart, isGameOver } = useContext(GameContext);

  return (
    <>
      <div className={styles.backdrop}>
        {playerWinner && (
          <div className={styles.winner}>
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
          <div className={styles.game_over}>
            <h1>Deu velha! :&#40;</h1>
            <button onClick={restart}>Reiniciar</button>
          </div>
        )}
      </div>
    </>
  );
};
