import React from "react";
import { QueryParamProvider } from "use-query-params";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import RegisterPage from "./components/RegisterPage";

function APP() {
  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/kvalitetsregistre">
            <RegisterPage />
          </Route>
          <Route path="/">
            <div style={{ minHeight: "100vh" }}>
              <h1 style={{ margin: "10%" }}>Page Not Found</h1>
            </div>
          </Route>
        </Switch>
      </QueryParamProvider>
    </BrowserRouter>
  );
}

export default APP;
