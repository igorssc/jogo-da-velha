import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { Button } from "./Button";
import styles from "./ButtonsFooterGame.module.css";

export const ButtonsFooterGame = () => {
  const { handleSymbolsPlayers, restart } = useContext(GameContext);

  return (
    <>
      <div className={styles.buttons}>
        <Button onClick={handleSymbolsPlayers}>Alternar símbolos</Button>
        <Button onClick={restart} scheme="secondary">
          Reiniciar
        </Button>
      </div>
    </>
  );
};
