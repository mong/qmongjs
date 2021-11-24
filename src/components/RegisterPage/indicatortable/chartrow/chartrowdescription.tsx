import style from "./chartrowdescription.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  description_title?: string;
  description_text: string;
}

const LONG_DESCRIPTION = (props: Props) => {
  const {
    description_title = "Om kvalitetsindikatoren",
    description_text = "Denne kvalitetsindikatoren er definert som andel pasienter med...",
  } = props;

  return (
    <div className={style.description_container}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className={style.description_title}>{description_title}</div>
        </AccordionSummary>
        <AccordionDetails>{description_text}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default LONG_DESCRIPTION;
