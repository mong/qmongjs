import loadDevTools from "./dev-tools/load";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";

loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Route
          path="/:indicator?/:level?/:year?/:tus?/:module?"
          component={() => <App />}
        />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  )
);
