export const fixed_header = function() {
  document.getElementById("quality_overview_ui_1-pick_treatment_units").onchange = function (){
    var top_nav_bar = document.querySelector(".treatment_unit");
    var bottom_tu = top_nav_bar.clientHeight;
    var top_tu = bottom_tu - 20;
    top_nav_bar.setAttribute("style", "top:" + -top_tu + "px;");

  };

  document.querySelector(".treatment_unit").onmouseenter = function (){
  var top_nav_bar = document.querySelector(".treatment_unit");
  top_nav_bar.setAttribute("style", "top:-10px;");
  };
  document.querySelector(".treatment_unit").onmouseleave = function (){
    var top_nav_bar = document.querySelector(".treatment_unit");
    var bottom_tu = top_nav_bar.clientHeight;
    var top_tu = bottom_tu - 20;
    top_nav_bar.setAttribute("style", "top:" + -top_tu + "px;");
  };
}