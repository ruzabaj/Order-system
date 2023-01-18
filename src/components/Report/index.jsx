import React, { useState, useEffect } from 'react'
import "../../scss/table.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoFastFoodOutline, IoFastFood, IoPeopleOutline } from "react-icons/io5";
import { TbNumbers } from "react-icons/tb";
import { FcClock } from "react-icons/fc";
import axios from 'axios';
import moment from 'moment';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';

const Report = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [firstDate, setFirstDate] = useState("")
    const [secondDate, setSecondDate] = useState("")
    const [outletName, setOutletName] = useState("")

    const [information, setInformation] = useState({});
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(true);
    // const [totalCount, setCount] = useState("");

    let url = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        let initialDate = startDate
        let date = moment(initialDate).format();
        let firstDate = date.toString().substring(0, 10)
        setFirstDate(firstDate)

        let lastDate = endDate
        let dates = moment(lastDate).format();
        let secondDate = dates.toString().substring(0, 10)
        setSecondDate(secondDate);

    }, [startDate, endDate])

    const handleChange = (event) => {
        setOutletName(event.target.value)
    }
    const handleGenerateReport = () => {
        axios.post(`${url}/report`, {
            "start_date": firstDate,
            "end_date": secondDate,
            "outlet_name": outletName
        })
            .then((response) => {
                setInformation(response.data);
                setOrders(response.data.orders)
                setError(false)
            })
            .catch((error) => {
                setError(true)
            })
    }
    let count = 0;
    const calculateCount = () => {
        count = count + 1;
        return count
    }
    return (
        <div className='container'>
            <div className='control-dates'>
                <div>
                    <label>Outlet Name:</label>
                    <div>
                        <input type="text" placeholder="Outlet Name" onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <label>Start Date:</label>
                    <DatePicker selected={startDate} onChange={(date) =>
                        setStartDate(date)} className="datepicker-style" dateFormat={"yyyy-MM-dd"} />
                </div>
                <div>
                    <label>End Date:</label>
                    <div>
                        <DatePicker selected={endDate} onChange={(date) =>
                            setEndDate(date)} className="datepicker-style" dateFormat={"yyyy-MM-dd"} />
                    </div>
                </div>
                <button type='submit' className='btn-report' onClick={handleGenerateReport}>
                    Generate Report
                </button>
            </div>
            {error ? " Error" :
                <div>
                    <div className='dashboard'>
                        <div className="row">
                            <div className="col dashboard-items">
                                <TbNumbers className='icon' />
                                <div>
                                    <label>Total no.of items:</label>
                                    {/* <p>{calculateCount()}</p> */}
                                </div>
                            </div>
                            <div className="col dashboard-items">
                                <IoFastFoodOutline className='icon' />
                                <div>
                                    <label>First Order At:</label>
                                    <p>{information.first_orderAt}</p>
                                </div>
                            </div>
                            <div className="col dashboard-items">
                                <IoFastFood className='icon' />
                                <div>
                                    <label>Last Order At:</label>
                                    <p>{information.last_orderAt}</p>
                                </div>
                            </div>
                            <div className="col dashboard-items">
                                <IoPeopleOutline className='icon' />
                                <div>
                                    <label>Total guest:</label>
                                    <p>{information.Guest_count}</p>
                                </div>
                            </div>
                            <div className="col dashboard-items">
                                <FcClock className='icon' />
                                <div>
                                    <label>Operating Hours:</label>
                                    <p>{information.Operating_hours}</p>
                                </div>
                            </div>
                        </div>

                        {orders.map((element, index) => (
                            <div key={index} className="information">
                                <div className='show-table-num'>
                                    <p>{element.TableNum}</p>
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
                                                {calculateCount()}
                                                <td>{index + 1}</td>
                                                <td>{item.Quantity}</td>
                                                <td>{item.ItemName}</td>
                                                <td>{item.orderedAt}</td>
                                                <td>{item.completedAt}</td>
                                                <td>{item.TotalTime}</td>
                                                <td>{item.AvgPrepTime}</td>
                                                <td>{item.prepTimeDifference}</td>
                                            </tr>

                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                        <div className='information-report'>
                            <div className='report-flex'>
                                {/* <div className='report-info-one'>
                        <div className='report-info'>
                            <label>Total no.of items:</label>
                            <span>Total</span>
                        </div>
                        <div className='report-info'>
                            <label>First Order At:</label>
                            <span>Last</span>
                        </div>
                        <div className='report-info'>
                            <label>Last Order At:</label>
                            <span>Last</span>
                        </div>
                        <div className='report-info'>
                            <label>Operating Hours:</label>
                            <span>Hours</span>
                        </div>
                    </div> */}
                                <div className='report-info-two'>
                                    <div className='report-info'>
                                        <label>Dine In:</label>
                                        <span>{information.DineIn_totalSales}</span>
                                    </div>
                                    <div className='report-info'>
                                        <label>Takeaway:</label>
                                        <span>{information.TakeAway_totalSales}</span>
                                    </div>
                                    <div className='report-info'>
                                        <label>Voids:</label>
                                        <span>{information.Voids}</span>
                                    </div>
                                    <div className='report-info'>
                                        <label>Cooked:</label>
                                        <span>{information.Cooked}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Report