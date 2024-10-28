import { useState, useEffect } from 'react';
import './Sidebar.css';
import Dashboardicon from '../../../assets/dashboredsvg/dashboard.svg?react'
import Surveyicon from '../../../assets/dashboredsvg/surveyicon.svg?react'
import Surveylist from '../../../assets/dashboredsvg/Surveylist.svg?react'
import Pricing from '../../../assets/dashboredsvg/pricing.svg?react'
import Setting from '../../../assets/dashboredsvg/setting.svg?react'
import Signout from '../../../assets/dashboredsvg/signout.svg?react'
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
        if (location.pathname === '/Dashboard') {
            updateDashbaordNavValues(1);
        } else if (location.pathname === '/startsurvey') {
            updateDashbaordNavValues(2);
        } else if (location.pathname === '/surveylist') {
            updateDashbaordNavValues(3);
        }
        else if (location.pathname === '/q12template') {
            updateDashbaordNavValues(3);
        }
        else if (location.pathname === '/pricing') {
            updateDashbaordNavValues(4);
        } else if (location.pathname === '/setting') {
            updateDashbaordNavValues(5);
        } else if (location.pathname === '/signout') {
            updateDashbaordNavValues(6);
        }

        else {
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
                    <ul className={` ${DashboardNavValues === 1 ? 'active  ' : ''} mb-4`}>
                        <li

                            onClick={() => handleButtonClick(1)}
                        >
                            <Link className='d-flex sidbar-item-link justify-content-start gap-3 ms-1' to={'/Dashboard'}>
                                <Dashboardicon className="icon-stroke " />
                                <p>Dashboard</p>
                            </Link>

                        </li>
                    </ul>
                    <ul className={` ${DashboardNavValues === 2 ? 'active' : ''} mb-4`}>
                        <li

                            onClick={() => handleButtonClick(2)}
                        >
                            <Link className='d-flex sidbar-item-link justify-content-start gap-3' to={'/startsurvey'}>
                                <Surveyicon className="icon-fill" />
                                <p>Start Survey</p>

                            </Link>

                        </li>
                    </ul>
                    <ul className={` ${DashboardNavValues === 3 ? 'active' : ''} mb-4`}>
                        <li

                            onClick={() => handleButtonClick(3)}
                        >
                            <Link className='d-flex sidbar-item-link justify-content-start gap-3' to={'/surveylist'}>
                                <Surveylist className="icon-stroke" />
                                <p>Survey’s List</p>
                            </Link>

                        </li>
                    </ul>
                    <ul className={` ${DashboardNavValues === 4 ? 'active' : ''} mb-4`}>
                        <li

                            onClick={() => handleButtonClick(4)}
                        >
                            <Link className='d-flex sidbar-item-link justify-content-start gap-3' to={'/pricing'}>
                                <Pricing className="icon-fill" />
                                <p>Pricing</p>
                            </Link>

                        </li>
                    </ul>
                    <ul className={` ${DashboardNavValues === 5 ? 'active' : ''} mb-4`}>
                        <li

                            onClick={() => handleButtonClick(5)}
                        >
                            <Link className='d-flex sidbar-item-link justify-content-start gap-3' to={'/setting'}>
                                <Setting className="icon-fill" />
                                <p>Settings</p>
                            </Link>

                        </li>
                    </ul>
                    <ul className={` ${DashboardNavValues === 6 ? 'active' : ''} mb-4`}>
                        <li

                            onClick={() => handleButtonClick(6)}
                        >
                            <Link className='d-flex sidbar-item-link justify-content-start gap-3' to={'/signout'}>
                                <Signout className="icon-fill" />
                                <p>Sign Out</p>
                            </Link>

                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;
