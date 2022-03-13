import { useState, useLayoutEffect, useEffect } from "react"
import { Link } from "react-router-dom"

import { ReactComponent as More } from './more.svg'
import { ReactComponent as Clear } from './clear.svg'

import "./Tabs.scss"

const $window = window

type TP = {
    tabs?: any
    name: string
    active?: string | null
}

const allItem = {
    id: 0,
    name: "Все",
    normalized: '/'
}

export const Tabs: React.FC<TP> = ({ tabs, name, active = null }) => {
    const [showMore, setShowMore] = useState<boolean>(false)
    const [tabItems, setTabItems] = useState<any>(0)
    const [selected, setSelected] = useState<number>(0)
    const [currentSelect, setCurrentSelect] = useState<string>("")
    
    useLayoutEffect(() => {
        setTabItems(windowWidth())
        $window.addEventListener('resize', () => {
            setTabItems(windowWidth())
            return $window.removeEventListener('resize', () => setTabItems(windowWidth()))
        })
    }, [])

    useEffect(() => {
        active && setSelected(tabs.find((item: any) => item.name === active)?.id)
    }, [tabs]) //eslint-disable-line

    const handleTabsClick = (tab?: any, name?: any) => {
        setSelected(tab)
        setCurrentSelect(name)
        if(showMore) setShowMore(false)
    }
    const handleClick = () => setShowMore((state?: boolean) => !state)
    const handleClear = () => {
        setSelected(0)
        setCurrentSelect("")
    }
    const numberOfItems = showMore ? tabs.length : tabItems
    
    return (
        <div className="tabs tabs_first">
            <ul className="tabs__list">
                {[allItem, ...tabs].slice(0, numberOfItems).map((tab?: any) => (
                    <li key={tab.id} className={`tabs__item ${selected === tab.id ? "active" : ""}`} onClick={() => handleTabsClick(tab.id, tab.name)}>
                        <Link to={tab.id === 0
                            ? '/certificate'
                            : `/certificate?${name}_normalized=${tab.normalized}`}>{tab.name}
                        </Link>
                    </li>
                )
                )}
            </ul>
            <button onClick={handleClick} className="tabs__more">
                <More />
            </button>
            <ul className="tabs__list tabs__list_mobile">
                {currentSelect && <li className="tabs__selected active">{currentSelect} <Link to="/certificate"><button className="tabs__clear" onClick={handleClear}><Clear /></button></Link> </li>}
            </ul>
        </div>
    )
}

function windowWidth() {
    const width = $window.innerWidth
    if (width > 1381) return 10
    if (width < 1380 && width > 1025) return 8
    if (width < 1024 && width > 769) return 6
    if (width < 768) return 0
}