import Navbar from "../../components/navbar/Navbar";
import frinedsImg from '../../assets/friends.svg'
import CustomButton from "../../components/CustomButton/CustomButton";
import './Friends.css'


function Friends() {
    return (
        <div className="container">
            <div className="projectname">NCC</div>
            <div className="blur__element"></div>
            <div className="friends content">
                <h3 className="friends__title">Friends</h3>
                <p className="friends__text">Invite Mates and get bonuses for each invited friend</p>
                <div className="friends__content">
                    <img src={frinedsImg} alt="frinedIMG" className="friends__img" />
                    <CustomButton className='friends__button' text="Invite a Mates "></CustomButton>
                </div>
            </div>
            
            <Navbar></Navbar>
        </div>
    )
}

export default Friends