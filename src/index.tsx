import loadDevTools from "./dev-tools/load";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { QueryParamProvider } from "use-query-params";
import { BrowserRouter, Route } from "react-router-dom";

loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Route path="/">
            <App />
          </Route>
        </QueryParamProvider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  )
);
