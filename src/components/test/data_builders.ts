import type {
  Description,
  RegisterNames,
  StatisticData,
} from "../../components/RegisterPage";
import { app_text } from "../../app_config";
import type { GraphData, Props } from "../RegisterPage/main_component";
import desc from "../../dev-tools/data/description.min.json";
import ind from "../../dev-tools/data/indcator_all.min.json";
import medicalFeild from "../../dev-tools/data/medicalfields.json";
import unitNames from "../../dev-tools/data/unitnames.json";
import registerNames from "../../dev-tools/data/registernames.json";

export function buildMainProps(overrides: Partial<Props>): Props {
  return {
    context: "sykehus",
    optstu: [],
    treatment_units: [],
    selected_year: 2019,
    app_text,
    colspan: 1,
    selection_bar_height: null,
    legend_height: null,
    registerNames: [],
    update_legend_height: (height: any) => {},
    ...overrides,
  };
}
interface AggData {
  nation: {
    filtered_by_unit: StatisticData[];
    filtered_by_year: StatisticData[];
  };
  filtered_by_unit: StatisticData[];
  filtered_by_year: StatisticData[];
  all_filtered_by_year: StatisticData[];
}

export function buildAggData(overrides: Partial<AggData>): AggData {
  return {
    filtered_by_unit: [],
    filtered_by_year: [],
    nation: {
      filtered_by_unit: [],
      filtered_by_year: [],
    },
    all_filtered_by_year: [],
    ...overrides,
  };
}
export function buildGraphData(overrides: Partial<GraphData>): GraphData {
  return {
    agg_data: buildAggData({}),
    description: [buildDescriptionData({})],
    ...overrides,
  };
}
export function buildStatisticData(
  overrides: Partial<StatisticData>
): StatisticData {
  return {
    id: 1001,
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
    type: "andel",
    delivery_time: new Date("October 13, 2014 11:13:00"),
    delivery_latest_affirm: new Date("October 13, 2014 11:13:00"),
    ...overrides,
  };
}
export function buildDescriptionData(
  overrides: Partial<Description>
): Description {
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
    sformat: ",.0%",
    max_value: null,
    min_value: null,
    ...overrides,
  };
}

interface MockDescriptionParams {
  register: string;
  type?: "ind" | "dg";
}

export const buildDescriptions = ({
  register,
}: MockDescriptionParams): Description[] => {
  return desc.filter((d) => d.rname === register && d.include === 1);
};

interface MockIndicatorParams {
  register: string;
  year?: number;
  type?: "ind" | "dg";
  unitNames?: string[];
  unitLevel?: string;
}

export const buildIndicators = ({
  register,
  type = "ind",
  year,
  unitLevel,
  unitNames,
}: MockIndicatorParams): StatisticData[] => {
  const registerIndicators = buildDescriptions({ register, type }).map(
    (descData) => descData.id
  );

  let filteredIndicatorData: StatisticData[] = ind.filter((data) =>
    registerIndicators.includes(data.ind_id)
  );

  if (year) {
    filteredIndicatorData = filteredIndicatorData.filter(
      (data) => data.year === year
    );
  }

  if (unitNames) {
    filteredIndicatorData = filteredIndicatorData.filter((data) =>
      unitNames.includes(data.unit_name)
    );
  }
  if (unitLevel) {
    filteredIndicatorData = filteredIndicatorData.filter(
      (data) => data.unit_level === unitLevel
    );
  }

  return filteredIndicatorData;
};

export const buildRegisterNames = (): RegisterNames[] => {
  const registryInfo: RegisterNames[] = registerNames.map((reg) => {
    return {
      ...reg,
      caregiver_data: 1,
      resident_data: 1,
      dg_data: 1,
    };
  });

  return registryInfo;
};

export const buildMedicalFields = () => {
  return medicalFeild;
};

export const buildUnitNames = () => {
  return unitNames;
};
