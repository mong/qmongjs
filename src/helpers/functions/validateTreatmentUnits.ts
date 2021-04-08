export const validateTreatmentUnits = function (
  treatment_units: string[],
  valid_treatment_units: {
    label: string;
    options: { value: string; label: string }[];
  }[]
) {
  return (
    (treatment_units
      ?.filter((x) =>
        valid_treatment_units.some((tu) =>
          tu.options.map((unit) => unit.value === x).some((x) => x)
        )
      )
      .slice(0, 5) as string[]) || []
  );
};

export default validateTreatmentUnits;
