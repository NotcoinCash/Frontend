import { useState } from "react";
import "./App.css";
import Emisionbar from "./components/emisionbar/Emixionbar";
import Balance from "./components/balance/Balance";
import Coin from "./components/coin/Coin";
import Energyinfo from "./components/energyinfo/Energyinfo";
import Navbar from "./components/navbar/Navbar";

function App() {
    const [balance, setBalance] = useState<number>(0);
    const [totalEnergy, setTotalEnergy] = useState<number>(1000);
    const [availableEnergy, setAvailableEnergy] = useState<number>(1000);
    const [click, setClick] = useState<number>(1);

    return (
        <div className="container">
            <div className="blur__element"></div>
            <Emisionbar></Emisionbar>
            <main className="content">
                <Balance
                    balance={balance}
                ></Balance>
                <Coin
                    click={click}
                    balance={balance}
                    setBalance={setBalance}
                    availableEnergy={availableEnergy}
                    setAvailableEnergy={setAvailableEnergy}
                ></Coin>
                <Energyinfo
                    totalEnergy={totalEnergy}
                    availableEnergy={availableEnergy}
                ></Energyinfo>
            </main>
            <Navbar></Navbar>
        </div>
    );
}

export default App;
