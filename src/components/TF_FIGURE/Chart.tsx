import React, { useCallback, useEffect } from "react";
import { UseQueryResult, useQueryClient } from "react-query";
import { Description, StatisticData } from "../../components/RegisterPage";

import BarChart, { Bar, BarStyle } from "../Charts/BarChart";
import LineChart, { DataPoint } from "../Charts/LineChart";
import { Level } from "../Charts/types";
import { useIndicatorQuery } from "../../helpers/hooks";

export interface Props {
  context: string;
  svgContainerRef: React.RefObject<HTMLDivElement>;
  chartType: "bar" | "line";
  description: Description;
  treatmentYear: number;
  indicatorData: StatisticData[];
  zoom: boolean;
  showLevel: boolean;
  levels: Level[];
  selectedTreatmentUnits: string[];
}

function Chart(props: Props) {
  switch (props.chartType) {
    case "line":
      return <GetLineChart {...props} />;
    case "bar":
      return <GetBarChart {...props} />;
  }
}

export default Chart;

const GetBarChart: React.FC<Props> = (props) => {
  const { description, indicatorData, treatmentYear } = props;

  const queryClient = useQueryClient();

  const registerShortName = description.rname ?? "";
  const barIndDataQuery: UseQueryResult<any, unknown> = useIndicatorQuery({
    queryKey: `indicatorDataBarChart`,
    registerShortName: registerShortName,
    unitLevel: "hospital",
    treatmentYear: treatmentYear,
    context: props.context,
  });
  const refetch = useCallback(() => {
    return queryClient.fetchQuery([
      "indicatorDataBarChart",
      registerShortName,
      props.context,
    ]);
  }, [queryClient, registerShortName, props.context]);

  useEffect(() => {
    refetch();
  }, [refetch, treatmentYear, props.context]);

  const nasjonaltIndData = [...indicatorData].filter(
    (d) => d.unit_name === "Nasjonalt"
  );
  const barChartData = [...(barIndDataQuery.data ?? []), ...nasjonaltIndData];

  const unitNames = props.selectedTreatmentUnits;
  const data = barChartData
    .filter(
      (data: StatisticData) =>
        !(
          data.ind_id !== props.description.id ||
          (data.dg ?? 1) < 0.6 ||
          data.denominator < (description.min_denominator ?? 5)
        )
    )
    .map((data: StatisticData) => {
      const style: BarStyle = {};
      if (data.unit_name === "Nasjonalt") {
        style.color = "#00263D";
      } else {
        style.color = "#7EBEC7";
        if (props.selectedTreatmentUnits.length > 1) {
          style.opacity = unitNames.includes(data.unit_name) ? 1 : 0.5;
        }
      }
      return {
        label: data.unit_name,
        value: data.var,
        style,
      };
    })
    .sort((a: Bar, b: Bar) => b.value - a.value);

  return <BarChart {...props} data={data ?? []} />;
};

const GetLineChart: React.FC<Props> = (props) => {
  const { description, selectedTreatmentUnits } = props;

  const queryClient = useQueryClient();
  const unitNameString = selectedTreatmentUnits.join();

  const registerShortName = description.rname ?? "";

  const lineChartQuery: UseQueryResult<any, unknown> = useIndicatorQuery({
    queryKey: `indicatorDatalineChart`,
    registerShortName: description.rname ?? "",
    unitNames: selectedTreatmentUnits,
    context: props.context,
  });
  const refetch = useCallback(() => {
    return queryClient.fetchQuery([
      "indicatorDatalineChart",
      registerShortName,
      props.context,
    ]);
  }, [queryClient, registerShortName, props.context]);

  useEffect(() => {
    refetch();
  }, [unitNameString, refetch, props.context]);

  const data: DataPoint[] = (lineChartQuery.data ?? [])
    .filter((data: StatisticData) => {
      if (data.unit_level !== "nation") {
        return !(
          data.ind_id !== props.description.id ||
          (data.dg ?? 1) < 0.6 ||
          data.denominator < (description.min_denominator ?? 5)
        );
      } else {
        return !(data.ind_id !== props.description.id || (data.dg ?? 1) < 0.6);
      }
    })
    .map((d: StatisticData) => ({
      label: d.unit_name,
      year: d.year,
      value: d.var,
    }));

  return <LineChart {...props} data={data} />;
};
