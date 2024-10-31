import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import CustomButton from "../../components/CustomButton/CustomButton";
import PopUp from '../../components/popup/Popup'
import './Friends.css'

import frinedsImg from '../../assets/friends.svg'
import inviteFriendsImg from '../../assets/InviteFriends.svg'

function Friends() {
    const [isActivePopUp, setIsActivePopUp] = useState(true)

    return (
        <div className="container">
            <div className="projectname">NCC</div>
            <div className="blur__element"></div>
            <div className="friends content">
                <h3 className="friends__title">Friends</h3>
                <p className="friends__text">Invite Mates and get bonuses for each invited friend</p>
                <div className="friends__content">
                    <img src={frinedsImg} alt="frinedIMG" className="friends__img" />
                    <CustomButton onclickAction={() => {setIsActivePopUp(true)}} className='friends__button'>Invite a Mates</CustomButton>
                </div>
            </div>
            
            <Navbar></Navbar>
            {
                isActivePopUp ?

                (
                    <PopUp setCloseState={setIsActivePopUp}>
                        <img src={inviteFriendsImg} alt="frinedIMG" className="popup__friends-img" />
                        <h3 className="friends__popup-title">Invite Friends</h3>
                        <div className="friends__popup-buttons">
                            <CustomButton className="friends__popup-button">Share link</CustomButton>
                            <CustomButton className="friends__popup-button">Copy link</CustomButton>
                        </div>
                    </PopUp>
                )

                : null
            }
        </div>
    )
}

export default Friends