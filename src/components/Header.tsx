import { SpeakerHigh, SpeakerSlash } from "phosphor-react";
import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import styles from "./Header.module.css";
import { Toggle } from "./Toggle";

export const Header = () => {
  const {
    currentPlayer,
    isAutomatic,
    setIsAutomatic,
    symbolsPlayers,
    isSound,
    setIsSound,
  } = useContext(GameContext);

  return (
    <>
      <h1 className={styles.title}>
        Jogo <span>da</span> Velha
      </h1>
      <div className={styles.details}>
        <p className={styles.current_player}>
          {isAutomatic && currentPlayer === 1 && "Sua vez!"}
          {isAutomatic && currentPlayer === 2 && "Pensando..."}
          {!isAutomatic && (
            <>
              Jogador {currentPlayer} &nbsp;&nbsp;
              {symbolsPlayers[currentPlayer as 1 | 2] === "O" ? "⭕" : "❌"}
            </>
          )}
        </p>
        <div className={styles.toggle}>
          Automático
          <Toggle
            isChecked={isAutomatic}
            onToggleSwitchChange={() => {
              setIsAutomatic((prev) => !prev);
            }}
          />
          &nbsp;|&nbsp;
          {isSound && (
            <SpeakerHigh
              color="#ffffff"
              size={25}
              weight="bold"
              style={{ cursor: "pointer" }}
              onClick={() => setIsSound(false)}
            />
          )}
          {!isSound && (
            <SpeakerSlash
              color="#b40404"
              size={25}
              weight="bold"
              style={{ cursor: "pointer" }}
              onClick={() => setIsSound(true)}
            />
          )}
        </div>
      </div>
    </>
  );
};
