import * as Sentry from "@sentry/nextjs";

import { BrowserTracing } from "@sentry/tracing";

if (process.env.REACT_APP_SENTRY) {
  try {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY,
      autoSessionTracking: true,
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0,
      ignoreErrors: [
        "ResizeObserver loop limit exceeded",
        "ResizeObserver loop completed with undelivered notifications.",
      ],
    });
  } catch (error) {
    console.log("Sentry not working with dsn=" + process.env.REACT_APP_SENTRY);
  }
}
