import { useSnackbar } from "notistack";
import { ChangeEvent, useContext, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import styles from "./Backdrop.module.css";
import { Button } from "./Button";
import { Fireworks } from "./Fireworks";

export const Backdrop = () => {
  const {
    playerWinner,
    restart,
    isWeTied,
    isAutomatic,
    symbolsPlayers,
    isRecord,
    isIntentionToRestart,
    isChangingLevels,
  } = useContext(GameContext);

  return (
    <>
      <div className={styles.backdrop}>
        {((!isAutomatic && playerWinner) ||
          (isAutomatic && playerWinner === 1)) && (
          <div className={styles.winner}>
            <h1>Vitória</h1>
            <h2>
              {isAutomatic && "Você ganhou!"}
              {!isAutomatic &&
                `
                Jogador ${playerWinner} - "${
                  symbolsPlayers[playerWinner as 1 | 2]
                }"
                `}
            </h2>
            {playerWinner && (
              <Button onClick={restart} scheme="secondary">
                Jogar novamente
              </Button>
            )}
            <Fireworks />
          </div>
        )}
        {isAutomatic && playerWinner === 2 && (
          <div className={styles.game_over}>
            <h1>Você perdeu :&#40;</h1>
            {isRecord && (
              <>
                <br />
                <br />
                <Record />
              </>
            )}
            <Button onClick={restart} scheme="secondary">
              Jogar novamente
            </Button>
          </div>
        )}
        {!playerWinner && isIntentionToRestart && isRecord && (
          <div className={styles.game_over}>
            <Record />
          </div>
        )}
        {!playerWinner && isChangingLevels && isRecord && (
          <div className={styles.game_over}>
            <Record />
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

const Record = () => {
  const {
    points,
    registerRecord,
    playerWinner,
    isChangingLevels,
    setLevel,
    setIsChangingLevels,
    restart,
    isIntentionToRestart,
  } = useContext(GameContext);
  const [isButtonActive, setIsButtonActive] = useState(true);
  const [name, setName] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    const CurrentName = event.target.value;

    if (CurrentName.length > 15) return;

    setName(CurrentName);
  };

  const handleNewRecord = () => {
    if (!name || name.trim().length < 3) {
      enqueueSnackbar("Por favor, preencha seu nome", { variant: "warning" });
      return;
    }

    setIsButtonActive(false);

    registerRecord(
      name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase()
    );

    if (isChangingLevels) {
      setLevel(isChangingLevels);
      setIsChangingLevels(false);
      restart();
    }

    if (isIntentionToRestart) {
      restart();
    }
  };

  return (
    <>
      <div className={styles.record}>
        <h3>
          {!playerWinner
            ? "Você entrou pros records"
            : "...mas entrou pros recordes!!"}
        </h3>
        <h4>Sua pontuação: {points[1]}</h4>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={handleName}
        />
        <Button
          disabled={!isButtonActive}
          onClick={handleNewRecord}
          scheme="secondary"
        >
          Continuar
        </Button>
      </div>
    </>
  );
};
