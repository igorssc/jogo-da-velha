import { useContext } from "react";
import { Backdrop } from "./components/Backdrop";
import { ButtonsFooterGame } from "./components/ButtonsFooterGame";
import { ButtonsLevels } from "./components/ButtonsLevels";
import { Game } from "./components/Game";
import { Header } from "./components/Header";
import { Points } from "./components/Points";
import { Records } from "./components/Records";
import { GameContext } from "./contexts/GameContext";
import "./Globals.css";

export function App() {
  const { playerWinner, isWeTied, isAutomatic } = useContext(GameContext);

  return (
    <>
      {(playerWinner || isWeTied) && <Backdrop />}
      <Header />
      <Game />
      <ButtonsFooterGame />
      <Points />
      {isAutomatic && (
        <>
          <ButtonsLevels />
          <Records />
        </>
      )}
    </>
  );
}
