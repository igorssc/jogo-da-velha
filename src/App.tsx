import { useContext } from "react";
import "./App.css";
import { Backdrop } from "./components/Backdrop";
import { Button } from "./components/Button";
import { Game } from "./components/Game";
import { Header } from "./components/Header";
import { Points } from "./components/Points";
import { GameContext } from "./contexts/GameContext";

export function App() {
  const { playerWinner, isWeTied, restart, handleSymbolsPlayers } =
    useContext(GameContext);

  return (
    <>
      {(playerWinner || isWeTied) && <Backdrop />}
      <Header />
      <Game />
      <div className="buttons-app">
        <Button onClick={handleSymbolsPlayers}>Alternar símbolos</Button>
        <Button onClick={restart}>Reiniciar</Button>
      </div>
      <Points />
    </>
  );
}
