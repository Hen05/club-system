import './style.css';

function loading(){
    return (
        <div className="loading">
            <div className="loading-container">
                {"Carregando".split("").map((letter, index) => (
                    <span className="letter" key={index}>{letter}</span>
                ))}
            </div>
        </div>
    )
}

export default loading;