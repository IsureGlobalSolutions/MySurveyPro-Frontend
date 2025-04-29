import {  useEffect } from 'react';
import './Sidebar.css';
import Surveyicon from '../../../assets/dashboredsvg/surveyicon.svg?react'
import { RxCross1 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Logo from "../../../assets/svgs/logoWithTitle.svg?react";
import { Navbarvalue } from '../../../context/NavbarValuesContext';

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
        window.localStorage.setItem("survey-json", '');
        window.localStorage.setItem("updata-survey-id", '');
        

    }
    return (
        <div>
            <div className='m-3 mt-1 sidebartitle  gap-2  d-flex justify-content-between'>
                {collapsed ? (
                    <span className="cross-icon" onClick={handleclosesidebar}>
                        <RxCross1 size={30} />
                    </span>
                ) : ""}
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
                <ul className={`d-flex justify-content-center ${DashboardNavValues === 1 ? '  p-0 ' : ''} mb-4`}>
                        <li
                            onClick={moveToHome}
                        >
                              <Logo style={{width:"115px"}}/>
                        </li>
                    </ul>
                    <ul className={` ${DashboardNavValues === 1 ? 'active-sidebar  ' : ''} mb-4`}>
                        <li
                            onClick={() => handleButtonClick(1)}
                        >
                            <Link className='d-flex align-items-center sidbar-item-link justify-content-start gap-2 sidbar-text' to={'/startsurvey'} onClick={moveToHome}>
                                <Surveyicon className="icon-fill" />
                                <p>Start Survey</p>

                            </Link>
                        </li>
                    </ul>

                    <div className={`card-plan   ${collapsed ? 'card-plan':' '}`}>
                      
                        
                            <small className={`text-small ${collapsed ? 'collapsed' : ''}`} >Get more with a paid plan</small>
<br/>
                          <small className={`text-small-paragraph my-3 ${collapsed ? 'collapsed' : ''}`}>Use advanced question types</small>
                            <div className="d-flex justify-content-center">
                               
                                <button className="planButton" type='button' onClick={()=>navigate('/pricing')}>
                                    Get Plans Now
                                </button>
                            </div>
                       

                    </div>


                    
                </div>
            </div>
        </div>
    );
};
export default Sidebar;
