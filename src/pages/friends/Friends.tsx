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
                friendsList.map((friend, index) => {
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
    const [referalLink, setReferalLink] = useState<string>('')

    useEffect(() => {
        setInitData('query_id=AAH3P2gzAAAAAPc_aDN10jtS&user=%7B%22id%22%3A862470135%2C%22first_name%22%3A%22Mukhailo%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22half_zero%22%2C%22language_code%22%3A%22uk%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FbDiaun_9We6PjACSd18X59xT-2733ewKHAgQ6mSx7Dg.svg%22%7D&auth_date=1731747785&hash=414d95d81477d0a010cbae08a156452b89d7151d71d0481693a3e4c29e447a37')
        setUserID(862470135)
    }, [])

    useEffect(() => {
        const setBaseValues = async () => {
            if (userID && initData) {
                const respons = await getFriends(userID, initData)
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
                            <CustomButton className="friends__popup-button">Share link</CustomButton>
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