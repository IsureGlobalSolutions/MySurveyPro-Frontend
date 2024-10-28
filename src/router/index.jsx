import React, { useEffect } from 'react';
import {  Navigate, Route, Routes } from 'react-router-dom';

// import { getAuthState } from '../utils/auth';
import config from './config';
import useAuth from '../hooks/useAuth';
import RequireAuth from './RequireAuth.jsx';
import PageNotFound from '../pages/PageNotFound/PageNotFound.jsx';

const CustomRoute = ({ loginRequired = true, layout: Layout, component: Component }) => {
  
const {auth}=useAuth()

return (
  <Layout>
    <Component />
  </Layout>
);

};

const AppRoutes = () => {

const loginRequiredPaths = config.filter((item)=>item.loginRequired===true)
const withoutLogin = config.filter((item)=>item.loginRequired===false)
  return (


    
    <Routes>
    {withoutLogin.map(route => (
      <Route key={route.path} path={route.path} element={<CustomRoute {...route} />} />
    ))}
    <Route element={<RequireAuth/>}>
    {loginRequiredPaths.map(route => (
      <Route key={route.path} path={route.path} element={<CustomRoute {...route}/>} />
    ))}
    </Route>
    <Route path="*" element={<PageNotFound/>} />
  </Routes>



  );
};

export default AppRoutes;
