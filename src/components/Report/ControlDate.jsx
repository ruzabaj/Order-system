import React from 'react'
import DatePicker from "react-datepicker";

const ControlDate = ({startDate, endDate, handleChange, handleGenerateReport, setStartDate, setEndDate}) => {
    return (
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
    )
}

export default ControlDate