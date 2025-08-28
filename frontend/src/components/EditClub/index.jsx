import { useEffect, useState } from "react";
import "./style.css";
import api from "../../services/api.jsx";

function EditClub({ setLoading, setWindowShow, clubId }) {
    const [owner, setOwner] = useState("");

    // Destilados
    const [distillates, setDistillates] = useState([]);
    const [selectedDistillate, setSelectedDistillate] = useState("");
    const [customDistillate, setCustomDistillate] = useState("");
    const [showCustomDistillate, setShowCustomDistillate] = useState(false);

    // Bebidas
    const [drinks, setDrinks] = useState([]);
    const [selectedDrink, setSelectedDrink] = useState("");
    const [customDrink, setCustomDrink] = useState("");
    const [showCustomDrink, setShowCustomDrink] = useState(false);

    // Garçom
    const [waiters, setWaiters] = useState([]);
    const [selectedWaiter, setSelectedWaiter] = useState("");
    const [customWaiter, setCustomWaiter] = useState("");
    const [showCustomWaiter, setShowCustomWaiter] = useState(false);

    useEffect(() => {
        async function fetchDistillates() {
            try {
                setLoading(true);
                const response = await api.get("/club/distilled");
                const data = response.data;
                setDistillates(data);
            } catch (error) {
                console.error("Erro ao buscar destilados:", error);
            } finally {
                setLoading(false);
            }
        }

        async function fetchDrinks(){
            try{
                setLoading(true);
                const response = await api.get("/club/name");
                const data = response.data;
                setDrinks(data);
            } catch (error){
                console.error("Erro ao buscar nomes:", error);
            } finally {
                setLoading(false);
            }
        }

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

        fetchDistillates();
        fetchDrinks();
        fetchWaiters();
    }, [setLoading]);

    // Destilado
    const handleDistillateChange = (e) => {
        const value = e.target.value;
        if (value === "Outro") {
            setShowCustomDistillate(true);
        } else {
            setSelectedDistillate(value);
            setShowCustomDistillate(false);
            setCustomDistillate("");
        }
    };

    const handleCustomDistillateKeyDown = (e) => {
        if (e.key === "Backspace" && customDistillate.trim() === "") {
            setShowCustomDistillate(false);
            setSelectedDistillate("");
        }
    };

    // Bebida
    const handleDrinkChange = (e) => {
        const value = e.target.value;
        if (value === "Outro") {
            setShowCustomDrink(true);
        } else {
            setSelectedDrink(value);
            setShowCustomDrink(false);
            setCustomDrink("");
        }
    };

    const handleCustomDrinkKeyDown = (e) => {
        if (e.key === "Backspace" && customDrink.trim() === "") {
            setShowCustomDrink(false);
            setSelectedDrink("");
        }
    };

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
        const finalDistillate = showCustomDistillate ? customDistillate : selectedDistillate;
        const finalDrink = showCustomDrink ? customDrink : selectedDrink;
        const finalWaiter = showCustomWaiter ? customWaiter : selectedWaiter;

        const data = {};

        if(owner){
            data.owner = owner;
        }

        if(finalDistillate){
            data.distilled = finalDistillate;
        }

        if (finalDrink){
            data.name = finalDrink;
        }

        if(finalWaiter){
            data.waiterName = finalWaiter;
        }

        if(owner || finalDistillate || finalDrink || finalWaiter){
            setLoading(true);
            api.put(`/club/${clubId}`, data)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setLoading(false);
                })
        }

        setWindowShow(false);
    };

    return (
        <div className="add-club-container">
            <h1 className="add-club-title">Editar Clube</h1>
            <form onSubmit={handleAddClub}>
                <div className={'input-container'}>
                    <input
                        placeholder="Novo Dono do Clube"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                    />

                    {/* Destilado */}
                    {!showCustomDistillate ? (
                        <select value={selectedDistillate} onChange={handleDistillateChange}>
                            <option value="" disabled hidden>
                                Novo Destilado
                            </option>
                            {distillates.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                            <option value="Outro">Outro</option>
                        </select>
                    ) : (
                        <input
                            className="otherDistilled"
                            placeholder="Outro Destilado"
                            value={customDistillate}
                            onChange={(e) => setCustomDistillate(e.target.value)}
                            onKeyDown={handleCustomDistillateKeyDown}
                            autoFocus
                        />
                    )}

                    {/* Bebida */}
                    {!showCustomDrink ? (
                        <select value={selectedDrink} onChange={handleDrinkChange}>
                            <option value="" disabled hidden>
                                Nova Bebida
                            </option>
                            {drinks.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                            <option value="Outro">Outro</option>
                        </select>
                    ) : (
                        <input
                            className="otherDrink"
                            placeholder="Outra Bebida"
                            value={customDrink}
                            onChange={(e) => setCustomDrink(e.target.value)}
                            onKeyDown={handleCustomDrinkKeyDown}
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

export default EditClub;