import React
, { useState, useEffect }
    from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectSearch from 'react-select-search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FIlter = ({ startDate, setStartDate, endDate, setEndDate, selectedOutlet, setSelectedOutlet }) => {
    let url = process.env.REACT_APP_BASE_URL;
    const [listOutlet, setListOutlet] = useState([]);
    const [token, setToken] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        let tokenCheck = localStorage.getItem("token");
        if (!tokenCheck) {
            navigate('/')
        } else {
            setToken(localStorage.getItem("token"))
        }
    }, [])

    useEffect(() => {
        if (token) {
            axios.post(`${url}/outlets`, {
                token: token
            })
                .then((response) => {
                    setListOutlet(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [token])

    return (
        <div className="date-picker-outlet">
            <div>
                <label className="">Start Date:</label>
                <DatePicker selected={startDate} dateFromat='YYYY-MM-DD' onChange={(date) => setStartDate(date)} className='date-picker' />
            </div>
            <div>
                <div>
                    <h3>{selectedOutlet}</h3>
                    <SelectSearch
                        defaultValue={selectedOutlet}
                        search
                        placeholder="Select Outlet Name"
                        onChange={(event) => setSelectedOutlet(event)}
                        options={listOutlet}
                    />
                </div>
            </div>
            <div>
                <label className="">End Date:</label>
                <DatePicker selected={endDate} dateFromat='yyyy-mm-dd' onChange={(date) => setEndDate(date)} className='date-picker' />
            </div>
        </div>
    )
}

export default FIlter