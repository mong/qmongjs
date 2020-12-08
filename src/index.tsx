import loadDevTools from "./dev-tools/load";
import React from "react";
import ReactDOM from "react-dom";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import "./index.css";
import App from "./App";

const queryCache = new QueryCache();

loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <App />
        <ReactQueryDevtools />
      </ReactQueryCacheProvider>
    </React.StrictMode>,
    document.getElementById("root")
  )
);
