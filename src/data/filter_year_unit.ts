import { AggData, Description, StatisticData, TreatmentUnit } from "../App";
import app_config from "../app_config";

interface NestedTreatmentUnitName {
  rhf: string;
  hf: {
    hf: string;
    hf_full: string;
    hospital: string[];
  }[];
}
interface InputParams {
  selected_unit: string[];
  selected_year: number;
}

export const filter_year_unit = (
  data: StatisticData[],
  input_params: InputParams
) => {
  const { selected_unit = [], selected_year } = input_params;

  const filtered_by_unit = data.filter(
    (d) => selected_unit.includes(d.unit_name) // [data_config.column.treatment_unit]
  );

  const filtered_by_year = filtered_by_unit.filter(
    (d) => d.year === selected_year // [data_config.column.year]
  );

  return {
    filtered_by_unit,
    filtered_by_year,
  };
};

export const filter_register = (
  data: { agg_data: AggData; description: Description[] },
  register: any
) => {
  const description = data.description.filter(
    (desc: any) =>
      desc[app_config.data_config.column.registry_short_name] === register
  );
  const indicator_name = description.map(
    (desc: any) => desc[app_config.data_config.column.id]
  );
  const agg_data: any = {};
  agg_data.filtered_by_unit = data.agg_data.filtered_by_unit.filter(
    (data) => indicator_name.includes(data.ind_id) // [app_config.data_config.column.indicator_id]
  );
  agg_data.filtered_by_year = data.agg_data.filtered_by_year.filter(
    (data) => indicator_name.includes(data.ind_id) // [app_config.data_config.column.indicator_id]
  );
  agg_data.all_filtered_by_year = data.agg_data.all_filtered_by_year.filter(
    (data) => indicator_name.includes(data.ind_id) // [app_config.data_config.column.indicator_id]
  );
  const nation: any = {};
  nation.filtered_by_unit = data.agg_data.nation.filtered_by_unit.filter(
    (data: any) => indicator_name.includes(data.ind_id) // [app_config.data_config.column.indicator_id]
  );
  nation.filtered_by_year = data.agg_data.nation.filtered_by_year.filter(
    (data: any) => indicator_name.includes(data.ind_id) // [app_config.data_config.column.indicator_id]
  );
  agg_data.nation = nation;
  return { agg_data, description };
};

export const nest_tu_names = (tu_names: TreatmentUnit[]) => {
  tu_names.sort((a, b) => {
    return a.hospital > b.hospital ? 1 : a.hospital < b.hospital ? -1 : 0;
  });
  tu_names.sort((a, b) => {
    return a.hf_full > b.hf_full ? 1 : a.hf_full < b.hf_full ? -1 : 0;
  });
  tu_names.sort((a, b) => {
    return a.rhf > b.rhf ? 1 : a.rhf < b.rhf ? -1 : 0;
  });

  const nested_tu_names = tu_names.reduce((acc, cur) => {
    if (acc.length === 0 || acc.every((tu_entry) => tu_entry.rhf !== cur.rhf)) {
      const entry = {
        rhf: cur.rhf,
        hf: [
          {
            hf: cur.hf,
            hf_full: cur.hf_full,
            hospital: [cur.hospital],
          },
        ],
      };
      acc = [...acc, entry];
    } else {
      const hf_names = acc
        .filter((acc_data) => acc_data.rhf === cur.rhf)
        .map((data) => data.hf)
        .map((data) => data.map((d) => d.hf))
        .flat();

      if (!hf_names.includes(cur.hf)) {
        const hf_entry = {
          hf: cur.hf,
          hf_full: cur.hf_full,
          hospital: [cur.hospital],
        };
        acc.filter((acc_data) => acc_data.rhf === cur.rhf)[0].hf.push(hf_entry);
      } else {
        acc
          .filter((acc_data) => acc_data.rhf === cur.rhf)[0]
          .hf.filter((hf) => hf.hf === cur.hf)[0]
          .hospital.push(cur.hospital);
      }
    }
    return acc;
  }, [] as NestedTreatmentUnitName[]);

  return nested_tu_names;
};
