import React from "react";

import { app_text } from "../app_config";

const TU_LIST_HEADER = () => {
  return (
    <h2 className={`tu_list_header`}>
      {`${app_text.tu_list.header_text} (maks ${app_text.tu_list.max_nr_tu})`}
    </h2>
  );
};

export default TU_LIST_HEADER;
