import { useState } from "react";
import "./style.css";
import api from "../../services/api.jsx";
import loginTranslate from "../../utils/loginTranslate.jsx";

function LoginForm({setLoading, setGoUp, goUp}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    function handleVisibility(){
        setShowPassword(!showPassword);
    }

    function handleLogin(e){
        e.preventDefault();
        const data = {
            username: username.toLowerCase(),
            password: password
        }
        setLoading(true);
        api.post("/auth/login", data)
            .then(res => {
                if(res.status === 200){
                    localStorage.setItem("token", res.data.token);
                    api.get("/auth/getUserInfos", {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${res.data.token}`
                        }
                    }).then(response => {
                        localStorage.setItem("role", response.data.role);
                        window.location.reload();
                    }).catch(err => console.log(err.response));
                } else{
                    const message = res.data.message;
                    setError(loginTranslate[message.toLowerCase()]);
                    setTimeout(() => {
                        setError("");
                    }, 5000);
                }
            })
            .catch(err => {
                const message = err.response.data.message;
                setError(loginTranslate[message.toLowerCase()]);
                setTimeout(() => {
                    setError("");
                }, 5000);
            })
            .finally(() => setLoading(false));
    }

    return(
        <div className={["login-form-container", `${goUp ? "open-login-form-container" : ""}`].join(" ")}>
            <form
                className={"login-form"}
                onSubmit={e => handleLogin(e)}>
                <input
                    className={"login-input"}
                    placeholder={"Usuário"}
                    type={"text"}
                    onChange={e => setUsername(e.target.value)}
                    onFocus={() => setGoUp(true)}
                    onBlur={() => setGoUp(false)}
                />
                <div className={'password-container'}>
                    <input
                        className={"login-input"}
                        type={(showPassword ? "text" : "password")}
                        placeholder={"Senha"}
                        onChange={e => setPassword(e.target.value)}
                        onFocus={() => setGoUp(true)}
                        onBlur={() => setGoUp(false)}
                    />
                    <div
                        className={["handle-visibility-password", (showPassword ? "show-password" : "hide-password")].join(" ")}
                        onClick={handleVisibility}
                    ></div>
                </div>
                <button
                    className={"login-button"}
                    type={"submit"}>Entrar
                </button>
            </form>

            <p
                className={"error"}
            >{error}</p>

            <p className={"credits"}>
                Copyright @Henrique_fehr</p>
        </div>
    )
}

export default LoginForm;