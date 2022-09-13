function install() {
  (window as any).indicator_hosp = require("./data/indicator_hosp.min.json");
  (window as any).indicator_hf = require("./data/indicator_hf.min.json");
  (window as any).indicator_rhf = require("./data/indicator_rhf.min.json");
  (window as any).indicator_nat = require("./data/indicator_nat.min.json");
  (window as any).description = require("./data/description.min.json");
  (window as any).tu_names = require("./data/tu_names.min.json");
}

export { install };
