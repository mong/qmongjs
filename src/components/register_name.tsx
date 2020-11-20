import React from "react";

interface Props {
  register_name: string;
  colspan: number;
  tr_register_name_class: string;
}

function REGISTER_NAME(props: Props) {
  const {
    register_name = "Nasjonalt hoftebruddregister",
    colspan = 2,
    tr_register_name_class = "register-row",
  } = props;
  return (
    <tr className={tr_register_name_class}>
      <td colSpan={colspan}>
        <h3 className="reg-name">{register_name}</h3>
      </td>
    </tr>
  );
}

export default REGISTER_NAME;
