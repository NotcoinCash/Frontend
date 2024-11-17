import { useEffect, useState } from "react";
import "./App.css";
import Emisionbar from "./components/emisionbar/Emixionbar";
import Balance from "./components/balance/Balance";
import Coin from "./components/coin/Coin";
import Energyinfo from "./components/energyinfo/Energyinfo";
import Navbar from "./components/navbar/Navbar";
import WebApp from '@twa-dev/sdk'
import { getUser, createUser } from "./utils/api"; 


function App() {
    const [balance, setBalance] = useState<number>(0);
    const [totalEnergy, setTotalEnergy] = useState<number>(1000);
    const [availableEnergy, setAvailableEnergy] = useState<number>(1000);
    const [click, setClick] = useState<number>(1);
    const [userID, setUserID] = useState<number>(0)
    const [userName, setUserName] = useState<string>('')
    const [referalID, setReferalID] = useState<number>(0)
    const [photoURL, setPhotoURL] = useState<string>('')
    const [initData, setInitData] = useState<string | null>(null)

    useEffect(() => {
        if (WebApp.initDataUnsafe.user) {
            setUserID(WebApp.initDataUnsafe.user.id);
            setInitData(WebApp.initData);
            setUserName(WebApp.initDataUnsafe.user.username ?? ""); // Fallback to empty string
            setPhotoURL(WebApp.initDataUnsafe.user.photo_url ?? '');
            if (WebApp.initDataUnsafe.start_param) {
                setReferalID(Number(WebApp.initDataUnsafe.start_param));
            }
            console.log(WebApp.initDataUnsafe);
        }
    }, []);

    useEffect(() => {
        const setBaseValues = async () => {
            if (userID && initData) {
                const user = await getUser(userID, initData);
    
                // Ensure `user` is of the expected structure
                if (user && typeof user === 'object' && 'data' in user) {
                    const boostsInfo = (user as any).data?.user?.boosts_info;
                    const balance = (user as any).data?.user?.balance;
                    const message = (user as any).message;
    
                    if (boostsInfo && balance !== undefined) {
                        const maximizer = boostsInfo.Maximizer;
                        const tap = boostsInfo.Tap;
    
                        if (maximizer) {
                            const { base_value: maximizerBaseValue, level: maximizerLevel, value_per_level: maximizerValuePerLevel } = maximizer;
    
                            setBalance(balance);
    
                            if (maximizerLevel === 1) {
                                setTotalEnergy(maximizerBaseValue);
                                setAvailableEnergy(1000);
                            } else {
                                setAvailableEnergy((maximizerLevel - 1) * maximizerValuePerLevel + maximizerBaseValue);
                            }
                        }
    
                        if (tap) {
                            const { base_value: tapBaseValue, level: tapLevel, value_per_level: tapPerLevel } = tap;
    
                            if (tapLevel === 1) {
                                setClick(1);
                            } else {
                                setClick((tapLevel - 1) * tapPerLevel + tapBaseValue);
                            }
                        }
                    }
    
                    if (message === 'User not found') {
                        await createUser(userID, userName, initData, referalID, photoURL);
                    }
                } else {
                    console.error("Unexpected user data structure:", user);
                }
            }
        };
        setBaseValues();
    }, [initData, userID]);
    

    return (
        <div className="container">
            <div className="blur__element"></div>
            <Emisionbar></Emisionbar>
            <main className="content">
                <Balance
                    balance={balance}
                ></Balance>
                <Coin
                    clickFunc={setClick}
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
