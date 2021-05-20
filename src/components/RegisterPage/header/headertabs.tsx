import React, { useEffect, useState, useRef, Dispatch } from 'react'
import { useResizeObserver } from '../../../helpers/hooks'

import style from './headertabs.module.css'

export interface HeaderTabProps {
  tabNames: string[]
}


export const HeaderTabs: React.FC<HeaderTabProps> = ({ tabNames }) => {

  const [highlighterWidth, sethighlighterWidth] = useState<number | null>(null)
  const [highlighterLeft, sethighlighterLeft] = useState<number | null>(null)
  const [activTab, setActiveTab] = useState(tabNames[0])



  const tabs = tabNames.map((tab, i) => {
    return <Tab
      tabName={tab}
      activeTab={activTab}
      setActiveTab={setActiveTab}
      setHighlighterLeft={sethighlighterLeft}
      setHighlighterWidth={sethighlighterWidth}
      key={`${tab.replace(/\s/g, '')}${i}`}
    />
  })



  return (
    <div className={style.tabs}>
      <div className={style.tabsWrapper}>
        <ul className={style.tabsUL}>
          {tabs}
        </ul>
      </div>
      <div
        style={{ width: `${highlighterWidth}px`, left: `${highlighterLeft}px` }}
        className={style.highlighter}
      >
      </div>
    </div>
  )
}

interface TabProps {
  tabName: string;
  activeTab: string;
  setActiveTab: Dispatch<string>;
  setHighlighterWidth: Dispatch<number | null>;
  setHighlighterLeft: Dispatch<number | null>;
}

const Tab: React.FC<TabProps> = ({
  tabName,
  activeTab,
  setActiveTab,
  setHighlighterLeft,
  setHighlighterWidth
}) => {
  const tabRef = useRef(null)
  const tabDim = useResizeObserver(tabRef);
  useEffect(() => {
    if (!tabDim) {
      return
    }
    if (tabName === activeTab) {
      const width = tabDim.target.getBoundingClientRect().width
      const left = tabDim.target.getBoundingClientRect().left
      setHighlighterLeft(left)
      setHighlighterWidth(width)
    }
  })
  const clickedStyle = activeTab === tabName ? { color: "#6da7df" } : {}

  const tabclickHandler = () => setActiveTab(tabName)

  return (
    <li
      ref={tabRef}
      className={style.tabsLI}
    >
      <button
        onClick={() => tabclickHandler()}
        style={clickedStyle}
        className={style.tabsBtn}
      >
        {tabName}
      </button>
    </li>
  );

}