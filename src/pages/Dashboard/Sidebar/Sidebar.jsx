import {  useEffect } from 'react';
import './Sidebar.css';
import Surveyicon from '../../../assets/dashboredsvg/surveyicon.svg?react'
import { RxCross1 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Logo from "../../../assets/svgs/logoWithTitle.svg?react";
import { Navbarvalue } from '../../../context/NavbarValuesContext';
import PlanCardIcon from '../../../assets/dashboredsvg/planCardIcon.svg?react';
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
            else if (window.innerWidth > 1100) {
                setcollapsed(false);
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
                                   
            </div>

            <div className={` sidebarinner ${collapsed ? 'collapsed' : ''}`}>
                <div className='verticlenavbar d-flex flex-column  justify-content-between align-items-center'>    
                <ul className={`d-flex justify-content-center ${DashboardNavValues === 1 ? '  p-0 ' : ''} mb-4`}>
                        <li
                            onClick={moveToHome}
                        >
                              <Logo className="sidebar-logo" />
                        </li>
                    </ul>
                    <ul className={` ${DashboardNavValues === 1 ? 'active-sidebar  w-100' : ''} mb-4`}>
                        <li
                            onClick={() => handleButtonClick(1)}
                        >
                            <Link className='d-flex align-items-center sidbar-item-link  gap-2 sidbar-text' to={'/startsurvey'} onClick={moveToHome}>
                                <Surveyicon className="icon-fill" />
                                <p className='m-0 start-survey-text'>Start Survey</p>

                            </Link>
                        </li>
                    </ul>

                    <div className={`card-plan   ${collapsed ? 'card-plan':' '}`}>
                      
                        <div className='card-pan-vector '>
                            <PlanCardIcon className="plan-card-icon" />
                        </div>
                        <div>
                                              <p className={` text-center mb-1 text-small ${collapsed ? 'collapsed' : ''}`}>Get more with a paid plan</p> 
<p  className={`text-small-paragraph mb-1 ${collapsed ? 'collapsed' : ''}`}>Use advanced question types</p>
                        </div>
         
                          
                            <div className="d-flex justify-content-center mb-3">
                               
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
