import { useState, useEffect } from 'react'
import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'

const navBarLinks = [
    '/',
    '/friends',
    '/tasks',
    '/boosts'
]

const navBarSVGs = [
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 19.6577H4M4 19.6577H10M4 19.6577V11.2889C4 10.7658 4 10.5041 4.06497 10.2606C4.12255 10.0449 4.21779 9.84077 4.3457 9.65629C4.49004 9.44811 4.69064 9.27549 5.09277 8.93099L9.89436 4.81762C10.6398 4.17899 11.0126 3.85965 11.4324 3.7381C11.8026 3.63092 12.1972 3.63092 12.5674 3.7381C12.9875 3.85974 13.3608 4.17938 14.1074 4.81898L18.9074 8.93099C19.3095 9.27548 19.5102 9.44812 19.6546 9.65629C19.7825 9.84077 19.877 10.0449 19.9346 10.2606C19.9995 10.5041 20 10.7658 20 11.2889V19.6577M10 19.6577H14M10 19.6577V15.7415C10 14.6601 10.8954 13.7834 12 13.7834C13.1046 13.7834 14 14.6601 14 15.7415V19.6577M14 19.6577H20M20 19.6577H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 17H20M8 15L5.5 18L4 17M11 12H20M8 10L5.5 13L4 12M11 7H20M8 5L5.5 8L4 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.0005 7L14.1543 12.9375C14.0493 13.0441 13.9962 13.0976 13.9492 13.1396C13.1899 13.8193 12.0416 13.8193 11.2822 13.1396C11.2352 13.0976 11.1817 13.0442 11.0767 12.9375C10.9716 12.8308 10.9191 12.7774 10.8721 12.7354C10.1127 12.0557 8.96397 12.0557 8.20461 12.7354C8.15771 12.7773 8.10532 12.8305 8.00078 12.9367L4 17M20.0005 7L20 13M20.0005 7H14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
]


function Navbar() {
    const [activeIndex, setActiveIndex] = useState(5)
    const location = useLocation()

    useEffect(() => {
        const currentPath = location.pathname
        const currentIndex = navBarLinks.indexOf(currentPath)
        setActiveIndex(currentIndex)
    }, [location])

    return (
        <nav className="nav">
            <ul className='nav__elements'>
                {navBarLinks.map((link, index) => {
                    return (
                        <li className='nav__elements-item'>
                            
                            <Link to={link}>
                                <span 
                                    className={`nav__elements-img ${activeIndex === index ? 'active__link': ''}`}
                                    dangerouslySetInnerHTML={{ __html: navBarSVGs[index]}}
                                    onTouchStart={() => setActiveIndex(index)}
                                    key={index}
                                    />
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}


export default Navbar