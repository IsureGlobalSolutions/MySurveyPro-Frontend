import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './dashboardlayout.css';
import Sidebar from '../../pages/Dashboard/Sidebar/Sidebar';
import Topnavbar from '../../pages/Dashboard/Topnavbar/Topnavbar';
import { useDispatch } from 'react-redux';
const DashboardLayout = ({ children }) => {
    const [collapsed, setcollapsed] = useState(false)
const dispatch = useDispatch()

    return (
        <>

            <div className='d-flex ' style={{ overflowX: "hidden" }}>
                <div className={`${collapsed ? ' collapsedsidebar' : 'sidebar '}`}>
                    <Sidebar collapsed={collapsed} setcollapsed={setcollapsed} />
                </div>
                <div className={`collapse-content ${collapsed ? 'collapse-content-screen' : 'sidbar-content-screen'}`} style={{ backgroundColor: '#F5F5F5' }}>

                    <Topnavbar />

                    {children}

                </div>

            </div>



        </>
    );
};

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DashboardLayout;
