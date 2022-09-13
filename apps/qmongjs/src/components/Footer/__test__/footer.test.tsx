import { BrowserRouter, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { render } from "@testing-library/react";

import Footer from "../";

it("Footer renders", async () => {
  const { container } = render(
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Footer />
      </QueryParamProvider>
    </BrowserRouter>
  );

  expect(container).toMatchSnapshot();
});
