import { QueryParamProvider } from "use-query-params";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainRegister from "./components/RegisterPage/MainRegister";
import SelectedRegister from "./components/RegisterPage/SelectedRegister";
import { useRegisterNamesQuery } from "./helpers/hooks";
import { UseQueryResult } from "react-query";

function APP() {
  const registryNameQuery: UseQueryResult<any, unknown> =
    useRegisterNamesQuery();
  if (registryNameQuery.isLoading) {
    return null;
  }
  const registerNames = registryNameQuery.data;

  return (
    <BrowserRouter basename="/kvalitetsregistre">
      <QueryParamProvider ReactRouterRoute={Route}>
        <Header />
        <Switch>
          <Route path="/alle/:tab">
            <MainRegister registerNames={registerNames ?? []} />
          </Route>
          <Route path="/:register/:tab">
            <SelectedRegister registerNames={registerNames ?? []} />
          </Route>
          <Route path="/">
            <Redirect to="/alle/sykehus" />
          </Route>
          <Route path="/alle">
            <Redirect to="/alle/sykehus" />
          </Route>

          <Route path="*">
            <div style={{ minHeight: "100vh" }}>
              <h1 style={{ margin: "10%" }}>Page Not Found</h1>
            </div>
          </Route>
        </Switch>
        <Footer />
      </QueryParamProvider>
    </BrowserRouter>
  );
}

export default APP;
