import { useState } from "react";
import "./style.css";
import api from "../../services/api.jsx";

function AddWaiter({ setLoading, setShowWindow }) {
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const newWaiter = {
            name,
            username: login,
            password,
            role: 'waiter'
        };

        api.post('/auth/register', newWaiter)
            .then((response) => {
                console.log(response);
            })
            .finally(
                () => {
                    setLoading(false);
                    setShowWindow(false);
                }
            )

    };

    return (
        <div className="add-waiter-container">
            <h1>Adicionar Garçom</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Nome do Garçom"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    placeholder="Login do Garçom"
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />
                <input
                    placeholder="Senha do Garçom (visível)"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Adicionar</button>
                <button
                    type="button"
                    id="cancelButton"
                    onClick={() => setShowWindow(false)}
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
}

export default AddWaiter;
