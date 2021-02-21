import express, { RequestHandler } from "express";
import cors from "cors";
import * as Description from "./controllers/Description";
import * as Indicator from "./controllers/Indicator";
import * as Legacy from "./controllers/Legacy";
import * as TuName from "./controllers/TuName";

const PORT = process.env.PORT ?? 4000;

const app = express();

app.use(cors());

const BROWSER_MAX_AGE = 60 * 60 * 24;
const CDN_MAX_AGE = 60 * 60 * 24 * 365;
const cache: RequestHandler = (req, res, next) => {
  res.set(
    "cache-control",
    `public, max-age=${BROWSER_MAX_AGE}, s-maxage=${CDN_MAX_AGE}`
  );
  next();
};

// Routes
app.get("/", (_, res) => res.json({ status: "OK" }));
app.get("/description", cache, Description.index);
app.get("/indicator", cache, Indicator.index);
app.get("/legacy", cache, Legacy.index);
app.get("/tu_name", cache, TuName.index);

app.listen(PORT, () => {
  console.log(`API listening at http://localhost:${PORT}`);
});
