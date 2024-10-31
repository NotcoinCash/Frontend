import crossImg from '../../assets/cross.svg'
import './Popup.css'

interface PopUpProps {
    children: React.ReactNode;
    setCloseState: any;
}

function PopUp({ children, setCloseState }: PopUpProps) {
    return (
        <>
            <div onClick={() => setCloseState(false)} className="popup__blur"></div>
            <div className="popup">
                <button className="popup__close" onClick={() => setCloseState(false)}>
                    <img src={crossImg} alt="cross" />
                </button>
                <div className="popup__content">
                    {children}
                </div>
            </div>
        </>
    )
}

export default PopUp