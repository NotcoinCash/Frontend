import Navbar from "../../components/navbar/Navbar";
import TapIMG from '../../assets/tasks/tap.svg'
import MaximizerIMG from '../../assets/boosts/maximizer.svg'
import ChargerIMG from '../../assets/boosts/charger.svg'
// import { useState } from "react";
import './Boost.css'


function Boost() {
    const boosts = [
        {
            img: TapIMG,
            title: 'Tap',
            price: '2500',
            level: '1',
        },
        {
            img: MaximizerIMG,
            title: 'Maximizer',
            price: '2500',
            level: '1',
        },
        {
            img: ChargerIMG,
            title: 'Charger',
            price: '500',
            level: '1',
        }
    ]
    // const [boosts, setBoosts] = useState([
    //     {
    //         img: TapIMG,
    //         title: 'Tap',
    //         price: '2500',
    //         level: '1',
    //     },
    //     {
    //         img: MaximizerIMG,
    //         title: 'Maximizer',
    //         price: '2500',
    //         level: '1',
    //     },
    //     {
    //         img: ChargerIMG,
    //         title: 'Charger',
    //         price: '500',
    //         level: '1',
    //     }
    // ])

    return (
        <div className="container">
            <div className="blur__element"></div>
            <div className="container">
                <div className="projectname">NCC</div>
                <div className="content">
                    <h3 className="boosts__title">Boost</h3>
                    <p className="boosts__text">Use boosters to improve your progress and ern more coins</p>
                    <div className="sub__content">
                        <div className="boosts__items">
                            {
                                boosts.map((boost) => {
                                    return (
                                        <div className="boosts__item">
                                            <div className="boosts__item-content">
                                                <div className="boosts__img-wrapper">
                                                    <img src={boost.img} className="boosts__item-img" />
                                                </div>
                                                <div className="boosts__content-wrapper">
                                                    <div className="boosts__item-title">{boost.title}</div>
                                                    <div className="boosts__item-price">{Number(boost.price).toLocaleString('en-US')}</div>
                                                </div>
                                            </div>
                                            <div className="boosts__level">
                                                <div className="boosts__level-item">{boost.level} lvl</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Navbar></Navbar>
        </div>
    );
}

export default Boost