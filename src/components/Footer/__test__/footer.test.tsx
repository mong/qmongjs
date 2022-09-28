import { render } from "@testing-library/react";

import Footer from "../";

it("Footer renders", async () => {
  const { container } = render(<Footer />);

  expect(container).toMatchSnapshot();
});
