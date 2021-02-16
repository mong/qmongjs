import loadDevTools from "./dev-tools/load";
import React from "react";
import ReactDOM from "react-dom";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import "./index.css";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from "./App";
import { QueryParamProvider } from "use-query-params";
import { BrowserRouter, Route } from "react-router-dom";

Sentry.init({
  dsn:
    "https://40163899a6bc4f71a29e2a4e3e35e9ce@o489056.ingest.sentry.io/5568249",
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],
  // https://docs.sentry.io/platforms/javascript/performance/sampling/
  tracesSampleRate: 1.0,
});

const queryCache = new QueryCache();

loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <BrowserRouter>
          <QueryParamProvider ReactRouterRoute={Route}>
            <Route path="/">
              <App />
            </Route>
          </QueryParamProvider>
        </BrowserRouter>
        <ReactQueryDevtools />
      </ReactQueryCacheProvider>
    </React.StrictMode>,
    document.getElementById("root")
  )
);
