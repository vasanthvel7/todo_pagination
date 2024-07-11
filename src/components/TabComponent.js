import React from 'react'
import classes from "./Tab.module.css"

function TabComponent({active_tab = 1,onChange}) {
  // const [ActivTab, setActivTab] = useState(1)
  return (
    <div className={classes.mainContainer}>
      <div className={`${classes.tabitem} ${active_tab === 1 ? classes.active : ""}`} onClick={() => {
        onChange(1)
      }}>
        Pagination
      </div>
      <div className={`${classes.tabitem} ${active_tab === 2 ? classes.active : ""}`} onClick={() => {
        onChange(2)
      }}>
        MapSec
      </div>
    </div>
  )
}

export default TabComponent