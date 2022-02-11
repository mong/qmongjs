import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import Footer from "../";

it("Footer renders", async () => {
  const { container } = render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );

  expect(container).toMatchSnapshot();
});
