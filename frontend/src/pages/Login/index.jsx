import LoginForm from "../../components/LoginForm/index.jsx";
import {useState} from "react";
import LoadingComponent from "../../components/LoadingComponent/index.jsx";
import './style.css';

function Login({setLoading}) {
    const [goUp, setGoUp] = useState(false);
    return (
        <div className={'container-based'}>
            <div className="background-kojima-blur">
                <div className={['logo-no-bg', `${goUp ? "open-logo-no-bg" : ""}`].join(" ")}></div>
                <LoginForm setLoading={setLoading} setGoUp={setGoUp} goUp={goUp}/>
            </div>
        </div>
    )
}

export default Login;