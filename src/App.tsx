import { useContext } from "react";
import "./App.css";
import { Backdrop } from "./components/Backdrop";
import { Button } from "./components/Button";
import { Game } from "./components/Game";
import { Header } from "./components/Header";
import { Points } from "./components/Points";
import { GameContext } from "./contexts/GameContext";

export function App() {
  const {
    playerWinner,
    isWeTied,
    restart,
    handleSymbolsPlayers,
    isAutomatic,
    level,
    setLevel,
  } = useContext(GameContext);

  return (
    <>
      {(playerWinner || isWeTied) && <Backdrop />}
      <Header />
      <Game />
      <div className="buttons-app">
        <Button onClick={handleSymbolsPlayers}>Alternar símbolos</Button>
        <Button onClick={restart} scheme="secondary">
          Reiniciar
        </Button>
      </div>
      <Points />
      {isAutomatic && (
        <div className="footer-app">
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
      )}
    </>
  );
}
