import { StatisticData, Description } from "../../components/RegisterPage";
import { GraphData } from "../../components/main_component";

//helper functions to filter data by achivment level(green, yellow or red)
const apply_filters = ({
  agg_data,
  description,
  show_level_filter,
  filter_level_only = false,
}: {
  agg_data: StatisticData[];
  description: Description[];
  show_level_filter: string;
  filter_level_only?: boolean;
}): StatisticData[] => {
  const filtered_by_threshold =
    filter_level_only ?? false
      ? agg_data
      : agg_data
          .filter((u) => {
            return (u.dg ?? 1) > 0.6;
          })
          .filter((u) => {
            return (
              u.denominator >
              (description[description.findIndex((d) => d.id === u.ind_id)]
                .min_denominator ?? 5)
            );
          });
  const filter_by_level = filtered_by_threshold.filter(
    (u) => u.level === show_level_filter
  );
  return filter_by_level;
};

export const filter_data = (
  data: GraphData,
  show_level_filter: string | undefined
): GraphData => {
  if (!show_level_filter) {
    return data;
  }

  const data_filtered = [
    apply_filters({
      agg_data: data.agg_data.filtered_by_year,
      description: data.description,
      show_level_filter,
    }),
    apply_filters({
      agg_data: data.agg_data.nation.filtered_by_year,
      description: data.description,
      show_level_filter,
      filter_level_only: true,
    }),
  ].sort((a, b) => b.length - a.length);

  const ind_ids_remaining = data_filtered
    .map((a) => Array.isArray(a) && a.map((u) => u.ind_id))
    .reduce((acc: string[], val) => acc.concat(val || []), [])
    .filter((v, i, a) => a.indexOf(v) === i);

  return {
    agg_data: {
      filtered_by_year: data.agg_data.filtered_by_year.filter((u) =>
        ind_ids_remaining.includes(u.ind_id)
      ),
      filtered_by_unit: data.agg_data.filtered_by_unit.filter((u) =>
        ind_ids_remaining.includes(u.ind_id)
      ),
      all_filtered_by_year: data.agg_data.all_filtered_by_year.filter((u) =>
        ind_ids_remaining.includes(u.ind_id)
      ),
      nation: {
        filtered_by_year: data.agg_data.nation.filtered_by_year.filter((u) =>
          ind_ids_remaining.includes(u.ind_id)
        ),
        filtered_by_unit: data.agg_data.nation.filtered_by_unit.filter((u) =>
          ind_ids_remaining.includes(u.ind_id)
        ),
      },
    },
    description: data.description.filter((d) =>
      ind_ids_remaining.includes(d.id)
    ),
  };
};

export default filter_data;
