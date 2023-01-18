import React, { useState, useEffect } from 'react'
import "../../scss/table.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdPeopleAlt } from "react-icons/md";
import { IoFastFoodOutline, IoFastFood } from "react-icons/io5";
import { TbNumbers } from "react-icons/tb";
import axios from 'axios';
import moment from 'moment';

const Report = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [firstDate, setFirstDate] = useState("")
    const [secondDate, setSecondDate] = useState("")
    const [outletName, setOutletName] = useState("")

    const [information, setInformation] = useState({});
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");

    let url = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        let initialDate = startDate
        let date = moment(initialDate).format();
        console.log(date)
        let firstDate = date.toString().substring(0, 10)
        console.log("1", firstDate)
        setFirstDate(firstDate)

        let lastDate = endDate
        let dates = moment(lastDate).format();
        console.log(dates)
        let secondDate = dates.toString().substring(0, 10)
        console.log("2", secondDate);
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
                console.log(response.data.orders)
                setInformation(response.data);
                setOrders(response.data.orders)
            })
            .catch((error) => {
                console.log(error)
                setError(error)
            })
    }

    return (
        <div className='container'>
            {/* <div className='show-outlet-name'>
                <h4 className='outlet-name'>Outlet Name</h4>
            </div> */}
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
            {error ?
                <div>
                    <div className='dashboard'>
                        <div className="row">
                            <div className="col dashboard-items">
                                <TbNumbers className='icon' />
                                <label>Total no.of items:</label>
                                <p>Total</p>
                            </div>
                            <div className="col dashboard-items">
                                <IoFastFoodOutline className='icon' />
                                <label>First Order At:</label>
                                <p>time</p>
                            </div>
                            <div className="col dashboard-items">
                                <IoFastFood className='icon' />
                                <label>Last Order At:</label>
                                <p>time</p>
                            </div>
                            <div className="col dashboard-items">
                                <MdPeopleAlt className='icon' />
                                <label>Total guest:</label>
                                <p>Total</p>
                            </div>
                            <div className="col dashboard-items">
                                <MdPeopleAlt className='icon' />
                                <label>Operating Hours:</label>
                                <p>Hours</p>
                            </div>
                        </div>
                        {orders.map((element, index) => (
                            <div key={index}>
                                <div className='show-table-num'>
                                    <p>tableNum</p>
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
                                            <th>Average Prepared Timet</th>
                                            <th>Prepared Time Difference</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {let getCount=element.items.map((item) => {
                            console.log(item)
                            let count = count + 1;
                            console.log(count)
                            return count
                        })} */}

                                        {element.items.map((item, index) => (
                                            <tr key={index}>
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
                                    {/* <div className='report-info'>
                            <label>Total guest:</label>
                            <span>Total</span>
                        </div> */}
                                    <div className='report-info'>
                                        <label>Dine In:</label>
                                        <span>{information.DineIn}</span>
                                    </div>
                                    <div className='report-info'>
                                        <label>Takeaway:</label>
                                        <span>{information.TakeAway}</span>
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
                :
                ""
            }
        </div>
    )
}

export default Report