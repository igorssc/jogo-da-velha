import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { GameProvider } from "./contexts/GameContext";
import { client } from "./lib/apollo";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GameProvider>
        <App />
      </GameProvider>
    </ApolloProvider>
  </React.StrictMode>
);
