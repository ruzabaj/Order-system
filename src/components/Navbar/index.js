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
import { TbReportSearch, TbZoomMoney, TbTimeline,TbToolsKitchen, TbCalendarTime } from "react-icons/tb";
import { ImStatsDots } from "react-icons/im";
import { GrPerformance } from "react-icons/gr";
const Navbar = () => {
    let navigate = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('outlet');
        navigate("/")
    }
    return (
        <nav>
            <Link to="/bill">
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
            <Link to="/home" >
                <div className='navbar-icons'>
                    {/* <TbZoomMoney  /> */}
                    <TbToolsKitchen className='nav-icon'/>
                    <label>Kitchen</label>
                </div>
            </Link>
            <Link to="/history">
                <div className='navbar-icons'>
                    <AiOutlineHistory className='nav-icon' />
                    <label>History</label>
                </div>
            </Link>
            <Link to="/stats">
                <div className='navbar-icons'>
                    <ImStatsDots className='nav-icon' />
                    <label>Stats</label>
                </div>
            </Link>
            <Link to="/timeline">
                <div className='navbar-icons'>
                    <TbTimeline className='nav-icon' />
                    <label>Timeline</label>
                </div>
            </Link>
            <Link to="/performance">
                <div className='navbar-icons'>
                    <TbCalendarTime className='nav-icon'/>
                    <label>Performance</label>
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
        </nav>
    )
}

export default Navbar
