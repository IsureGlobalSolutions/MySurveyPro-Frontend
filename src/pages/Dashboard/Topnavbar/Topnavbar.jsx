import React, { useEffect, useState } from 'react'
import SearchIcon from '../../../assets/dashboredsvg/megnifer.svg?react'
import NotificationIcon from '../../../assets/dashboredsvg/notification.svg?react'
import porfileimage from '../../../assets/dashboredsvg/person_4.jpg'
import {Link} from 'react-router-dom'
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Topnavbar.css'
import { useDispatch, useSelector } from 'react-redux'
const Topnavbar = () => {

const {Profiledata} =useSelector((state)=>state.user)

  const dispatch = useDispatch()
    const [isActive, setIsActive] = useState(false);
  
    const handleToggle = (isOpen) => {
      setTimeout(() => {
        setIsActive(isOpen);
      }, 100);
    }




  return (
   <>
   <div className="topnavbar-main-container">
    <div className="screen-name ">
      <div className="main-navigater"><p className=' ms-3 m-0'>Pages/ Dashboard</p></div>
      <div className="screen-title">  <p className=" m-0 ms-3" >Main Dashboard</p></div>
    
    </div>
    <div className="profile-section">
      {/* <div className="topnav-search">
        <div className="topnav-input-main">
            <SearchIcon/>
           <input type="search" 
           placeholder='Search here...'
           className='topnavbar-input' />
        </div>
       
      </div> */}
      <div className="topnav-profile">
    {/* <NotificationIcon/> */}

    <Dropdown onToggle={handleToggle} className="custom-dropdown">
      <Dropdown.Toggle as="a" href="#" className="d-flex align-items-center gap-3 dropdown-link text-left">
        <div className="profile-pic mr-3" style={{width:'50px',height:'50px'}}>
          <img className='topnav-img' src={Profiledata?.imagePath? Profiledata?.imagePath: porfileimage} alt="Image" style={{height:'100%',width:'100%'}} />
        </div>
        <div className="profile-info">
          <h3>{Profiledata? `${Profiledata.firstName} ${Profiledata?.lastName}`:'No Name'} </h3>
          <span>Admin</span>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className={isActive ? 'dropdown-menu active' : 'dropdown-menu'}>
        <Dropdown.Item href="#"><span className="icon icon-dashboard"></span> <Link className=" sidbar-item-link  ps-0" to="/profile">Profile</Link></Dropdown.Item>
        <Dropdown.Item href="#"><span className="icon icon-cog"></span><Link className=" sidbar-item-link  ps-0" to="/setting" >Setting</Link> </Dropdown.Item>
        <Dropdown.Item href="#"><span className="icon icon-sign-out"></span> <Link className=" sidbar-item-link  ps-0" to="/signout" >Log out</Link> </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>


      </div>
    </div>
   </div>
   </>
  )
}

export default Topnavbar