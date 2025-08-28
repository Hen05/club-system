import { useEffect, useState } from "react";
import "./style.css";
import api from "../../services/api.jsx";

function WaiterSelect({ setLoading, setWindowShow, clubId, type }) {
    // Garçom
    const [waiters, setWaiters] = useState([]);
    const [selectedWaiter, setSelectedWaiter] = useState("");
    const [customWaiter, setCustomWaiter] = useState("");
    const [showCustomWaiter, setShowCustomWaiter] = useState(false);

    useEffect(() => {
        async function fetchWaiters(){
            try{
                setLoading(true);
                const response = await api.get("/user");
                console.log(response);
                const data = response.data;
                const names = data.map(user => user.name).filter(name => name !== "Barman Barman");
                setWaiters(names);
            } catch (error){
                console.error("Erro ao buscar garçom:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchWaiters();
    }, [setLoading]);

    // Garçom
    const handleWaiterChange = (e) => {
        const value = e.target.value;
        if (value === "Outro") {
            setShowCustomWaiter(true);
        } else {
            setSelectedWaiter(value);
            setShowCustomWaiter(false);
            setCustomWaiter("");
        }
    };

    const handleCustomWaiterKeyDown = (e) => {
        if (e.key === "Backspace" && customWaiter.trim() === "") {
            setShowCustomWaiter(false);
            setSelectedWaiter("");
        }
    };

    const handleAddClub = (e) => {
        e.preventDefault();
        setLoading(true);

        const finalWaiter = showCustomWaiter ? customWaiter : selectedWaiter;

        const data = {
            clubId,
            type,
            waiterName: finalWaiter
        }

        api.post('/clubHistory', data)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });

        setWindowShow(false);
    };

    return (
        <div className="add-club-container">
            <h1 className="add-club-title">Escolher o Garçom</h1>
            <form onSubmit={handleAddClub}>
                <div className={'input-container'}>
                    {/* Garçom */}
                    {!showCustomWaiter ? (
                        <select required={true} value={selectedWaiter} onChange={handleWaiterChange}>
                            <option value="" disabled hidden>
                                Garçom
                            </option>
                            {waiters.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                            <option value="Outro">Outro</option>
                        </select>
                    ) : (
                        <input
                            required={true}
                            className="otherWaiter"
                            placeholder="Outro Garçom"
                            value={customWaiter}
                            onChange={(e) => setCustomWaiter(e.target.value)}
                            onKeyDown={handleCustomWaiterKeyDown}
                            autoFocus
                        />
                    )}
                </div>

                <button type="submit">Salvar</button>
                <button
                    id={'cancelButton'}
                    onClick={(e) => {
                        e.preventDefault();
                        setWindowShow(false)}
                    }>Cancelar</button>
            </form>

        </div>
    );
}

export default WaiterSelect;