import "./App.css";
import Emisionbar from "./components/emisionbar/Emixionbar";
import Balance from "./components/balance/Balance";
import Coin from "./components/coin/Coin";
import Energyinfo from "./components/energyinfo/Energyinfo";
import Navbar from "./components/navbar/Navbar";

function App() {
    return (
        <div className="container">
            <div className="blur__element"></div>
            <Emisionbar></Emisionbar>
            <main className="main">
                <Balance></Balance>
                <Coin></Coin>
                <Energyinfo></Energyinfo>
            </main>
            <Navbar></Navbar>
        </div>
    );
}

export default App;
