import React from 'react'

const HEADER_TEXT = () => {
  const text = "Her får du en samlet oversikt over kvalitetsindikatorer fra medisinske kvalitetsregistre tilknyttet hver helseregion, helseforetak og hvert enkelt sykehus. I tillegg til å se alle kvalitetsindikatorer for hvert enkelt sykehus kan du sortere på ulike fagområder."

  return(
    <p className = "header_text">
      {text}
    </p>
  )
}
export default HEADER_TEXT;