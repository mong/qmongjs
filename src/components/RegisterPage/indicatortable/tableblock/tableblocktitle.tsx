import React from "react";
import style from './tableblocktitle.module.css'

interface BlockTitleProps {
  title: string;
  colspan: number;
  tr_register_name_class: string;
}

export const TableBlockTitle: React.FC<BlockTitleProps> = (props) => {
  const {
    title = "Nasjonalt hoftebruddregister",
    colspan = 2,
    tr_register_name_class = "register-row",
  } = props;
  return (
    <tr className={`${style.titleRow} ${tr_register_name_class}`}>
      <td colSpan={colspan}>
        <h3 className={style.title}>{title}</h3>
      </td>
    </tr >
  );
}

export default TableBlockTitle;