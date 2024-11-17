import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import CustomButton from "../../components/CustomButton/CustomButton";
import PopUp from '../../components/popup/Popup'
import './Friends.css'

import frinedsImg from '../../assets/friends.svg'
import inviteFriendsImg from '../../assets/InviteFriends.svg'
import userIMG from '../../assets/user.png'
import { getFriends } from "../../utils/api";
import WebApp from '@twa-dev/sdk'

const REFERAL_LINK = 'https://t.me/CryptoNotcoinCashBot/?startapp='

function ListFriends({friendsList, popUpFunc}: any) {
    return (
        <div className="friends__list">
            {
                friendsList.map((friend: any, index: any) => {
                    return (
                        <div key={index} className="friends__list-item">
                            <div className="friends__item-wrapper">
                                <img src={userIMG} alt="user" className="friends__item-img" />
                            </div>
                            <div className="frineds__item-content">
                                <div className="friends__item-title">{friend.username}</div>
                                <div className="friends__item-balance">{friend.balance.toLocaleString('en-US')}</div>
                            </div>
                        </div>
                    )
                })
            }
            <CustomButton onclickAction={() => {popUpFunc(true)}} className='friends__list-button'>Invite a Friends </CustomButton>
        </div>
    )
}

function FriendsContent({popUpFunc}: any) {
    return (
        <>
            <p className="friends__text">Invite Mates and get bonuses for each invited friend</p>
            <div className="friends__content">
                <img src={frinedsImg} alt="frinedIMG" className="friends__img" />
                <CustomButton onclickAction={() => {popUpFunc(true)}} className='friends__button'>Invite a Friends </CustomButton>
             </div>
        </>
    )
}

function Friends() {
    const [isActivePopUp, setIsActivePopUp] = useState(false)
    const [friends, setFriends] = useState([])
    const [userID, setUserID] = useState<number>(0)
    const [initData, setInitData] = useState<string>('')
    // const [referalLink, setReferalLink] = useState<string>('')

    useEffect(() => {
        if (WebApp.initDataUnsafe.user) {
            setUserID(WebApp.initDataUnsafe.user.id)
            setInitData(WebApp.initData)
        }
    }, []);

    useEffect(() => {
        const setBaseValues = async () => {
            if (userID && initData) {
                const respons: any = await getFriends(userID, initData)
                setFriends(respons.data.referrals)
                
            }
        }

        setBaseValues()
    }, [userID, initData])

    // useEffect(() => {
    //     if (friends.length > 0) {
    //         console.log(friends)
    //     }
    // }, [friends])

    function handleCopyLink() {
        if (userID) {
            navigator.clipboard.writeText(REFERAL_LINK + userID)
        }
    }

    return (
        <div className="container">
            <div className="projectname">NCC</div>
            <div className="blur__element"></div>
            <div className="friends content">
                <h3 className="friends__title">
                    {
                        friends.length > 0 ? 'Friends You have added' : 'Friends'
                    }
                </h3>
                {
                    friends.length > 0 ? 
                    <ListFriends popUpFunc={setIsActivePopUp} friendsList={friends} /> :
                    <FriendsContent popUpFunc={setIsActivePopUp} />
                }
            </div>
            
            <Navbar></Navbar>
            {
                isActivePopUp ?

                (
                    <PopUp setCloseState={setIsActivePopUp}>
                        <img src={inviteFriendsImg} alt="frinedIMG" className="popup__friends-img" />
                        <h3 className="friends__popup-title">Invite Friends</h3>
                        <div className="friends__popup-buttons">
                            <CustomButton onclickAction={() => {}} className="friends__popup-button">Share link</CustomButton>
                            <CustomButton className="friends__popup-button" onclickAction={handleCopyLink}>Copy link</CustomButton>
                        </div>
                    </PopUp>
                )

                : null
            }
        </div>
    )
}

export default Friends