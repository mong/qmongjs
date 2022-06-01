import loadDevTools from "./dev-tools/load";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./index.css";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from "./App";

Sentry.init({
  dsn: "https://40163899a6bc4f71a29e2a4e3e35e9ce@o489056.ingest.sentry.io/5568249",
  autoSessionTracking: true,
  integrations: [new BrowserTracing()],
  // https://docs.sentry.io/platforms/javascript/performance/sampling/
  tracesSampleRate: 1.0,
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "ResizeObserver loop completed with undelivered notifications.",
  ],
});

const queryClient = new QueryClient();

loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root")
  )
);
