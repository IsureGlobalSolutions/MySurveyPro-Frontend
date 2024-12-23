import React from 'react'
import { Navbarvalue } from '../../../context/NavbarValuesContext'
import HeroCards from '../../../components/HeroCards'
import OverAllRadialChat from './chart/OverAllRadialChat'
import OverAllFunnelChat from './chart/OverAllFunnelChat'

const index = () => {
      const { selectedDashboardValues, DashboardStateHandler } = Navbarvalue()

  return (
   <>
   <HeroCards/>
   <div className="row">
    <div className="col-md-6"> <OverAllFunnelChat/></div>
    <div className="col-md-6"><OverAllRadialChat/></div>
   
    
   </div>
   </>
  )
}

export default index