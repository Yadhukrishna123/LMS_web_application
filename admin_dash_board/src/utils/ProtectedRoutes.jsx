import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../components/AdminContext/Context";

const ProtectedRoutes = () => {
  const { auth } = useContext(AdminContext);

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
