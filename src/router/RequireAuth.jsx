import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const location = useLocation(); // Uncomment if needed
  const {userData} =useSelector((state)=>state.user)

  return (
    userData?.accessToken ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{from: location}} replace />
    )
  );
};

export default RequireAuth;
