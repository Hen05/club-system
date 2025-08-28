import ClubsView from "../../components/ClubsView/index.jsx";
import "./style.css";
import NavBar from "../../components/NavBar/index.jsx";
import {useState} from "react";
import {menuList} from "../../utils/menuInfos.jsx";
import Settings from "../../components/Settings/index.jsx";
import ClubInfo from "../../components/ClubInfo/index.jsx";

const role = ((localStorage.getItem("role")) === "waiter") ? "waiter" : "adm";

function Home({setLoading}) {
    const [isHome, setIsHome] = useState(true);
    const [isSettings, setIsSettings] = useState(false);
    const [selectedClub, setSelectedClub] = useState("");
    const [isClub, setIsClub] = useState(false);
    const [selectedItem, setSelectedItem] = useState("home");

    function handleSelectItem(item){
        const selected = document.querySelector(".selected");
        const id = selected.id.split("-")[1];

        if(id !== item){
            switch (id){
                case "home":
                    setIsHome(false);
                    break;
                case "settings":
                    setIsSettings(false);
                    break;
                case "clubsInfo":
                    setIsClub(false);
                    break;
                default:
                    console.log(id);
            }
            switch (item){
                case "home":
                    setIsHome(true);
                    break;
                case "settings":
                    setIsSettings(true);
                    break;
                case "clubsInfo":
                    setIsClub(true);
                    break;
                default:
                    localStorage.clear();
                    window.location.reload();
            }
            setSelectedItem(item);
        }
    }

    return (
        <>
            <div className={['logo-top'].join(" ")}></div>
            {isHome && <ClubsView setLoading={setLoading} setSelectClub={setSelectedClub} handleSelectItem={handleSelectItem}/>}
            {isSettings && <Settings setLoading={setLoading}/>}
            {isClub && <ClubInfo clubId={selectedClub} setLoading={setLoading}/>}
            <NavBar menuList={menuList[role]} selectedItem={selectedItem} handleSelectItem={handleSelectItem} isThereASelectClub={selectedClub !== ""}/>
        </>
    )
}

export default Home;