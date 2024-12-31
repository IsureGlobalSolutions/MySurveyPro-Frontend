import { useState, useEffect } from 'react';
import './Sidebar.css';
import Dashboardicon from '../../../assets/dashboredsvg/dashboard.svg?react'
import Surveyicon from '../../../assets/dashboredsvg/surveyicon.svg?react'
import Surveylist from '../../../assets/dashboredsvg/Surveylist.svg?react'

import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Navbarvalue } from '../../../context/NavbarValuesContext';
import WebsiteButton from '../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import { Padding } from '@mui/icons-material';
import PaymentPlan from '../../../assets/Dashboredpng/paymentPlan.png'
const Sidebar = ({ collapsed, setcollapsed }) => {
    const dispatch = useDispatch()
    const { DashboardNavValues, updateDashbaordNavValues, startSurveyHandler, StapperHandler } = Navbarvalue()
    const { startSurveyStepper, } = Navbarvalue();
    const navigate = useNavigate()
    const location = useLocation();

    const handleButtonClick = (id) => {
        updateDashbaordNavValues(id);
    };

    const handleHamburgerClick = () => {
        setcollapsed(!collapsed);
    };

    const handleclosesidebar = () => {
        setcollapsed(!collapsed);
    };
    useEffect(() => {
        if (location.pathname === '/startsurvey') {
            updateDashbaordNavValues(1);
        }
    }, [location.pathname]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1100) {
                setcollapsed(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial state based on current window size

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setcollapsed]);

    const moveToHome = () => {
        StapperHandler(1)
        startSurveyHandler(false)
        navigate('/startsurvey')
        

    }
    return (
        <div>
            <div className='m-3 mt-1 sidebartitle  gap-2  d-flex justify-content-between'>
                {collapsed ? (
                    <span className="cross-icon" onClick={handleclosesidebar}>
                        <RxCross1 size={30} />
                    </span>
                ) : (
                    <>
       {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}> */}
  {/* Hamburger Icon in the first row */}
  {/* <span
    onClick={handleHamburgerClick}
    style={{ position: 'absolute', right: '10px', cursor: 'pointer' }}
  >
    <GiHamburgerMenu size={25} />
  </span> */}

  {/* Text in the second row */}
  
{/* </div> */}
                    </>
                )}
                                                {/* <Surveyicon className="icon-fill" /> */}
                                               {/* <div className={`mysurvey-logo ${collapsed ? 'collapsed ' : ' ' }`}>
                                               <h1
    // className=' '
    className={`${DashboardNavValues === 1 ? 'Mysurveypro mt-3': 'Mysurveypro-logo mt-3'}`}
    style={{ }}  // Adjust for spacing between the icon and text
    onClick={moveToHome}
  >
    Mysurveypro
  </h1>
                                               </div> */}
            </div>

            <div className={`container sidebarinner ${collapsed ? 'collapsed' : ''}`}>
                <div className='verticlenavbar d-flex flex-column'>
                <ul className={` ${DashboardNavValues === 1 ? 'Mysurveypro p-2 pe-0 ' : ''} mb-4`}>
                        <li
                            onClick={moveToHome}
                        >
                                <h1> Mysurveypro</h1>
                        </li>
                    </ul>
                    <ul className={` ${DashboardNavValues === 1 ? 'active-sidebar  ' : ''} mb-4`}>
                        <li
                            onClick={() => handleButtonClick(1)}
                        >
                            <Link className='d-flex sidbar-item-link justify-content-start gap-3 sidbar-text' to={'/startsurvey'}>
                                <Surveyicon className="icon-fill" />
                                <p>Start Survey</p>

                            </Link>
                        </li>
                    </ul>

                    <div className={`card-plan header border rounded-3 ${collapsed ? 'card-plan':' '}`}>
                        <div className={`${collapsed ? 'card-width' : ''}`}>
                            <div className="d-flex justify-content-start mb-2">
                                <img src={PaymentPlan} width={40} className='pt-3' alt="" />
                            </div>
                            <small className={`text-small ${collapsed ? 'collapsed' : ''}`} >Get more with a paid plan</small>

                            <li className='my-3'> <small className={`text-small-paragraph ${collapsed ? 'collapsed' : ''}`}>Use advanced question types</small></li>
                            <div className="d-flex justify-content-center">
                                <WebsiteButton className='py-1 px-2 mb-2' onClick={()=>navigate('/pricing')}> 
                                    <small>Plans</small></WebsiteButton>
                            </div>
                        </div>

                    </div>


                    
                </div>
            </div>
        </div>
    );
};
export default Sidebar;
