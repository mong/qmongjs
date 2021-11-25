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

const ChartRowDescription = (props: Props) => {
  const {
    description_title = "Om kvalitetsindikatoren",
    description_text = "Denne kvalitetsindikatoren er definert som andel pasienter med...",
    delivery_time = new Date("1999-12-31T23:59:59.999Z"),
  } = props;

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
            })}{" "}
          </p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ChartRowDescription;
