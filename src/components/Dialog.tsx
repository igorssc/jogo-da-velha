import DialogMui from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Dispatch, SetStateAction, useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { Button } from "./Button";

interface DialogPropsRestart {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DialogRestart = ({ open, setOpen }: DialogPropsRestart) => {
  const { restart, checkRecord, setIsIntentionToRestart } =
    useContext(GameContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogMui open={open} onClose={handleClose}>
        <DialogTitle>Tem certeza?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja mesmo encerrar a partida e começar uma nova?
            <br />
            <br />
            <small>* Isso irá zerar seus pontos</small>`
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button small autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            small
            scheme="secondary"
            onClick={() => {
              const isRecord = checkRecord();
              isRecord && setIsIntentionToRestart(true);
              if (!isRecord) {
                restart();
              }

              handleClose();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Encerrar
          </Button>
        </DialogActions>
      </DialogMui>
    </>
  );
};

interface DialogPropsChangeLevel {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  toLevel: 1 | 2 | 3;
}

const DialogChangeLevel = ({
  open,
  setOpen,
  toLevel,
}: DialogPropsChangeLevel) => {
  const { checkRecord, setIsChangingLevels, setLevel, restart, level } =
    useContext(GameContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogMui open={open} onClose={handleClose}>
        <DialogTitle>Tem certeza?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Alternar os modos irá zerar seus pontos
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button small autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            small
            scheme="secondary"
            onClick={() => {
              const isRecord = checkRecord();
              isRecord && setIsChangingLevels(toLevel);
              if (!isRecord) {
                setLevel(toLevel);
                restart();

                localStorage.setItem(
                  "p",
                  JSON.stringify({
                    l: level === 1 ? 2 : 1,
                    p: 0,
                  })
                );
              }
              handleClose();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Continuar
          </Button>
        </DialogActions>
      </DialogMui>
    </>
  );
};

export const Dialog = {
  Restart: DialogRestart,
  ChangeLevel: DialogChangeLevel,
};
