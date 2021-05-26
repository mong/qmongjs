import React from "react";
import { Link } from "react-router-dom";
import style from "./tableblocktitle.module.css";

interface BlockTitleProps {
  link?: string;
  title: string;
  colspan: number;
  tr_register_name_class: string;
}

export const TableBlockTitle: React.FC<BlockTitleProps> = (props) => {
  const {
    link = "",
    title = "Nasjonalt hoftebruddregister",
    colspan = 2,
    tr_register_name_class = "register-row",
  } = props;
  return (
    <tr className={`${style.titleRow} ${tr_register_name_class}`}>
      <td colSpan={colspan}>
        <Link to={`/kvalitetsregistre/${link}`}>
          <h3 className={style.title}>{title}</h3>
        </Link>
      </td>
    </tr>
  );
};

export default TableBlockTitle;
