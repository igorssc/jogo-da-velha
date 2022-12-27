import { useContext } from "react";
import "./App.css";
import { Backdrop } from "./components/Backdrop";
import { Button } from "./components/Button";
import { Game } from "./components/Game";
import { Header } from "./components/Header";
import { GameContext } from "./contexts/GameContext";

export function App() {
  const { playerWinner, isGameOver, restart } = useContext(GameContext);

  return (
    <>
      {(playerWinner || isGameOver) && <Backdrop />}
      <Header />
      <Game />
      <Button onClick={restart}>Reiniciar</Button>
    </>
  );
}
