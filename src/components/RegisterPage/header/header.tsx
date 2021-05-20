import React from 'react'
import { NSMLogo } from './nsmlogo'
import { HeaderTabs } from './headertabs'

import style from './header.module.css'
export interface HeaderProps {
  tabNames?: string[],
  dataFrom?: string
}

export const Header: React.FC<HeaderProps> = (props) => {
  const {
    tabNames = [],
    dataFrom = "medisinske kvalitetsregistre"
  } = props

  return (
    <div className={style.headerOuterWrapper} >
      <div className={style.headerInnerWrapper}>
        <NSMLogo />
        <div className={style.headerText}><h3>Resultater fra {dataFrom}</h3></div>
        {
          tabNames.length > 1
            ? <HeaderTabs tabNames={tabNames} />
            : null
        }
      </div>
    </div>
  )
}
