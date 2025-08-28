import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthenticationContexts/authContext.jsx";

const ProtectedRoute = ({ redirectTo }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === null) return <p>Carregando...</p>;

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;