import { lazy, Suspense, useEffect,  } from "react";
import Router from './router'
import { ErrorBoundary } from "react-error-boundary";
import { AuthProvider } from "./context/AuthProvider";
import NavbarValuesContext from "./context/NavbarValuesContext";
import { Toaster } from "react-hot-toast";
import Loader from "./components/plugins/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "./Redux/slice/pathSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  
  const currentPath = useSelector((state) => state.path.currentPath);

  
  useEffect(() => {
    dispatch(setPath(location.pathname));
  }, [location, dispatch]);
  


  useEffect(() => {
    if (currentPath) {
      navigate(currentPath);
    }
  }, [currentPath, navigate]);


  return (
    <>
      <GoogleOAuthProvider clientId="1035198617356-07e0vkaahbhrjn1e88mq71havfsacjm0.apps.googleusercontent.com">
    <ErrorBoundary fallback={<><PageNotFound/></>}>
        <Suspense fallback={<div style={{height:'100vh'
          ,display:'flex',
           justifyContent:'center',
           alignItems:'center'}}>
<Loader/>
          </div>}>
       <NavbarValuesContext>
            <AuthProvider>
              {/* <Route path="/" element={<LandingPage />} /> */}
    <Router/>

     </AuthProvider>
        
        </NavbarValuesContext>   
 

    
<Toaster/>
    </Suspense>
    </ErrorBoundary>
    </GoogleOAuthProvider>

    </>
  
  );
}

export default App;
