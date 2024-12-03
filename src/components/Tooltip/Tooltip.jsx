import React  from 'react'
import './tooltip.css'
const Tooltip = ({children,text,...props}) => {
  return (
    <>
    <div className="tooltip-container" >
        {children}
    <div className="tooltip-text" {...props} >{text}</div>
    </div>
    </>
  )
}

export default Tooltip