import { useEffect, useState } from "react";
import "./style.css";
import api from "../../services/api.jsx";

function RequestClub({ setLoading, setWindowShow, clubId }) {
    const [quantities, setQuantities] = useState({
        bucket: 0,
        tallGlass: 0,
        shortGlass: 0
    });

    const handleQuantityChange = (type, value) => {
        const quantity = Math.max(0, parseInt(value) || 0);
        setQuantities(prev => ({
            ...prev,
            [type]: quantity
        }));
    };

    const changeQuantity = (type, delta) => {
        setQuantities(prev => ({
            ...prev,
            [type]: Math.max(0, prev[type] + delta)
        }));
    };

    const handleSubmitRequest = (e) => {
        e.preventDefault();
        setLoading(true);

        let infoParts = [];

        if (quantities.bucket) {
            infoParts.push(`${quantities.bucket} ${quantities.bucket === 1 ? "Balde" : "Baldes"}`);
        }

        if (quantities.shortGlass || quantities.tallGlass) {
            if (quantities.shortGlass && quantities.tallGlass) {
                infoParts.push(
                    `${quantities.shortGlass} ${quantities.shortGlass === 1 ? "Copo Baixo" : "Copos Baixos"} e ` +
                    `${quantities.tallGlass} ${quantities.tallGlass === 1 ? "Copo Longo" : "Copos Longos"}`
                );
            } else if (quantities.shortGlass) {
                infoParts.push(`${quantities.shortGlass} ${quantities.shortGlass === 1 ? "Copo Baixo" : "Copos Baixos"}`);
            } else {
                infoParts.push(`${quantities.tallGlass} ${quantities.tallGlass === 1 ? "Copo Longo" : "Copos Longos"}`);
            }
        }

        let info = infoParts.join(infoParts.length === 2 ? " e " : ", ");

        const data = {
            clubId,
            type: "withdraw"
        };

        if(info !== ''){
            data.info = info;
        }

        api.post('/request', data)
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error)
            })
            .finally( () => {
                    setLoading(false);
                    setWindowShow(false);
                }
                );
    };

    return (
        <div className="request-club-container">
            <h1 className="request-club-title">Requisição do Clube</h1>
            <form onSubmit={handleSubmitRequest}>
                <div className="container-quantities">
                    {[
                        {label: "Baldes", key: "bucket"},
                        {label: "Copos Longos", key: "tallGlass"},
                        {label: "Copos Baixos", key: "shortGlass"}
                    ].map(({label, key}) => (
                        <div key={key} className="quantity-row">
                            <span>{label}</span>
                            <div className={'value-input'}>
                                <button type="button" onClick={() => changeQuantity(key, -1)}>-</button>
                                <input
                                    type="number"
                                    min="0"
                                    value={quantities[key]}
                                    onChange={(e) => handleQuantityChange(key, e.target.value)}
                                />
                                <button type="button" onClick={() => changeQuantity(key, 1)}>+</button>

                            </div>
                        </div>
                    ))}
                </div>
                <div className="form-actions">
                    <button type="submit">Solicitar</button>
                    <button
                        id="cancel-button"
                        onClick={(e) => {
                            e.preventDefault();
                            setWindowShow(false);
                        }}
                    >
                        Cancelar
                    </button>
                </div>

            </form>
        </div>
    );
}

export default RequestClub;
