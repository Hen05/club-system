import {useState, useEffect} from "react";
import api from "../../services/api.jsx";
import "./style.css";
import {
    actionsTranslate,
    admTranslate,
    btnTranslate,
    oppositeAction,
    translanteRequest
} from "../../utils/actionsTranslate.jsx";
import EditClub from "../EditClub/index.jsx";
import WaiterSelect from "../WaiterSelect/index.jsx";
import RequestClub from "../RequestClub/index.jsx";

const role = ((localStorage.getItem("role")) === "waiter") ? "waiter" : "adm";

function ClubInfo({clubId, setLoading}) {
    const [clubInfos, setClubInfos] = useState({});
    const [clubData, setClubData] = useState([]);
    const [isEditClub, setIsEditClub] = useState(false);
    const [isSelectWaiter, setIsSelectWaiter] = useState(false);
    const [isRequest, setIsRequest] = useState(false);
    const [type, setType] = useState("");
    const [update, setIsUpdate] = useState(false);
    const [showButtons, setShowButtons] = useState(true);

    useEffect(() => {
        if(clubId) {
            setLoading(true);
            api.get(`/club/${clubId}`).then((response) => {
                setClubInfos(response.data);
                console.log(response.data);
                api.get(`/clubHistory/club/${clubId}`).then((responseHistory) => {
                    setClubData(responseHistory.data);
                    console.log(responseHistory.data);
                })
            }).catch((error) => {
                console.log(error);
            })
                .finally(
                    () => setLoading(false),
                )
        }
    }, [isEditClub, isSelectWaiter === false, update, isRequest === false]);

    function handleClick(e){
        e.preventDefault();
        const value = e.target.textContent.toLowerCase();

        if(role === "adm"){
            if(value === "entregue"){
                setType("store")
                setIsSelectWaiter(true);
            } else if (value === "retirado"){
                setType("withdraw");
                setIsSelectWaiter(true);
            }
            else{
                setType("empty")
                setIsSelectWaiter(true);
            }
        } else{
            if(value === "alertar entrega"){
                const data = {
                    clubId: clubId,
                    type: "store"
                }
                setLoading(true);

                api.post('/request', data)
                    .then(response => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                    .finally( () => {
                        setLoading(false);
                        setIsUpdate(true);
                    }
                    );
            } else if (value === "solicitar retirada"){
                setIsRequest(true);
            }
            else{
                const data = {
                    clubId: clubId,
                    type: "empty"
                }

                setLoading(true);

                api.post('/request', data)
                    .then(response => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                    .finally( () => {
                            setLoading(false);
                            setIsUpdate(true);
                        }
                    );
            }
        }
    }

    function handleRebuy(e){
        e.preventDefault();
        setType("repurchase");
        setIsSelectWaiter(true);
    }

    function handleHideButtons(e){
        setShowButtons(!showButtons);
    }

    function handleEdit(e){
        e.preventDefault();
        setIsEditClub(!isEditClub);
    }
    return (
        <>
            {clubData.length <= 0 && <p className={'no-club'}>Nenhum clube selecionado...</p>}
            {clubData.length > 0 && (
                <div className={'club-info-container'}>
                    <div className={'club-info'}>
                        <p className={'owner-name'}>
                            <strong>{clubInfos.name}</strong> do <strong>{clubInfos.owner}</strong></p>
                        <div className={'status-container'}>
                            <p className={"status"}><strong>Estado Atual</strong></p>
                            <p className={"actual-status"}>{actionsTranslate[clubInfos.lastHistory]}</p>
                        </div>
                    </div>
                </div>
            )}
            {clubData.length > 0 && <div className={'club-history-container'}>
                <table className={'club-history-table'}>
                    <tr className={'table-title'}>
                        <td>Garçom</td>
                        <td>Ação</td>
                        <td>Data</td>
                        <td>Hora</td>
                    </tr>
                    {clubData.length > 0 && clubData.map((club, index) => {
                        const date = new Date(club.createdAt);
                        return (

                            <tr>
                                <td>{(club.waiterName ? club.waiterName : "Não informado")}</td>
                                <td>{actionsTranslate[club.type]}</td>
                                <td>{date.toLocaleDateString()}</td>
                                <td>{date.toLocaleTimeString()}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>}

            {!isEditClub && !isSelectWaiter && !isRequest && <div className={['container-club-btns', `${(showButtons ? "" : "hide-container")}`].join(" ")}>
                <div className={'hide-buttons'}
                    onClick={handleHideButtons}><span className={(showButtons ? "" : "show-buttons")}></span></div>
                {clubData.length > 0 && role === "adm" &&
                    <button className={['settings-btn', 'edit-btn'].join(" ")}
                            onClick={(e) => handleEdit(e)}>
                        Editar
                    </button>
                }

                {clubData.length > 0 && (
                    clubInfos.isRequested ? (
                        <button disabled={true} className={['settings-btn', 'disabled-btn'].join(" ")}>
                            Solicitado
                        </button>
                    ) : (
                        clubInfos.lastHistory === 'empty' ? (
                            role === "adm" ? (
                                <button
                                    key={'rebuy'}
                                    className={['settings-btn', 'rebuy-btn'].join(" ")}
                                    onClick={e => handleRebuy(e)}>
                                    Recomprar
                                </button>
                            ) : (
                                <button disabled={true} className={['settings-btn', 'disabled-btn'].join(" ")}>
                                    Esgotado
                                </button>
                            )
                        ) : (
                            <>
                                <button
                                    key={oppositeAction[clubInfos.lastHistory]}
                                    className={['settings-btn', 'request-btn'].join(" ")}
                                    onClick={e => handleClick(e)}>
                                    {role === "adm" ? admTranslate[clubInfos.lastHistory] : btnTranslate[clubInfos.lastHistory]}
                                </button>
                                <button
                                    disabled={clubInfos.lastHistory !== "withdraw"}
                                    key={"empty"}
                                    className={['settings-btn', 'empty-btn'].join(" ")}
                                    onClick={(e) => handleClick(e)}>
                                    {role === "adm" ? "Esgotamento" : "Alertar Esgotamento"}
                                </button>
                            </>
                        )
                    )
                )}

            </div>}
            {isEditClub && <EditClub setLoading={setLoading} setWindowShow={setIsEditClub} clubId={clubId}/>}
            {isSelectWaiter && <WaiterSelect clubId={clubId} setLoading={setLoading} setWindowShow={setIsSelectWaiter} type={type}/>}
            {isRequest && <RequestClub setLoading={setLoading} setWindowShow={setIsRequest} clubId={clubId}/>}
        </>
    )
}

export default ClubInfo;