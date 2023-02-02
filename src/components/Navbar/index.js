import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faReceipt
} from '@fortawesome/free-solid-svg-icons'
import "../../scss/navbar.scss";
import { Link, useNavigate } from 'react-router-dom';
import { FiRefreshCcw } from "react-icons/fi";
import { IoPeopleOutline } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
const Navbar = () => {
    let navigate = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem('token');
        navigate("/")
    }
    return (
        <nav>
            <div className='navbar-icons'>
                <Link to="/home" >
                    <FontAwesomeIcon icon={faHome} className='nav-icon' />
                </Link>
                <label>Home</label>
            </div>
            <div className='navbar-icons'>
                <Link to="/report">
                    <TbReportSearch className='nav-icon' />
                </Link>
                <label>Report</label>
            </div>
            <div className='navbar-icons' onClick={() => window.location.reload(false)}>
                <FiRefreshCcw className='nav-icon' />
                <label>Refresh</label>
            </div>
            <div className='navbar-icons' onClick={logoutUser}>
                <IoPeopleOutline className='nav-icon' />
                <label>Logout</label>
            </div>
        </nav>
    )
}

export default Navbar
