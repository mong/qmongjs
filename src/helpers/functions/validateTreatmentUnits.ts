import { TreatmentUnit } from "../../components/RegisterPage";

export const validateTreatmentUnits = function (
  treatment_units: string[],
  valid_treatment_units: TreatmentUnit[]
) {
  return (
    (treatment_units
      ?.filter((x) =>
        valid_treatment_units.some(
          (tu) => [tu.hospital, tu.hf, tu.rhf].indexOf(x) !== -1
        )
      )
      .slice(0, 5) as string[]) || []
  );
};

export default validateTreatmentUnits;
