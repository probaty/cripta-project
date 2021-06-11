import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TickersProvider } from "./components/TickersContext";

ReactDOM.render(
  <React.StrictMode>
    <TickersProvider>
      <App />
    </TickersProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
