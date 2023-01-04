import { useContext, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import { Button } from "./Button";
import styles from "./ButtonsLevels.module.css";
import { Dialog } from "./Dialog";

export const ButtonsLevels = () => {
  const { setLevel, level } = useContext(GameContext);

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [toLevel, setToLevel] = useState<1 | 2 | 3>(1);

  return (
    <>
      <div className={styles.buttons}>
        <Button
          onClick={() => {
            setToLevel(1);
            setIsOpenDialog(true);
          }}
          scheme={level === 1 ? "secondary" : "primary"}
          small
        >
          Fácil
        </Button>
        <Button
          onClick={() => {
            setToLevel(2);
            setIsOpenDialog(true);
          }}
          scheme={level === 2 ? "secondary" : "primary"}
          small
        >
          Médio
        </Button>
        <Button
          onClick={() => {
            setToLevel(3);
            setIsOpenDialog(true);
          }}
          scheme={level === 3 ? "secondary" : "primary"}
          small
        >
          Difícil
        </Button>
      </div>
      <Dialog.ChangeLevel
        open={isOpenDialog}
        setOpen={setIsOpenDialog}
        toLevel={toLevel}
      />
    </>
  );
};
