import { useState, useEffect } from 'react';
import './Sidebar.css';
import Dashboardicon from '../../../assets/dashboredsvg/dashboard.svg?react'
import Surveyicon from '../../../assets/dashboredsvg/surveyicon.svg?react'
import Surveylist from '../../../assets/dashboredsvg/Surveylist.svg?react'

import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Navbarvalue } from '../../../context/NavbarValuesContext';

const Sidebar = ({ collapsed, setcollapsed }) => {
    const dispatch = useDispatch()
    const { DashboardNavValues, updateDashbaordNavValues } = Navbarvalue()

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
        // Update DashboardNavValues based on the current pathname
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

    return (
        <div>
            <div className='m-4 sidebartitle  gap-2  d-flex justify-content-between'>
                {collapsed ? (
                    <span className="cross-icon" onClick={handleclosesidebar}>
                        <RxCross1 size={30} />
                    </span>
                ) : (
                    <>
                        <h1>SurveyPro</h1>
                        <span onClick={handleHamburgerClick}>
                            <GiHamburgerMenu size={25} />
                        </span>
                    </>
                )}
            </div>

            <div className={`container sidebarinner ${collapsed ? 'collapsed' : ''}`}>
                <div className='verticlenavbar d-flex flex-column'>
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
                
                   
                   
                   
                </div>
            </div>
        </div>
    );
};
export default Sidebar;
