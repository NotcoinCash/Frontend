import { useEffect, useState } from 'react';
import coinIMG from '../../assets/coin.svg';
import './Coin.css';
import { updateBalance } from '../../utils/api';
import WebApp from '@twa-dev/sdk'

interface CoinProps {
    click: number;
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
    availableEnergy: number;
    setAvailableEnergy: React.Dispatch<React.SetStateAction<number>>;
    clickFunc: any;
}

function userClick(
    click: number,
    balance: number,
    setBalance: React.Dispatch<React.SetStateAction<number>>,
    availableEnergy: number,
    setAvailableEnergy: React.Dispatch<React.SetStateAction<number>>,
    touchCount: number,
    myInitData: string,
    myUserID: number,
    
) {
    if (availableEnergy === 0) return;

    const totalClick = click * touchCount;

    const newBalance = balance + Math.min(totalClick, availableEnergy);
    const newEnergy = Math.max(availableEnergy - totalClick, 0);

    setBalance(newBalance);
    setAvailableEnergy(newEnergy);

    updateBalance(myUserID, myInitData, totalClick)
    
}

function Coin({ click, balance, setBalance, availableEnergy, setAvailableEnergy }: CoinProps) {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [initData, setInitData] = useState<string | null>(null)
    const [userID, setUserID] = useState<number>(0)

    useEffect(() => {
        const updateValues = async () => {
            if (WebApp.initDataUnsafe.user) {
                setInitData(WebApp.initData)
                setUserID(WebApp.initDataUnsafe.user.id)
            }
        }
        updateValues()
    })

    const handleTouch = (e: React.TouchEvent<HTMLImageElement>) => {
        const touchCount = e.touches.length;
        if (touchCount > 0) {
            if (initData) {
                userClick(click, balance, setBalance, availableEnergy, setAvailableEnergy, touchCount, initData, userID);
            }
            triggerBounceAnimation();
        }
    };

    const triggerBounceAnimation = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 100);
    };

    return (
        <div className='coin__button'>
            <div className="coin__blur-elipse"></div>
            <img
                onTouchStart={handleTouch}
                className={`coin__img ${isClicked ? 'clicked' : ''}`}
                src={coinIMG}
                alt="coin"
            />
            <span className="coin__print"></span>
        </div>
    );
}

export default Coin;
