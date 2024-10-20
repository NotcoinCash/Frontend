import { useState, useEffect } from 'react';
import './Energyinfo.css';

interface EnergyinfoProps {
    totalEnergy: number;
    availableEnergy: number;
}

function getEnergyPercent(totalEnergy: number, availableEnergy: number) {
    return (availableEnergy / totalEnergy) * 100;
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
                {availableEnergy}/{totalEnergy} ⚡
            </div>
        </div>
    );
}

export default Energyinfo;
