import { UseQueryResult } from "react-query";
import { Description, StatisticData } from "../../RegisterPage";

import BarChart, { Bar, BarStyle } from "../../Charts/BarChart";
import LineChart, { DataPoint } from "../../Charts/LineChart";
import { Level } from "../../Charts/types";
import { useIndicatorQuery } from "../../../helpers/hooks";

interface Props {
  context: { context: string; type: string };
  svgContainerRef: React.RefObject<HTMLDivElement>;
  chartType: "bar" | "line";
  description: Description;
  treatmentYear: number;
  indicatorData: StatisticData[];
  zoom: boolean;
  showLevel: boolean;
  levels: Level[];
  tickformat?: string;
  selectedTreatmentUnits: string[];
  max_value?: number;
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
  const registerShortName = description.rname ?? "";
  const {
    isLoading,
    error,
    data: indQryData,
  } = useIndicatorQuery({
    registerShortName: registerShortName,
    treatmentYear: treatmentYear,
    context: props.context.context,
    type: props.context.type,
  });

  if (isLoading) return <>Loading...</>;
  if (error) return <>An error has occured: {error.message}</>;

  // only keep data for given indicator
  const allIndicatorData = [...(indQryData ?? [])].filter(
    (data: StatisticData) => data.ind_id === props.description.id
  );

  const showUnits = () => {
    // Show HF if there is less hospitals than HF
    // Show RHF if there is less HF than RHF
    const hospitalData = allIndicatorData.filter(
      (data: StatisticData) => data.unit_level === "hospital"
    );
    const hfData = allIndicatorData.filter(
      (data: StatisticData) => data.unit_level === "hf"
    );
    const rhfData = allIndicatorData.filter(
      (data: StatisticData) => data.unit_level === "rhf"
    );

    return {
      hf: hospitalData.length < hfData.length,
      rhf: hfData.length < rhfData.length,
    };
  };

  // Units selected by user
  const unitNames = props.selectedTreatmentUnits;

  const filterData = (data: StatisticData[]) => {
    const filtered = data
      .filter(
        (data: StatisticData) =>
          data.ind_id === props.description.id &&
          ((data.dg ?? 1) >= 0.6 || data.unit_name === "Nasjonalt") &&
          data.denominator >= (description.min_denominator ?? 5)
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
    return filtered ?? [];
  };

  const filterAllData = allIndicatorData.filter(
    (data: StatisticData) =>
      !(
        // filter out data already selected by user
        (
          unitNames.includes(data.unit_name) ||
          // filter out HF if showHF() is false
          (data.unit_level === "hf" && !showUnits().hf) ||
          // filter out RHF if showRHF() is false
          (data.unit_level === "rhf" && !showUnits().rhf)
        )
      )
  );

  const barChartData = [...filterAllData, ...indicatorData];

  return <BarChart {...props} data={filterData(barChartData)} />;
};

const GetLineChart: React.FC<Props> = (props) => {
  const { description, selectedTreatmentUnits } = props;

  const lineChartQuery: UseQueryResult<any, unknown> = useIndicatorQuery({
    registerShortName: description.rname ?? "",
    unitNames: selectedTreatmentUnits,
    context: props.context.context,
    type: props.context.type,
  });

  // get the last year with complete data
  const lastCompleteYear: number | undefined = lineChartQuery.data
    ? lineChartQuery.data[0].delivery_latest_affirm
      ? new Date(lineChartQuery.data[0].delivery_latest_affirm).getFullYear() -
        1
      : undefined
    : undefined;

  const data: DataPoint[] = (lineChartQuery.data ?? [])
    .filter(
      (data: StatisticData) =>
        data.ind_id === props.description.id &&
        ((data.dg ?? 1) >= 0.6 || data.unit_name === "Nasjonalt") &&
        data.denominator >= (description.min_denominator ?? 5)
    )
    .map((d: StatisticData) => ({
      ...d,
      label: d.unit_name,
      value: d.var,
    }))
    .sort((a: StatisticData, b: StatisticData) => b.year - a.year);

  return (
    <LineChart {...props} data={data} lastCompleteYear={lastCompleteYear} />
  );
};
