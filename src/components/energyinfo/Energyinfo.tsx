import { useState, useEffect } from 'react';
import './Energyinfo.css';

interface EnergyinfoProps {
    totalEnergy: number;
    availableEnergy: number;
}

function getEnergyPercent(totalEnergy: number, availableEnergy: number) {
    return (availableEnergy / totalEnergy) * 100;
}

function energyAmount(totalEnergy: number, availableEnergy: number) {
    const energyEmoji = '⚡'
    const lowEnergyEmoji = '🪫'

    let emoji = ''

    if (availableEnergy === 0) {
        emoji = lowEnergyEmoji
    } else {
        emoji = energyEmoji
    }

    return `${availableEnergy}/${totalEnergy} ${emoji}`

}

function Energyinfo({ totalEnergy, availableEnergy }: EnergyinfoProps) {
    const [energyPercent, setEnergyPercent] = useState<number>(0);

    useEffect(() => {
        setEnergyPercent(getEnergyPercent(totalEnergy, availableEnergy));
    }, [totalEnergy, availableEnergy]);

    return (
        <div className="energyinfo">
            <div className="energyinfo__bar">
                <div 
                    className="energyinfo__bar-energy" 
                    style={{ width: `${energyPercent}%` }} 
                ></div>
            </div>
            <div className="energyinfo__amount">
                {energyAmount(totalEnergy, availableEnergy)}
            </div>
        </div>
    );
}

export default Energyinfo;
