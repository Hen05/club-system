import {useEffect, useState} from "react";
import "./style.css";
import {actionsTranslate} from "../../utils/actionsTranslate.jsx";
import api from "../../services/api.jsx";

function ClubsView({setLoading, setSelectClub, handleSelectItem}) {
    const [clubs, setClubs] = useState([]);
    const [filteredClubs, setFilteredClubs] = useState([]);
    const historyMap = {
        purchase: "comprado",
        withdraw: "retirado",
        store: "guardado",
        empty: "esgotado"
    };


    useEffect(() => {
        setLoading(true);
        api.get('/club').then((response) => {
            setClubs(response.data);
            setFilteredClubs(response.data);
        }).catch((error) => {
            console.log(error);
        }).finally(() => setLoading(false));
    }, []);

    function handleFilteredClubs(value) {
        const lowerValue = value.toLowerCase();

        const filtered = clubs.filter(club => {
            const translatedHistory = historyMap[club.lastHistory] || "";

            return (
                club.name?.toLowerCase().includes(lowerValue) ||
                club.owner?.toLowerCase().includes(lowerValue) ||
                club.distilled?.toLowerCase().includes(lowerValue) ||
                translatedHistory.toLowerCase().includes(lowerValue)
            );
        });

        setFilteredClubs(filtered);
    }


    function handleSelectClub(clubId) {
        setSelectClub(clubId);
        handleSelectItem("clubsInfo");
    }

    return (
        <>
            <div className={'club-input-container'}>
                <div className={'magnifier-icon'}></div>
                <input
                    type={"text"}
                    placeholder={"Pesquisar"}
                    className={"club-research-input"}
                    onChange={e => handleFilteredClubs(e.target.value)}/>
            </div>
            <div className="clubs">
                {filteredClubs.map((club, index) => (
                    <div
                        id={club.id}
                        className="club"
                        key={index}
                        onClick={() => handleSelectClub(club.id)}>
                        <p className={'club-owner'}>{club.owner}</p>
                        <p className={'club-drink'}>{club.distilled}</p>
                        <p className={'club-name'}>{club.name}</p>
                        <p className={['club-lastStatus', `club-${club.lastHistory}`].join(" ")}>
                            {(club.requested) ? "Solicitado" : actionsTranslate[club.lastHistory]}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ClubsView;