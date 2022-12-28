import { useContext } from "react";
import "./App.css";
import { Backdrop } from "./components/Backdrop";
import { Button } from "./components/Button";
import { Game } from "./components/Game";
import { Header } from "./components/Header";
import { Points } from "./components/Points";
import { GameContext } from "./contexts/GameContext";

export function App() {
  const { playerWinner, isWeTied, restart } = useContext(GameContext);

  return (
    <>
      {(playerWinner || isWeTied) && <Backdrop />}
      <Header />
      <Game />
      <Button onClick={restart}>Reiniciar</Button>
      <Points />
    </>
  );
}
