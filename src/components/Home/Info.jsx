import React from 'react'
import { IoFastFoodOutline, IoFastFood, IoPeopleOutline } from "react-icons/io5";
import { FcClock } from "react-icons/fc";
import { RiNumbersLine } from "react-icons/ri";
import "../../scss/info.scss";

const Info = ({ info }) => {
    const { completedToday, cooking, itemsCompetedToday, started, totalOrdersToday } = info
    return (
        <div className='dashboard'>
            <div className="row">
                <div className="col dashboard-items">
                    <FcClock className='icon' />
                    <div className='padding-dashboard-items'>
                        <label>Orders not seen:</label>
                        <p>{started}</p>
                    </div>
                </div>
                <div className="col dashboard-items">
                    <IoFastFoodOutline className='icon' />
                    <div className='padding-dashboard-items'>
                        <label>Cooking:</label>
                        <p>{cooking}</p>
                    </div>
                </div>
                <div className="col dashboard-items">
                    <IoFastFood className='icon' />
                    <div className='padding-dashboard-items'>
                        <label>Cooked:</label>
                        <p>{completedToday}</p>
                    </div>
                </div>
                <div className="col dashboard-items">
                    <IoPeopleOutline className='icon' />
                    <div className='padding-dashboard-items'>
                        <label>Total Orders today:</label>
                        <p>{totalOrdersToday}</p>
                    </div>
                </div>
                <div className="col dashboard-items">
                    <RiNumbersLine className='icon' />
                    <div className='padding-dashboard-items'>
                        <label>Total items prepared:</label>
                        <p>{itemsCompetedToday}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info