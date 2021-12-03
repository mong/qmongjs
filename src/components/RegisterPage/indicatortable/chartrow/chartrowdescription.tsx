import style from "./chartrowdescription.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  description_title?: string;
  description_text: string;
  delivery_time: Date;
}

const ChartRowDescription = ({
  description_text,
  description_title = "Om kvalitetsindikatoren",
  delivery_time,
}: Props) => {
  return (
    <div className={style.description_container}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className={style.description_title}>{description_title}</div>
        </AccordionSummary>
        <AccordionDetails>
          {description_text}
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
