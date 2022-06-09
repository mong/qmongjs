import loadDevTools from "./dev-tools/load";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./index.css";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from "./App";

if (process.env.NEXT_PUBLIC_SENTRY) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY,
    autoSessionTracking: true,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
    ignoreErrors: [
      "ResizeObserver loop limit exceeded",
      "ResizeObserver loop completed with undelivered notifications.",
    ],
  });
}

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
