import { useRef, useEffect } from "react";

import LEGEND_BTN from "./button";

import { useResizeObserver } from "../../helpers/hooks";

function LEGEND(props) {
  const {
    app_text = {
      indicators: {
        high: { text: "Høy måloppnåelse", icon: "fa fa-fas fa-circle" },
      },
    },
    update_show_level_filter,
    show_level_filter,
    selection_bar_height,
    update_legend_height,
    width = "84%",
  } = props;
  const legend_ref = useRef();
  const dim = useResizeObserver(legend_ref);
  useEffect(() => {
    const top = dim ? dim.target.offsetHeight : "";
    update_legend_height(top);
  }, [dim, legend_ref, update_legend_height]);

  const legend_btns = Object.keys(app_text.indicators).map(function (level) {
    return (
      <LEGEND_BTN
        update_show_level_filter={update_show_level_filter}
        show_level_filter={show_level_filter}
        key={`${level}_legend_btn`}
        icon_class={this[level].icon}
        level={this[level].text}
        legend_btn_class={level}
      />
    );
  }, app_text.indicators);

  const style = { top: `${selection_bar_height}px`, width };

  return (
    <div className="table_legend" ref={legend_ref} style={style}>
      {legend_btns}
    </div>
  );
}

export default LEGEND;
