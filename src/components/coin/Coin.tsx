import { useState } from 'react';
import coinIMG from '../../assets/coin.svg';
import './Coin.css';

interface CoinProps {
    click: number;
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
    availableEnergy: number;
    setAvailableEnergy: React.Dispatch<React.SetStateAction<number>>;
}

function userClick(
    click: number,
    balance: number,
    setBalance: React.Dispatch<React.SetStateAction<number>>,
    availableEnergy: number,
    setAvailableEnergy: React.Dispatch<React.SetStateAction<number>>,
    touchCount: number
) {
    if (availableEnergy === 0) return

    const totalClick = click * touchCount;
    setBalance(balance += totalClick);
    setAvailableEnergy(availableEnergy -= totalClick);
}

function Coin({ click, balance, setBalance, availableEnergy, setAvailableEnergy }: CoinProps) {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleTouch = (e: React.TouchEvent<HTMLImageElement>) => {
        const touchCount = e.touches.length;
        if (touchCount > 0) {
            userClick(click, balance, setBalance, availableEnergy, setAvailableEnergy, touchCount);
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
