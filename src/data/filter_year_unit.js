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

export const nest_tu_names = (tu_names) => {
  const sorted_bu_hosp = tu_names.sort(function(a,b){
    const val = a.hospital > b.hospital ? 1:-1;
    return val;
  })
  const sorted_bu_hf = sorted_bu_hosp.sort(function(a,b){
    const val = a.hf > b.hf ? 1:-1;
    return val;
  })
  const sorted_bu_rhf = sorted_bu_hf.sort(function(a,b){
    const val = a.rhf > b.rhf ? 1:-1;
    return val;
  })
  
  const nested_tu_names = sorted_bu_rhf.reduce( (acc, cur) =>{
    if(acc.length === 0 || acc.every(tu_entry => tu_entry.rhf !== cur.rhf)) {
      const entry = {
        rhf: cur.rhf,
        hf: [{ 
          hf: cur.hf,
          hf_full: cur.hf_full,
          hospital: [cur.hospital]
        }]
      }
      acc = [...acc , entry]
    } else {
      const hf_names = acc.filter(acc_data=> acc_data.rhf === cur.rhf)
        .map(data => data.hf)
        .map(data => data.map(d=>d.hf)).flat()
  
      if(!hf_names.includes(cur.hf)){
        const hf_entry = { 
          hf: cur.hf,
          hf_full: cur.hf_full,
          hospital: [cur.hospital]
        }
        acc.filter(acc_data=> acc_data.rhf === cur.rhf)[0].hf.push(hf_entry) 
      } else {
         acc.filter(acc_data => acc_data.rhf === cur.rhf)[0].hf.filter(hf => hf.hf === cur.hf)[0].hospital.push(cur.hospital)
      }
    } 
    return(acc)
  }, [] )
 
  return nested_tu_names;
}
