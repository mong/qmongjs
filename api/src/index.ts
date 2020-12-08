import express from "express";
import cors from "cors";
import cache from "./cache";
import * as Description from "./controllers/Description";
import * as Indicator from "./controllers/Indicator";
import * as Legacy from "./controllers/Legacy";
import * as TuName from "./controllers/TuName";

const PORT = 4000;

const app = express();

app.use(cors());

// Routes
app.get("/description", cache(), Description.index);
app.get("/indicator", cache(), Indicator.index);
app.get("/legacy", cache(), Legacy.index);
app.get("/tu_name", cache(), TuName.index);

app.listen(PORT, () => {
  console.log(`API listening at http://localhost:${PORT}`);
});
