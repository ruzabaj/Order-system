import React from 'react'
import DatePicker from "react-datepicker";

const ControlDate = ({ startDate, endDate, handleChange, handleGenerateReport, setStartDate, setEndDate }) => {
    return (
        <div className='control-dates'>
            <div className='control-dates-flex'>
                <div>
                    <label>Outlet Name:</label>
                    {/* <div>
                        <input type="text" placeholder="Outlet Name" onChange={handleChange} className="input-style" />
                    </div> */}
                    <div>
                        <select name="outletName" id="outletName" className="input-style">
                            <option value=""></option>
                            <option value="volvo">Volvo</option>
                        </select>
                    </div>
                </div>
                <div className='date-picker'>
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
                </div>
            </div>
            <div className='btn-report'>
                <button type='submit' onClick={handleGenerateReport}>
                    Generate Report
                </button>
            </div>
        </div>
    )
}

export default ControlDate