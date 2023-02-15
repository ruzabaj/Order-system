import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faReceipt
} from '@fortawesome/free-solid-svg-icons'
import "../../scss/navbar.scss";
import { AiOutlineHistory } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { FiRefreshCcw } from "react-icons/fi";
import { IoPeopleOutline } from "react-icons/io5";
import { TbReportSearch, TbZoomMoney } from "react-icons/tb";
const Navbar = () => {
    let navigate = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('outlet');
        navigate("/")
    }
    return (
        <nav>
            <Link to="/home" >
                <div className='navbar-icons'>
                    <FontAwesomeIcon icon={faHome} className='nav-icon' />
                    <label>Home</label>
                </div>
            </Link>
            <Link to="/report">
                <div className='navbar-icons'>
                    <TbReportSearch className='nav-icon' />
                    <label>Report</label>
                </div>
            </Link>
            <div className='navbar-icons' onClick={() => window.location.reload(false)}>
                <FiRefreshCcw className='nav-icon' />
                <label>Refresh</label>
            </div>
            <div className='navbar-icons' onClick={logoutUser}>
                <IoPeopleOutline className='nav-icon' />
                <label>Logout </label>
            </div>
            <Link to="/bill">
                <div className='navbar-icons'>
                    <TbZoomMoney className='nav-icon' />
                    <label>Bill</label>
                </div>
            </Link>
            <Link to="/bill">
                <div className='navbar-icons'>
                    <AiOutlineHistory className='nav-icon' />
                    <label>History</label>
                </div>
            </Link>
        </nav>
    )
}

export default Navbar
