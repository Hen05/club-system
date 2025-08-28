import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthenticationContexts/authContext.jsx";
import AppRoutes from "./routes";
import "./index.css";
import { useState } from "react";
import LoadingComponent from "./components/LoadingComponent/index.jsx";

function Root() {
    const [loading, setLoading] = useState(false);

    return (
        <BrowserRouter>
            <AuthProvider setLoading={setLoading}>
                {loading && <LoadingComponent />}
                <AppRoutes setLoading={setLoading} />
            </AuthProvider>
        </BrowserRouter>
    );
}

createRoot(document.getElementById("root")).render(<Root />);
