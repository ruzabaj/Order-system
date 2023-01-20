import React from 'react'
import DatePicker from "react-datepicker";
import SelectSearch from 'react-select-search';
import Sidebar from '../Navbar/sidebar';
import "react-datepicker/dist/react-datepicker.css";
import 'react-select-search/style.css'
import "../../scss/navbar.scss";

const ControlDate = ({ startDate, endDate, handleGenerateReport, setStartDate, setEndDate, outlet, handleChange, handleSidebar, dessert, entree, salad, appetizer}) => {
    return (
        <div className='control-dates'>
            <div className='control-dates-flex'>
                <div>
                    <label>Outlet Name:</label>
                    <div>
                        {/* <select name="outletName" id="outletName" className="input-style" onChange={handleChange}>
                            <option value=""></option>
                            {outlet.map((outlets, index) => (
                                <option value={outlets.outlet_Name} key={index} >{outlets.outlet_Name}</option>
                            ))}
                        </select> */}
                        <SelectSearch
                            options={outlet}
                            defaultValue=""
                            search
                            placeholder="Select Outlet Name"
                            onChange={(e) => handleChange(e)}
                        />
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
                <Sidebar handleSidebar={handleSidebar} dessert={dessert} appetizer={appetizer} entree={entree} salad={salad}/>
        </div>
    )
}

export default ControlDate