import "./style.css";

function NavBar({menuList, selectedItem, handleSelectItem, isThereASelectClub}){
    return (
        <nav className="navbar">
            {menuList.map((item, index) => (
                <div
                    id={`id-${item}`}
                    className={["nav-item", selectedItem === item ? "selected" : "", (item === "clubsInfo" && !isThereASelectClub) ? "disabled" : ""].join(" ")}
                    key={index}
                    onClick={() => {
                        if(!(item === "clubsInfo" && !isThereASelectClub)) {
                            handleSelectItem(item)
                        }
                    }}
                >
                    <div
                    className={["img-container", (item === "clubsInfo" && !isThereASelectClub) ? "disabled" : ""].join(" ")}>
                        <div className={`${item} img`}></div>
                    </div>
                </div>
            ))}
        </nav>

    )
}

export default NavBar;