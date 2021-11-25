import ChartRowDescription from "../chartrowdescription";
import { render } from "@testing-library/react";

test("ChartRowDescription with date", () => {
  let delivery_time = new Date("1999-12-31T23:59:59.999Z");
  const { container } = render(
    <ChartRowDescription
      description_text="Denne kvalitetsindikatoren er definert som andel pasienter med..."
      delivery_time={delivery_time}
    />
  );

  expect(container).toMatchSnapshot();
});

test("ChartRowDescription with date equals zero", () => {
  let delivery_time = new Date(0);
  const { container } = render(
    <ChartRowDescription
      description_text="Vi prøver ågså særnårske bokstaver"
      delivery_time={delivery_time}
    />
  );

  expect(container).toMatchSnapshot();
});
