import coinIMG from '../../assets/coin.svg';
import './Coin.css';

function Coin() {
    return (
        <div className='coin__button'>
            <img className='coin__img' src={coinIMG} alt="coin" />
            <span className="coin__print"></span>
        </div>
    );
}

export default Coin;
