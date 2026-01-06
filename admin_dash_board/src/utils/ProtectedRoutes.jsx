import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../components/AdminContext/Context";

const ProtectedRoutes = () => {
  const { auth } = useContext(AdminContext);

  if (auth.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="flex flex-col items-center space-y-4">
           {/* Spinner */}
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
           {/* Icon  */}
          <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-800/80 rounded-2xl">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6
                  a2 2 0 00-2-2H6a2 2 0 00-2 2v6
                  a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
           {/* Loading message */}
          <p className="text-sm font-medium text-blue-100">
            Checking admin session...
          </p>
          <p className="text-xs text-blue-200/80">
            Please wait while we verify your credentials.
          </p>
        </div>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
