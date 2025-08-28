import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/authenticationComponents/protectedRoute.jsx";
import { useAuth } from "./contexts/AuthenticationContexts/authContext.jsx";

function AppRoutes({setLoading}) {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            {/* Se o usuário já estiver autenticado, redireciona do login para home */}
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login setLoading={setLoading}/>} />

            {/* Rotas protegidas */}
            <Route element={<ProtectedRoute redirectTo="/" />}>
                <Route path="/home" element={<Home setLoading={setLoading}/>}/>
            </Route>

            {/* Qualquer rota não reconhecida redireciona para login */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default AppRoutes;