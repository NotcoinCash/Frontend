import './Energyinfo.css'

const availableEnergy = 1000
const totalEnergy = 1000

function Energyinfo() {
    return (
        <div className="energyinfo">
            <div className="energyinfo__bar">
                <div className="energyinfo__bar-energy"></div>
            </div>
            <div className="energyinfo__amount">
                {availableEnergy}/{totalEnergy} ⚡
            </div>
        </div>
    )
}

export default Energyinfo