import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import MAIN, { GraphData, Props } from "../main_component";
import { med_field, app_text } from "../../app_config";
import { AggData, Description, StatisticData } from "../../App";

describe("test filter buttons", () => {
  // Make databuilders
  const sl = buildStatisticData({
    level: "L",
  });
  const sm = buildStatisticData({
    level: "M",
  });
  const sh = buildStatisticData({
    level: "H",
  });

  const aggData = buildAggData({
    nation: {
      filtered_by_unit: [],
      filtered_by_year: [sl, sm, sh],
    },
  });

  const graphData = buildGraphData({
    agg_data: aggData,
  });

  it("should have 3 filter buttons", () => {
    // const props = buildProps({});
    const props = buildProps({
      data: buildGraphData({}),
    });
    render(<MAIN {...props} />);
    expect(screen.getByText(/Moderat måloppnåelse/i)).toBeInTheDocument();
    expect(screen.getByText(/Høy måloppnåelse/i)).toBeInTheDocument();
    expect(screen.getByText(/Lav måloppnåelse/i)).toBeInTheDocument();
  });

  it("should have all levels when no filters are active", () => {
    const props = buildProps({ data: minimum_test_data });
    render(<MAIN {...props} />);
    expect(screen.queryAllByLabelText(/Achieved level H/i)).not.toHaveLength(0);
    expect(screen.queryAllByLabelText(/Achieved level M/i)).not.toHaveLength(0);
    expect(screen.queryAllByLabelText(/Achieved level L/i)).not.toHaveLength(0);
  });

  it("should only have H levels when H filter is clicked", () => {
    const props = buildProps({ data: minimum_test_data });
    render(<MAIN {...props} />);
    userEvent.click(screen.getByText(/Høy måloppnåelse/i));
    expect(screen.queryAllByLabelText(/Achieved level H/i)).not.toHaveLength(0);
    expect(screen.queryAllByLabelText(/Achieved level M/i)).toHaveLength(0);
    expect(screen.queryAllByLabelText(/Achieved level L/i)).toHaveLength(0);
  });

  it("should only have M levels when M filter is active", () => {
    const props = buildProps({ data: minimum_test_data });
    render(<MAIN {...props} />);
    userEvent.click(screen.getByText(/Moderat måloppnåelse/i));
    expect(screen.queryAllByLabelText(/Achieved level H/i)).toHaveLength(0);
    expect(screen.queryAllByLabelText(/Achieved level M/i)).not.toHaveLength(0);
    expect(screen.queryAllByLabelText(/Achieved level L/i)).toHaveLength(0);
  });

  it("should only have L levels when L filter is active", () => {
    const props = buildProps({ data: minimum_test_data });
    render(<MAIN {...props} />);
    userEvent.click(screen.getByText(/Lav måloppnåelse/i));
    expect(screen.queryAllByLabelText(/Achieved level H/i)).toHaveLength(0);
    expect(screen.queryAllByLabelText(/Achieved level M/i)).toHaveLength(0);
    expect(screen.queryAllByLabelText(/Achieved level L/i)).not.toHaveLength(0);
  });

  it("should deactivate filter when active filter is clicked", () => {
    const props = buildProps({ data: minimum_test_data });
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

function buildProps(overrides: Partial<Props>): Props {
  return {
    ind_per_reg: [],
    treatment_units: [],
    selected_year: 2019,
    med_field,
    app_text,
    colspan: 1,
    data: buildGraphData({}),
    selected_row: null,
    update_selected_row: (row: any) => {},
    selection_bar_height: null,
    legend_height: null,
    update_legend_height: (height: any) => {},
    ...overrides,
  };
}

function buildAggData(overrides: Partial<AggData>): AggData {
  return {
    filtered_by_unit: [],
    filtered_by_year: [],
    nation: {
      filtered_by_unit: [],
      filtered_by_year: [],
    },
    ...overrides,
  };
}

function buildGraphData(overrides: Partial<GraphData>): GraphData {
  return {
    agg_data: buildAggData({}),
    description: [buildDescription({})],
    ...overrides,
  };
}
function buildStatisticData(overrides: Partial<StatisticData>): StatisticData {
  return {
    ind_id: "hjerneslag_beh_enhet",
    unit_level: "nation",
    unit_name: "faker",
    orgnr: 1,
    year: 2019,
    denominator: 9022,
    var: 0.9396,
    level: "H",
    level_direction: 1,
    dg: 0.8677,
    include: 1,
    ...overrides,
  };
}
function buildDescription(overrides: Partial<Description>): Description {
  return {
    id: "ind1",
    dg_id: "dummy_dg",
    include: 1,
    title: "HbA1c ≥ 9,0 %",
    name: "KiE",
    type: "andel",
    min_denominator: 10,
    level_green: null,
    level_yellow: 0.1,
    level_direction: 0,
    short_description: "Andel pasienter med HbA1c > 9,0",
    long_description: "Andel pasienter med HbA1c > 9,0",
    registry_id: 27,
    rname: "barnediabetes",
    full_name:
      "Nasjonalt medisinsk kvalitetsregister for barne- og ungdomsdiabetes",
    ...overrides,
  };
}

const minimum_test_data = {
  agg_data: {
    nation: {
      filtered_by_unit: [],
      filtered_by_year: [
        {
          ind_id: "ind1",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,
          year: 2019,
          denominator: 9022,
          var: 0.9396,
          level: "H",
          level_direction: 1,
          dg: 0.8677,
          include: 1,
        },
        {
          ind_id: "ind2",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,
          year: 2019,
          denominator: 7844,
          var: 0.2126,
          level: "M",
          level_direction: 1,
          dg: 0.8677,
          include: 1,
        },
        {
          ind_id: "ind3",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,
          year: 2019,
          denominator: 9022,
          var: 0.8549,
          level: "L",
          level_direction: 1,
          dg: 0.8677,
          include: 1,
        },
      ],
    },
    filtered_by_unit: [],
    filtered_by_year: [],
  },
  description: [
    {
      id: "ind1",
      dg_id: "dummy_dg",
      include: 1,
      title: "HbA1c ≥ 9,0 %",
      name: "KiE",
      type: "andel",
      min_denominator: 10,
      level_green: null,
      level_yellow: 0.1,
      level_direction: 0,
      short_description: "Andel pasienter med HbA1c > 9,0",
      long_description: "Andel pasienter med HbA1c > 9,0",
      registry_id: 27,
      rname: "barnediabetes",
      full_name:
        "Nasjonalt medisinsk kvalitetsregister for barne- og ungdomsdiabetes",
    },
    {
      id: "ind2",
      dg_id: "dummy_dg",
      include: 1,
      title: "HbA1c < 7,0 %",
      name: "KiC",
      type: "andel",
      min_denominator: 10,
      level_green: 0.4,
      level_yellow: 0.2,
      level_direction: 1,
      short_description: "Andel pasienter med HbA1c < 7,0 %",
      long_description: "Andel pasienter med HbA1c < 7,0 %",
      registry_id: 27,
      rname: "barnediabetes",
      full_name:
        "Nasjonalt medisinsk kvalitetsregister for barne- og ungdomsdiabetes",
    },
    {
      id: "ind3",
      dg_id: "dummy_dg",
      include: 1,
      title: "HbA1c < 7,5 %",
      name: "KiD",
      type: "andel",
      min_denominator: 10,
      level_green: 0.6,
      level_yellow: 0.4,
      level_direction: 1,
      short_description: "Andel pasienter med HbA1c < 7,5 %",
      long_description: "Andel pasienter med HbA1c < 7,5 %",
      registry_id: 27,
      rname: "barnediabetes",
      full_name:
        "Nasjonalt medisinsk kvalitetsregister for barne- og ungdomsdiabetes",
    },
  ],
};
