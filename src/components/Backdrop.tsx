import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import styles from "./Backdrop.module.css";
import { Button } from "./Button";
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
            <Button onClick={restart}>Reiniciar</Button>
            <Fireworks />
          </div>
        )}
        {isGameOver && (
          <div className={styles.game_over}>
            <h1>Deu velha! :&#40;</h1>
            <Button onClick={restart}>Reiniciar</Button>
          </div>
        )}
      </div>
    </>
  );
};
