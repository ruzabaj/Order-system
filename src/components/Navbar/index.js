import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCutlery } from '@fortawesome/free-solid-svg-icons'
import "../../scss/navbar.scss";
import Sidebar from './sidebar';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <div className='navbar-icons'>
                <Sidebar />
            </div>
            <div className='navbar-icons'>
                <Link to="/home">
                    <FontAwesomeIcon icon={faHome} />
                </Link>
            </div>
            <div className='navbar-icon-cutlery'>
                <Link to="/on-cooking">
                    <FontAwesomeIcon icon={faCutlery} />
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
