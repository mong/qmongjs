import style from "./chartrowdescription.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Level } from "../../../Charts/types";

interface Props {
  description_title?: string;
  description_text: string;
  delivery_time: Date;
  levels: Level[];
}


const ChartRowDescription = ({
  description_text,
  description_title = "Om kvalitetsindikatoren",
  delivery_time,
  levels,
}: Props) => {
  console.log(levels);
  return (
    <div className={style.description_container}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className={style.description_title}>{description_title}</div>
        </AccordionSummary>
        <AccordionDetails>
          {description_text}
          <p>
            Grønt målnivå over {Math.round(levels[0].end*100)} %
            <br />
            Rødt målnivå under {Math.round(levels[2].start*100)} %
          </p>
          <p>
            Data ble sist oppdatert{" "}
            {delivery_time.toLocaleString("no-NO", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "CET",
            })}{" "}
          </p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ChartRowDescription;
