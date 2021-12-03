import { BrowserRouter, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { render } from "@testing-library/react";

import Header from "../";

it("main page header renders", async () => {
  const { container } = render(
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Header />
      </QueryParamProvider>
    </BrowserRouter>
  );

  expect(container).toMatchSnapshot();
});
