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
            setUserID(WebApp.initDataUnsafe.user.id)
            setInitData(WebApp.initData)
            setUserName(WebApp.initDataUnsafe.user.username)
            setPhotoURL(WebApp.initDataUnsafe.user.photo_url)
            if(WebApp.initDataUnsafe.start_param) {
                setReferalID(Number(WebApp.initDataUnsafe.start_param))
            }
            console.log(WebApp.initDataUnsafe)
        }
        // setUserID(862470135)
        // setInitData('query_id=AAH3P2gzAAAAAPc_aDN10jtS&user=%7B%22id%22%3A862470135%2C%22first_name%22%3A%22Mukhailo%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22half_zero%22%2C%22language_code%22%3A%22uk%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FbDiaun_9We6PjACSd18X59xT-2733ewKHAgQ6mSx7Dg.svg%22%7D&auth_date=1731747785&hash=414d95d81477d0a010cbae08a156452b89d7151d71d0481693a3e4c29e447a37')
    }, [])

    useEffect(() => {
        const setBaseValues = async () => {
            if (userID && initData) {
                const user = await getUser(userID, initData);

                const maximazerBaseValue = user.data.user.boosts_info.Maximizer.base_value
                const maximazerLevel = user.data.user.boosts_info.Maximizer.level
                const maximazerValuePerLevel = user.data.user.boosts_info.Maximizer.value_per_level
                setBalance(user.data.user.balance)
                
                if (maximazerLevel === 1) {
                    setTotalEnergy(maximazerBaseValue)
                    setAvailableEnergy(1000);
                } else {
                    setAvailableEnergy((maximazerLevel - 1) * maximazerValuePerLevel + maximazerBaseValue)
                    setAvailableEnergy((maximazerLevel - 1) * maximazerValuePerLevel + maximazerBaseValue);
                }

                const tapBaseValue = user.data.user.boosts_info.Tap.base_value
                const tapLevel = user.data.user.boosts_info.Tap.level
                const tapPerLevel = user.data.user.boosts_info.Tap.value_per_level

                if (tapLevel === 1) {
                    setClick(1)
                } else {
                    setClick((tapLevel - 1) * tapPerLevel + tapBaseValue)
                }
    
                if (user.message === 'User not found') {
                    await createUser(userID, userName, initData, referalID, photoURL);
                }
            }
        };
        setBaseValues();
    }, [initData, userID])

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
