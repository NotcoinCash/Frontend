import './Balance.css'
import icon from '../../assets/icon.svg'

const coins = 1000000

function formatCoins(coins: number) {
    return coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function Balance() {
    return (
        <div className="balance">
            <div className="balance__text">Your Balance</div>
            <div className="balance__info">
                <img src={icon} alt="" className="balance__info-img" />
                <div className="balance__info-amount">{formatCoins(coins)}</div>
            </div>
        </div>
    )
}

export default Balance