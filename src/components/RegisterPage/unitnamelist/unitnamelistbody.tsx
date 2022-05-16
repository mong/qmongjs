import React from "react";
import { app_text } from "../../../app_config";

export interface NestedTreatmentUnitName {
  rhf: string;
  hf: {
    hf: string;
    hf_full: string;
    hospital: string[];
  }[];
}

interface Props {
  tu_names: NestedTreatmentUnitName;
  treatment_units: string[];
  update_treatment_units: (arg: string[]) => void;
}

export const UnitNameListBody: React.FC<Props> = (props) => {
  const { tu_names, treatment_units, update_treatment_units } = props;
  const handle_tu_list_click = (
    selected_unit: string,
    treatment_units: string[],
    update_treatment_units: (arg: string[]) => void
  ) => {
    if (
      treatment_units.length < app_text.tu_list.max_nr_tu &&
      !treatment_units.includes(selected_unit)
    ) {
      update_treatment_units([...treatment_units, selected_unit]);
    } else if (treatment_units.includes(selected_unit)) {
      update_treatment_units(
        treatment_units.filter((tu) => tu !== selected_unit)
      );
    } else {
      alert(`maks ${app_text.tu_list.max_nr_tu} behandlingsenheter!`);
    }
  };
  /* Put Avtalespesialister to the end of HF array */
  const new_order_hf = tu_names.hf.sort((a, b) =>
    a.hf_full === "Avtalespesialister"
      ? 1
      : b.hf_full === "Avtalespesialister"
      ? -1
      : 0
  );

  const hf_hospital = new_order_hf.map((element) => {
    const hospital = element.hospital.map((hospital) => {
      const style_hospital = treatment_units.includes(hospital)
        ? { transform: "scale(1.05,1.1)", color: "#08418e" }
        : {};

      return (
        <button
          key={`hospital_${hospital}`}
          className="tu_list_hospital_btn"
          style={style_hospital}
          onClick={() =>
            handle_tu_list_click(
              hospital,
              treatment_units,
              update_treatment_units
            )
          }
        >
          {hospital}
        </button>
      );
    });
    const style_hf = treatment_units.includes(element.hf)
      ? {
          transform: "scale(1.05,1.1)",
          color: "#08418e",
        }
      : {};

    return (
      <div key={`hf_hospital_${element.hf}`} className={`tu_list_hf`}>
        <div className="tu_list_hf_btn_constainer">
          <button
            style={style_hf}
            className="tu_list_hf_btn"
            onClick={() =>
              handle_tu_list_click(
                element.hf,
                treatment_units,
                update_treatment_units
              )
            }
          >
            {element.hf_full}
          </button>
        </div>
        <div className="tu_list_hospital">{hospital}</div>
      </div>
    );
  });
  const style_rhf = treatment_units.includes(tu_names.rhf)
    ? {
        color: "#08418e",
        fontWeight: 600,
        textDecoration: "underline",
      }
    : {};
  return (
    <>
      <div className={`tu_list_rhf`}>
        <h3
          className="tu_list_rhf_header"
          onClick={() =>
            handle_tu_list_click(
              tu_names.rhf,
              treatment_units,
              update_treatment_units
            )
          }
        >
          <div className="tooltip" style={style_rhf}>
            {tu_names.rhf}
            <span className="tooltiptext" style={{ fontSize: "0.5em" }}>
              Velg {tu_names.rhf}
            </span>
          </div>
        </h3>
        <div className={`tu_list_rhf_content`}>
          <div className={`tu_list_hfs_in_rhf`}>{hf_hospital}</div>
        </div>
      </div>
    </>
  );
};

export default UnitNameListBody;
