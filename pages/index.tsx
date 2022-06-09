import { QueryParamProvider } from "use-query-params";
import { BrowserRouter, Route } from "react-router-dom";

import RegisterPage from "../src/components/RegisterPage";

function APP() {
  return (
    <BrowserRouter basename="/kvalitetsregistre">
      <QueryParamProvider ReactRouterRoute={Route}>
        <RegisterPage />
      </QueryParamProvider>
    </BrowserRouter>
  );
}

export default APP;
