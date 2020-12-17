import loadDevTools from "./dev-tools/load";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { QueryParamProvider } from "use-query-params";

loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      <QueryParamProvider>
        <App />
      </QueryParamProvider>
    </React.StrictMode>,
    document.getElementById("root")
  )
);
