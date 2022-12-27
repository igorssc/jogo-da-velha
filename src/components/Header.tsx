import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import styles from "./Header.module.css";
import { Toggle } from "./Toggle";

export const Header = () => {
  const { currentPlayer, isAutomatic, setIsAutomatic } =
    useContext(GameContext);

  return (
    <>
      <h1 className={styles.title}>Jogo da Velha</h1>
      <div className={styles.details}>
        <p className={styles.current_player}>
          Jogador {currentPlayer} - "{currentPlayer === 1 ? "X" : "O"}"
        </p>
        <p>
          Automático
          <Toggle
            isChecked={isAutomatic}
            onToggleSwitchChange={() => {
              setIsAutomatic((prev) => !prev);
            }}
          />
        </p>
      </div>
    </>
  );
};
