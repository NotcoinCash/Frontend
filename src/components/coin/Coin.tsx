import coinIMG from '../../assets/coin.svg';
import './Coin.css';

function Coin() {
    return (
        <button className='coin__button'>
            <img className='coin__img' src={coinIMG} alt="coin" />
        </button>
    );
}

export default Coin;
