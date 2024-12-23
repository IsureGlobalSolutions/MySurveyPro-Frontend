import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Topnavbar from './Topnavbar/Topnavbar'
import './Dashboard.css'
import DashboardScreen from './q12SruveyReportsScreen'
const index = () => {
  const [collapsed, setcollapsed] = useState(false)

  return (<>
   <div className='d-flex '>
     <div className={`${collapsed ? ' collapsedsidebar' : 'sidebar '}`}>
       <Sidebar  collapsed={collapsed} setcollapsed={setcollapsed}/>
       </div>
     <div className="sidbar-content-screen w-100" style={{backgroundColor:'#F5F5F5'}}>
     
          <Topnavbar/>
  
        
    
      <DashboardScreen/>
 


    </div>
   
    </div>






   
   
  </>
   





  )
}

export default index