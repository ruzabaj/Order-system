import React from 'react'
import { IoFastFoodOutline, IoFastFood, IoPeopleOutline } from "react-icons/io5";
import { TbNumbers } from "react-icons/tb";
import { FcClock } from "react-icons/fc";
import { RiNumbersLine } from "react-icons/ri";
import Difference from './Difference';

const Information = ({ orders, information }) => {
    const { first_orderAt, last_orderAt, Guest_count, Operating_hours, item_count } = information;

    return (
        <div className='dashboard'>
            <div className="row">
                <div className="col dashboard-items">
                    <RiNumbersLine className='icon' />
                    <div className='padding-dashboard-items'>
                        <label>Total no.of items:</label>
                        <p>{item_count}</p>
                        {/* <label>Items per page:</label>
                                    <p>{totalCount}</p> */}
                    </div>
                </div>
                <div className="col dashboard-items">
                    <IoFastFoodOutline className='icon' />
                    <div className='padding-dashboard-items'>
                        <label>First Order At:</label>
                        <p>{first_orderAt}</p>
                    </div>
                </div>
                <div className="col dashboard-items">
                    <IoFastFood className='icon' />
                    <div className='padding-dashboard-items'>
                        <label>Last Order At:</label>
                        <p>{last_orderAt}</p>
                    </div>
                </div>
                <div className="col dashboard-items">
                    <IoPeopleOutline className='icon' />
                    <div className='padding-dashboard-items'>
                        <label>Total guest:</label>
                        <p>{Guest_count}</p>
                    </div>
                </div>
                <div className="col dashboard-items">
                    <FcClock className='icon' />
                    <div className='padding-dashboard-items'>
                        <label>Operating Hours:</label>
                        <p>{Operating_hours}</p>
                    </div>
                </div>
            </div>

            {orders.map((element, index) => (
                <div key={index} className="information">
                    <div className='show-table-num'>
                        <p>{(element.TableNum === "Take-Away") ? "" : "Table :"}<span>{element.TableNum}</span></p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Quantity</th>
                                <th>Item Name</th>
                                <th>Ordered At</th>
                                <th>Completed At</th>
                                <th>Total Time</th>
                                <th>Average Prepared Time</th>
                                <th>Prepared Time Difference</th>
                            </tr>
                        </thead>
                        <tbody>
                            {element.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.Quantity}</td>
                                    <td>{item.ItemName}</td>
                                    <td>{item.orderedAt}</td>
                                    <td>{item.completedAt}</td>
                                    <td>{item.TotalTime}</td>
                                    {(item.prepTimeDifference) ?
                                        <td>{item.AvgPrepTime}</td>
                                        : ''}

                                    {(item.prepTimeDifference) ?
                                        <td ><Difference total={item.TotalTime} average={item.AvgPrepTime} difference={item.prepTimeDifference}/></td>
                                        : ''}
                                    
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    )
}

export default Information