import app_config from '../app_config'

const { data_config } = app_config

 export const filter_year_unit = (data, input_params) => {
  const {
    selected_unit,
    selected_year
  } = input_params

  const filtered_by_unit = selected_unit !== null ? 
    data.filter(
      d => selected_unit.includes(d[data_config.column.treatment_unit])
    ) : data
  

  const filtered_by_year = selected_year !== null ? 
  filtered_by_unit.filter(
      d => d[data_config.column.year] === selected_year
      ) : filtered_by_unit

  return({
    filtered_by_unit,
    filtered_by_year   
  });
}

export const filter_register = (data, register )=> {
  
 const description = data.description.filter(
   desc => desc[app_config.data_config.column.registry_short_name] === register
  )
  const indicator_name = description.map(
    desc => desc[app_config.data_config.column.id])
  const agg_data = {}
  agg_data.filtered_by_unit = data.agg_data.filtered_by_unit.filter(
    data => indicator_name.includes(data[app_config.data_config.column.indicator_id])
  )
  agg_data.filtered_by_year = data.agg_data.filtered_by_year.filter(
    data => indicator_name.includes(data[app_config.data_config.column.indicator_id])
  )
  const nation = {}
  nation.filtered_by_unit = data.agg_data.nation.filtered_by_unit.filter(
    data => indicator_name.includes(data[app_config.data_config.column.indicator_id])
  )
  nation.filtered_by_year = data.agg_data.nation.filtered_by_year.filter(
    data => indicator_name.includes(data[app_config.data_config.column.indicator_id])
  )
  agg_data.nation = nation
  return {agg_data, description};
}


