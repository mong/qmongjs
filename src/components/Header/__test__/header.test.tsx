import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import Header from "../";

it("main page header renders", async () => {
  const { container } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  expect(container).toMatchSnapshot();
});
