import { useContext, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import { Button } from "./Button";
import styles from "./ButtonsFooterGame.module.css";
import { Dialog } from "./Dialog";

export const ButtonsFooterGame = () => {
  const { handleSymbolsPlayers } = useContext(GameContext);

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <>
      <div className={styles.buttons}>
        <Button onClick={handleSymbolsPlayers}>Alternar símbolos</Button>
        <Button
          onClick={() => {
            setIsOpenDialog(true);
          }}
          scheme="secondary"
        >
          Encerrar desafio / Reiniciar
        </Button>
      </div>
      <Dialog.Restart open={isOpenDialog} setOpen={setIsOpenDialog} />
    </>
  );
};
