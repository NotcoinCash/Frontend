import './Navbar.css'
import { Link } from 'react-router-dom'

import boostIMG from '../../assets/nav/boost.svg'
import friendsIMG from '../../assets/nav/friends.svg'
import homeIMG from '../../assets/nav/home.svg'
import tasksIMG from '../../assets/nav/task.svg'

const navBarLinks = [
    '/',
    '/friends',
    '/tasks',
    '/boosts'
]

const navBarImages = [
    homeIMG,
    friendsIMG,
    tasksIMG,
    boostIMG
]

const navBarAlt = [
    'Home',
    'Friends',
    'Tasks',
    'Boosts'
]

function Navbar() {
    return (
        <nav className="nav">
            <ul className='nav__elements'>
                {navBarLinks.map((link, index) => {
                    return (
                        <li key={index} className='active__link nav__elements-item'>
                            <Link to={link}>
                                <img src={navBarImages[index]} alt={navBarAlt[index]} />
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}


export default Navbar