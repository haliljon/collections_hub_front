import { Outlet, Navigate } from "react-router-dom";
import isAuthenticated from "./components/auth/auth";
import isAdmin from "./components/auth/isAdmin";

const AdminRoute = () => {
    if (isAuthenticated() && isAdmin()) {
        return <Outlet />;
    } else {
        return <Navigate to="/" />;
    }
}

export default AdminRoute;