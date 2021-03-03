import React, { useState } from "react";
import { useQueryParam } from "use-query-params";
import { AggData, Description } from "../components/RegisterPage";
import { mainQueryParamsConfig } from "../app_config";

import INDICATOR_TABLE from "./indicator_table";
import SelectRegister from "./SelectRegister";
import LEGEND from "./legend";
import MED_FIELD from "./med_field";

import { filter_data } from "../helpers/functions";

export interface GraphData {
  agg_data: AggData;
  description: Description[];
}

export interface IndPerReg {
  registry_name: string;
  number_ind: number;
  indicators: Description[];
}

export interface Props {
  data: GraphData;
  med_field: any;
  app_text: any;
  ind_per_reg: IndPerReg[];
  treatment_units: string[];
  selected_year: number;
  colspan: number;
  selection_bar_height: number | null;
  legend_height: any;
  update_legend_height(height: any): void;
}

const Main = (props: Props) => {
  const {
    data,
    med_field,
    app_text,
    ind_per_reg,
    treatment_units,
    selected_year,
    colspan,
    selection_bar_height,
    legend_height,
    update_legend_height,
  } = props;
  const all_reg = ind_per_reg.map((reg) => reg.registry_name);
  const [show_level_filter, update_show_level_filter] = useQueryParam<
    string | undefined
  >("level", mainQueryParamsConfig.level);
  const [med_field_filter, update_med_field_filter] = useState(all_reg);
  const [clicked_med_field, update_clicked_med_field] = useQueryParam<
    string | undefined
  >("indicator", mainQueryParamsConfig.indicator);
  const filtered_data = filter_data(data, show_level_filter);

  //skriv om
  const registers = Array.from(
    new Set(
      data.description.map((d) => {
        return { registerShortName: d.rname, registerFullName: d.full_name };
      })
    )
  );

  const listOfRegisters = ind_per_reg
    .filter((reg) => reg.number_ind !== 0)
    .map((reg) => {
      return {
        registerShortName: reg.registry_name,
        registerFullName: reg.registry_name,
      };
    });
  listOfRegisters.forEach((dl) => {
    const reg = registers.filter(
      (d) => d.registerShortName === dl.registerShortName
    );
    dl.registerFullName = reg[0].registerFullName;
  });

  return (
    <>
      <LEGEND
        app_text={app_text}
        update_show_level_filter={update_show_level_filter}
        show_level_filter={show_level_filter}
        selection_bar_height={selection_bar_height}
        update_legend_height={update_legend_height}
        width="undefined"
      />
      <div className="content_container">
        <div className="med_field_container">
          <SelectRegister
            regNames={listOfRegisters}
            selection_bar_height={selection_bar_height}
          />
          <MED_FIELD
            ind_per_reg={ind_per_reg}
            med_field={med_field}
            update_med_field_filter={update_med_field_filter}
            clicked_med_field={clicked_med_field}
            update_clicked_med_field={update_clicked_med_field}
            selection_bar_height={selection_bar_height}
            legend_height={legend_height}
          />
        </div>
        <div className="main_table_container">
          <INDICATOR_TABLE
            data={filtered_data}
            treatment_unit_name={treatment_units}
            treatment_year={selected_year}
            ind_per_reg={ind_per_reg}
            colspan={colspan}
            med_field_filter={med_field_filter}
            show_level_filter={show_level_filter}
            selection_bar_height={selection_bar_height}
            legend_height={legend_height}
          />
        </div>
      </div>
    </>
  );
};

export default Main;
