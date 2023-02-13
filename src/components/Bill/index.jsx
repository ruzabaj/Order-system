import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectSearch from 'react-select-search';
import "../../scss/bill.scss";
import axios from 'axios';
import BillTable from './BillTable';
import Dine from '../Dine';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const Bill = () => {
    let url = process.env.REACT_APP_BASE_URL;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [token, setToken] = useState("");
    const [selectedOutlet, setSelectedOutlet] = useState("");
    const [listOutlet, setListOutlet] = useState([]);
    const [order, setOrder] = useState([]);
    const [totalInfo, setTotalInfo] = useState({});
    const [error, setError] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState({});
    const [dineinTabs, setDineinTabs] = useState({});

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
    }, [token])

    console.log("=out>", selectedOutlet)

    const viewBill = () => {
        console.log("view bill", selectedOutlet)
        axios.post(`${url}/saleshistory`, {
            "outlet": `${selectedOutlet}`,
            "dateStart": start,
            "dateEnd": end,
            "token": token
        })
            .then((response) => {
                setError(false)
                console.log(response.data)
                setTotalInfo(response.data)
                setOrder(response.data.orderDetails)
            })
            .catch((error) => {
                console.log(error)
                setError(true)
            })

        axios.post(`${url}/summaryreport`, {
            "outlet": `${selectedOutlet}`,
            "dateStart": start,
            "dateEnd": end,
            "token": token
        })
            .then((response) => {
                setDineinTabs(response.data)
                setPaymentStatus(response.data.paymentStats)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const [arrow, setArrow] = useState(true);
    const toggleArrow = () => {
        setArrow(!arrow)
    }
    return (
        <div>
            <Navbar />
            <section className='fix-width-contain'>
                <Dine dineinTabs={dineinTabs} paymentStatus={paymentStatus} />
                <button onClick={toggleArrow} className="btn-side" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" >
                    {arrow ? <AiOutlineArrowRight className='icon-arrow' /> : <AiOutlineArrowLeft className='icon-arrow' />}</button>
                <div className='container'>
                    <div className='select-options '>
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

                        <div className="date-picker-outlet-sm">
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
                            <div className='start-date'>
                                <label className="">Start Date:</label>
                                <DatePicker selected={startDate} dateFromat='YYYY-MM-DD' onChange={(date) => setStartDate(date)} className='date-picker' />
                            </div>
                            <div className='end-date'>
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
                        {error ? "" :
                            <BillTable order={order} totalInfo={totalInfo} />
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Bill