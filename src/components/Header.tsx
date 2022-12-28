import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import styles from "./Header.module.css";
import { Toggle } from "./Toggle";

export const Header = () => {
  const { currentPlayer, isAutomatic, setIsAutomatic, symbolsPlayers } =
    useContext(GameContext);

  return (
    <>
      <h1 className={styles.title}>
        Jogo <span>da</span> Velha
      </h1>
      <div className={styles.details}>
        <p className={styles.current_player}>
          {isAutomatic && currentPlayer === 1 && "Sua vez!"}
          {isAutomatic && currentPlayer === 2 && "Pensando..."}
          {!isAutomatic &&
            `
            Jogador ${currentPlayer} - "${
              symbolsPlayers[currentPlayer as 1 | 2]
            }"
            `}
        </p>
        <div className={styles.toggle}>
          Automático
          <Toggle
            isChecked={isAutomatic}
            onToggleSwitchChange={() => {
              setIsAutomatic((prev) => !prev);
            }}
          />
        </div>
      </div>
    </>
  );
};
