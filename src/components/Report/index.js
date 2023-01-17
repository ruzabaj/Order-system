import React, { useState } from 'react'
import "../../scss/table.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Report = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div className='container'>
            <div className='show-outlet-name'>
                <h4 className='outlet-name'>Outlet Name</h4>
            </div>
            <div className='control-dates'>
                <div>
                    <label>Start Date:</label>
                    <DatePicker selected={startDate} onChange={(date) =>
                        setStartDate(date)} className="datepicker-style" />
                </div>
                <div>
                    <label>End Date:</label>
                    <div>
                        <DatePicker selected={endDate} onChange={(date) =>
                            setEndDate(date)} className="datepicker-style" />
                    </div>
                </div>
            </div>
            <div className='dashboard'>
                <div className="row">
                    <div className="col dashboard-items">
                        <label>Total no.of items:</label>
                        <p>Total</p>
                    </div>
                    <div className="col dashboard-items">
                        <label>First Order At:</label>
                        <p>Last</p>
                    </div>
                    <div className="col dashboard-items">
                        <label>Last Order At:</label>
                        <p>Last</p>
                    </div>
                    <div className="col dashboard-items">
                        <label>Total guest:</label>
                        <p>Total</p>
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Item Name</th>
                        <th>Ordered At</th>
                        <th>Completed At</th>
                        <th>Total Time</th>
                        <th>Average Prepared Timet</th>
                        <th>Ordered At</th>
                        <th>Ordered At</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>James</td>
                        <td>Matman</td>
                        <td>Chief Sandwich Eater</td>
                        <td>Chief Sandwich Eater</td>
                        <td>Chief Sandwich Eater</td>
                        <td>Chief Sandwich Eater</td>
                        <td>Chief Sandwich Eater</td>
                        <td>Chief Sandwich Eater</td>
                    </tr>
                    <tr>
                        <td>The</td>
                        <td>Tick</td>
                        <td>Crimefighter Sorta</td>
                    </tr>
                </tbody>
            </table>
            <div className='information-report'>
                <div className='report-flex'>
                    <div className='report-info-one'>
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
                    </div>
                    <div className='report-info-two'>
                        <div className='report-info'>
                            <label>Total guest:</label>
                            <span>Total</span>
                        </div>
                        <div className='report-info'>
                            <label>Dine In:</label>
                            <span>Last</span>
                        </div>
                        <div className='report-info'>
                            <label>Takeaway:</label>
                            <span>15 X 20000</span>
                        </div>
                        <div className='report-info'>
                            <label>Voids:</label>
                            <span>Voids</span>
                        </div>
                        <div className='report-info'>
                            <label>Cooked:</label>
                            <span>Cooked</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Report