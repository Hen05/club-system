import "./style.css";
import {useEffect, useState} from "react";
import AddClub from "../AddClub/index.jsx";
import AddWaiter from "../AddWaiter/index.jsx";
import api from "../../services/api.jsx";
import {translanteRequest} from "../../utils/actionsTranslate.jsx";
import {capitalize} from "../../utils/utils.jsx";

function Settings({setLoading}){
    const [requests, setRequests] = useState([]);
    const [isAddClub, setIsAddClub] = useState(false);
    const [isAddWaiter, setIsAddWaiter] = useState(false);

    async function fetchRequests(){
        setLoading(true);
        const requests = await api.get('/request');
        const data = requests.data;
        setRequests(data);
        setLoading(false);
        console.log(data);
    }

    useEffect(()=>{
        fetchRequests();
    }, [])

    async function handleAccept(e){
        const clubId = e.target.parentNode.parentNode.id
        await api.patch(`/request/club/${clubId}/accept`);
        fetchRequests();
    }

    async function handleReject(e){
        const clubId = e.target.parentNode.parentNode.id;
        await api.patch(`/request/club/${clubId}/reject`);
        fetchRequests();
    }

    return (
       <>
       {!isAddClub && !isAddWaiter &&
        <>
           <div className="requests-container">
               <div className={'waiter-requests-container'}>
                   {
                       requests.length === 0 && <p>Não existem requisições</p>
                   }
                   { (requests.length > 0) && (requests.map(request => (
                       <div className={'request'} id={request.club.id}>
                           <div className={'request-user'}>Garçom <strong>{capitalize(request.user.username)}</strong></div>
                           <div className={'request-type'}>Solicitando {translanteRequest[request.type]}</div>
                           <div className={'request-name'}>
                               do <strong>{request.club.name}</strong> de <strong>{capitalize(request.club.owner)}</strong></div>
                           {request.info && <div className={'request-info'}>
                               {request.info}
                           </div>}
                           <div className={'options-container'}>
                               <button
                                   className={'request-btn-response accept'}
                                   onClick={e => handleAccept(e)}>Aceitar</button>
                               <button
                                   className={'request-btn-response reject'}
                                   onClick={e => handleReject(e)}>Recusar</button>
                           </div>
                       </div>
                   )))}
               </div>
           </div>
           <div className={'settings-container'}>
               <button
                   className={['add-btn', 'settings-btn'].join(" ")}
                   onClick={() => setIsAddClub(true)}>Adicionar Clube</button>
               <button
                   className={['add-waiter-btn', 'settings-btn'].join(" ")}
                   onClick={() => setIsAddWaiter(true)}>Registrar Garçom</button>
           </div>
        </>
        }
           {isAddClub && <AddClub setLoading={setLoading} setAddClub={setIsAddClub}/>}
           {isAddWaiter && <AddWaiter setShowWindow={setIsAddWaiter} setLoading={setLoading}/>}
       </>
    )
}

export default Settings;