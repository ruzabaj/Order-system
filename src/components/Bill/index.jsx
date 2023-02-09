import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectSearch from 'react-select-search';
import "../../scss/bill.scss";
import axios from 'axios';
import BillTable from './BillTable';


const Bill = () => {
    let url = process.env.REACT_APP_BASE_URL;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [token, setToken] = useState("");
    const [selectedOutlet, setSelectedOutlet] = useState("");
    const [listOutlet, setListOutlet] = useState([]);
    const [order, setOrder] = useState([]);
    const [totalInfo, setTotalInfo] = useState({});

    let start = startDate.toISOString().slice(0, 10)
    let end = endDate.toISOString().slice(0, 10)
    let navigate = useNavigate();

    useEffect(() => {
        let tokenCheck = localStorage.getItem("token");
        if (!tokenCheck) {
            navigate('/')
        } else {
            setToken(localStorage.getItem("token"))
        }
        // let outletCheck = localStorage.getItem("outlet");
        // if (!outletCheck) {
        //     return
        // } else {
        //     setSelectedOutlet(localStorage.getItem("outlet"))
        // }
        setSelectedOutlet(localStorage.getItem("outlet"))

        console.log("=>", selectedOutlet)
    }, [])
    useEffect(() => {
        axios.post(`${url}/outlets`, {
            token: token
        })
            .then((response) => {
                console.log('to get outlet name', response)
                setListOutlet(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    },[token])
    
    console.log("=out>", selectedOutlet)

    const viewBill = () => {
        axios.post(`${url}/saleshistory`, {
            "outlet": `${selectedOutlet}`,
            "dateStart": start,
            "dateEnd": end,
            "token": token
        })
            .then((response) => {
                console.log(response.data)
                setTotalInfo(response.data)
                setOrder(response.data.orderDetails)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div>
            <Navbar />
            <section className='container'>
                <div className='select-options'>
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
                    <div className='btn-search-view'>
                        <button
                            onClick={viewBill}
                            className="btn-search">
                            View
                        </button>
                    </div>
                </div>
                <BillTable order={order} totalInfo={totalInfo} />
            </section>
        </div>
    )
}

export default Bill