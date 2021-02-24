export const mathClamp = (input: number, min: number, max: number) =>
  Math.max(min, Math.min(input, max));

export default mathClamp;
