import { createContext, useContext, useEffect, useState } from "react";
import api from "../../services/api.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children, setLoading }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try {
                const response = await api.get('/auth/isAuthenticated');
                const data = await response.status;
                setIsAuthenticated(data === 200);
            } catch (error) {

                console.error("Erro ao verificar autenticação", error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
