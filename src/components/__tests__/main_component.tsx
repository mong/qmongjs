import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import MAIN from "../main_component";
import {
  buildAggData,
  buildDescriptionData,
  buildGraphData,
  buildMainProps,
  buildStatisticData,
} from "../test/data_builders";

describe("test filter buttons", () => {
  const iL = buildStatisticData({
    ind_id: "ind1",
    level: "L",
  });
  const iM = buildStatisticData({
    ind_id: "ind2",
    level: "M",
  });
  const iH = buildStatisticData({
    ind_id: "ind3",
    level: "H",
  });
  const aggData = buildAggData({
    nation: {
      filtered_by_unit: [],
      filtered_by_year: [iL, iM, iH],
    },
  });

  const dL = buildDescriptionData({
    id: "ind1",
    min_denominator: 10,
  });
  const dM = buildDescriptionData({
    id: "ind2",
    min_denominator: 10,
  });
  const dH = buildDescriptionData({
    id: "ind3",
    min_denominator: 10,
  });
  const graphData = buildGraphData({
    agg_data: aggData,
    description: [dL, dM, dH],
  });

  const props = buildMainProps({ data: graphData });

  it("should have 3 filter buttons", () => {
    render(<MAIN {...props} />);
    expect(screen.getByText(/Moderat måloppnåelse/i)).toBeInTheDocument();
    expect(screen.getByText(/Høy måloppnåelse/i)).toBeInTheDocument();
    expect(screen.getByText(/Lav måloppnåelse/i)).toBeInTheDocument();
  });

  it("should have all levels when no filters are active", () => {
    render(<MAIN {...props} />);
    expect(screen.queryAllByLabelText(/Achieved level H/i)).not.toHaveLength(0);
    expect(screen.queryAllByLabelText(/Achieved level M/i)).not.toHaveLength(0);
    expect(screen.queryAllByLabelText(/Achieved level L/i)).not.toHaveLength(0);
  });

  it("should only have H levels when H filter is clicked", () => {
    render(<MAIN {...props} />);
    userEvent.click(screen.getByText(/Høy måloppnåelse/i));
    expect(screen.queryAllByLabelText(/Achieved level H/i)).not.toHaveLength(0);
    expect(screen.queryAllByLabelText(/Achieved level M/i)).toHaveLength(0);
    expect(screen.queryAllByLabelText(/Achieved level L/i)).toHaveLength(0);
  });

  it("should only have M levels when M filter is active", () => {
    render(<MAIN {...props} />);
    userEvent.click(screen.getByText(/Moderat måloppnåelse/i));
    expect(screen.queryAllByLabelText(/Achieved level H/i)).toHaveLength(0);
    expect(screen.queryAllByLabelText(/Achieved level M/i)).not.toHaveLength(0);
    expect(screen.queryAllByLabelText(/Achieved level L/i)).toHaveLength(0);
  });

  it("should only have L levels when L filter is active", () => {
    render(<MAIN {...props} />);
    userEvent.click(screen.getByText(/Lav måloppnåelse/i));
    expect(screen.queryAllByLabelText(/Achieved level H/i)).toHaveLength(0);
    expect(screen.queryAllByLabelText(/Achieved level M/i)).toHaveLength(0);
    expect(screen.queryAllByLabelText(/Achieved level L/i)).not.toHaveLength(0);
  });

  it("should deactivate filter when active filter is clicked", () => {
    render(<MAIN {...props} />);
    userEvent.click(screen.getByText(/Lav måloppnåelse/i));
    userEvent.click(screen.getByText(/Lav måloppnåelse/i));
    userEvent.click(screen.getByText(/Moderat måloppnåelse/i));
    userEvent.click(screen.getByText(/Moderat måloppnåelse/i));
    userEvent.click(screen.getByText(/Høy måloppnåelse/i));
    userEvent.click(screen.getByText(/Høy måloppnåelse/i));

    expect(screen.queryAllByLabelText(/Achieved level H/i)).not.toHaveLength(0);
    expect(screen.queryAllByLabelText(/Achieved level M/i)).not.toHaveLength(0);
    expect(screen.queryAllByLabelText(/Achieved level L/i)).not.toHaveLength(0);
  });
});
