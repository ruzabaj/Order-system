import React from 'react'
import DatePicker from "react-datepicker";
import SelectSearch from 'react-select-search';
import Sidebar from '../Navbar/sidebar';
import "react-datepicker/dist/react-datepicker.css";
import 'react-select-search/style.css'
import "../../scss/navbar.scss";
import Filter from '../Filter';
// import Context from "../useContext";

const ControlDate = ({ startDate, Outlet, setOutlet, categories, endDate, handleGenerateReport, setStartDate, setEndDate, handleChange, handleSidebar, categoryVoid }) => {
    return (
        <div className='control-dates'>
            <div className='control-dates-width'>
                {/* <div className='control-dates-flex'>
                    <div>
                        <label>Outlet Name:</label>
                        <div>
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
                </div> */}
                <Filter startDate={startDate} setStartDate={setStartDate} selectedOutlet={Outlet} setSelectedOutlet={setOutlet} endDate={endDate} setEndDate={setEndDate} view={handleGenerateReport} btn={"Report"}/>
            </div>
            <div className='btn-report'>
                {/* <button type='submit' onClick={handleGenerateReport} className="btn-generate-report">
                    Generate Report
                </button> */}
                <Sidebar handleSidebar={handleSidebar} categories={categories} categoryVoid={categoryVoid} />
            </div>
            {/* <Context>
                <Sidebar handleSidebar={handleSidebar} categories={categories}/>
            </Context> */}
        </div>
    )
}

export default ControlDate