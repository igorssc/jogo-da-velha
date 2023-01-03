import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { Button } from "./Button";
import styles from "./ButtonsLevels.module.css";

export const ButtonsLevels = () => {
  const { setLevel, level } = useContext(GameContext);

  return (
    <>
      <div className={styles.buttons}>
        <Button
          onClick={() => setLevel(1)}
          scheme={level === 1 ? "secondary" : "primary"}
          small
        >
          Fácil
        </Button>
        <Button
          onClick={() => setLevel(2)}
          scheme={level === 2 ? "secondary" : "primary"}
          small
        >
          Médio
        </Button>
        <Button
          onClick={() => setLevel(3)}
          scheme={level === 3 ? "secondary" : "primary"}
          small
        >
          Difícil
        </Button>
      </div>
    </>
  );
};
