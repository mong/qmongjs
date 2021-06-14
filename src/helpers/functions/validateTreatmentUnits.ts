export const validateTreatmentUnits = function (
  treatment_units: string[],
  valid_treatment_units: {
    label: string;
    options: { value: string; label: string }[];
  }[]
) {
  if (!treatment_units || valid_treatment_units.length === 0) {
    return [];
  }
  const unitsHosp = treatment_units
    .filter((unit) => {
      const hosp = valid_treatment_units
        .filter((opts) => opts.label === "Sykehus")
        .map((validHosp) =>
          validHosp.options.map((hospName) => hospName.value)
        );
      return hosp[0].includes(unit);
    })
    .sort();

  const unitsHF = treatment_units
    .filter((unit) => {
      const HF = valid_treatment_units
        .filter((opts) => opts.label === "HF")
        .map((validHF) => validHF.options.map((HFName) => HFName.value));
      return HF[0].includes(unit);
    })
    .sort();
  const unitsRHF = treatment_units
    .filter((unit) => {
      const rhf = valid_treatment_units
        .filter((opts) => opts.label === "RHF")
        .map((validRHF) => validRHF.options.map((RHFName) => RHFName.value));
      return rhf[0].includes(unit);
    })
    .sort();
  const unitsOut = unitsHosp.concat(unitsHF, unitsRHF);

  return unitsOut;
};

export default validateTreatmentUnits;
