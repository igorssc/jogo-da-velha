import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import styles from "./Backdrop.module.css";
import { Button } from "./Button";
import { Fireworks } from "./Fireworks";

export const Backdrop = () => {
  const { playerWinner, restart, isWeTied, isAutomatic, symbolsPlayers } =
    useContext(GameContext);

  return (
    <>
      <div className={styles.backdrop}>
        {((!isAutomatic && playerWinner) ||
          (isAutomatic && playerWinner === 1)) && (
          <div className={styles.winner}>
            <h1>Vitória</h1>
            <br />
            <h2>
              {isAutomatic && "Você ganhou!"}
              {!isAutomatic &&
                `
                Jogador ${playerWinner} - "${
                  symbolsPlayers[playerWinner as 1 | 2]
                }"
                `}
            </h2>
            <Button onClick={restart} scheme="secondary">
              Jogar novamente
            </Button>
            <Fireworks />
          </div>
        )}
        {isAutomatic && playerWinner === 2 && (
          <div className={styles.game_over}>
            <h1>Você perdeu :&#40;</h1>
            <br />
            <Button onClick={restart} scheme="secondary">
              Jogar novamente
            </Button>
          </div>
        )}
        {isWeTied && (
          <div className={styles.we_tied}>
            <h1>Deu velha! :&#40;</h1>
            <Button onClick={restart} scheme="secondary">
              Jogar novamente
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
