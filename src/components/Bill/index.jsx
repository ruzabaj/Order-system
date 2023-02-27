import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../scss/bill.scss";
import "../../scss/FoodBeverage.scss";
import "../../scss/filter.scss";
import axios from 'axios';
import BillTable from './BillTable';
import BeverageTable from './BeverageTable';
import Foodtable from './Foodtable';
import ReactSidebar from './../ReactSidebar/index';
import GroupTable from './Table/GroupTable';
import SelectSearchInput from "../SelectSearch";

const Bill = () => {
    let url = process.env.REACT_APP_BASE_URL;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedOutlet, setSelectedOutlet] = useState("");
    const [token, setToken] = useState("");
    const [order, setOrder] = useState([]);
    const [food, setFood] = useState([]);
    const [beverage, setBeverage] = useState([]);
    const [beverageGroup, setBeverageGroup] = useState([]);
    const [foodGroup, setFoodGroup] = useState([]);
    const [FoodBeverageSum, setFoodBeverageSum] = useState([]);
    const [totalInfo, setTotalInfo] = useState({});
    const [error, setError] = useState(false);
    const [show, setShow] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState({});
    const [dineinTabs, setDineinTabs] = useState({});
    const [arrow, setArrow] = useState(false);

    const toggleArrow = () => {
        console.log("before", arrow)
        setArrow(!arrow)
        console.log("after", arrow)
    }

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

        setSelectedOutlet(localStorage.getItem("outlet"))
    }, [])
    useEffect(() => {
        axios.post(`${url}/saleshistory`, {
            "outlet": `${selectedOutlet}`,
            "dateStart": start,
            "dateEnd": end,
            "token": token
        })
            .then((response) => {
                setError(false)
                setTotalInfo(response.data)
                setOrder(response.data.orderDetails)
                setFood(response.data.itemDetails.food)
                setBeverage(response.data.itemDetails.beverage)
                setFoodBeverageSum(response.data.itemDetails.itemSum)
                setBeverageGroup(response.data.itemDetails.beverageGroup)
                setFoodGroup(response.data.itemDetails.foodGroup)
                setShow(true)
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
                console.log(response)
                setDineinTabs(response.data)
                setPaymentStatus(response.data.paymentStats)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [selectedOutlet])

    const viewBill = () => {
        axios.post(`${url}/saleshistory`, {
            "outlet": `${selectedOutlet}`,
            "dateStart": start,
            "dateEnd": end,
            "token": token
        })
            .then((response) => {
                setError(false)
                setTotalInfo(response.data)
                setOrder(response.data.orderDetails)
                setFood(response.data.itemDetails.food)
                setBeverage(response.data.itemDetails.beverage)
                setFoodBeverageSum(response.data.itemDetails.itemSum)
                setBeverageGroup(response.data.itemDetails.beverageGroup)
                setFoodGroup(response.data.itemDetails.foodGroup)
                setShow(true)
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
                console.log(response)
                setDineinTabs(response.data)
                setPaymentStatus(response.data.paymentStats)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const [billNumber, setBillNumber] = useState([]);
    const [startBillNum, setStartBillNumber] = useState("");
    const [endBillNum, setEndBillNumber] = useState("");
    const billNum = [];

    useEffect(() => {
        order.forEach((item) => {
            {
                billNum.push(item.bill_no)
                setBillNumber(billNum)
                let len = billNum.length
                setStartBillNumber(billNum[0]);
                setEndBillNumber(billNum[len - 1]);
            }
        })
    }, [order])

    return (
        <div>
            <Navbar />
            <div className='sidebar-container'>
                <ReactSidebar dineinTabs={dineinTabs} paymentStatus={paymentStatus} toggleArrow={toggleArrow} arrow={arrow} startBillNum={startBillNum} endBillNum={endBillNum} FoodBeverageSum={FoodBeverageSum} />
                <div className={'container main-content'}>
                    <div className='select-options '>
                        <div className="date-picker-outlet">
                            <div>
                                <label className="">Start Date:</label>
                                <DatePicker selected={startDate} dateFromat='YYYY-MM-DD' onChange={(date) => setStartDate(date)} className='date-picker' />
                            </div>
                            <div>
                                <h3>{selectedOutlet}</h3>
                                <SelectSearchInput token={token} setToken={setToken} setSelectedOutlet={setSelectedOutlet} selectedOutlet={selectedOutlet} />
                            </div>
                            <div>
                                <label className="">End Date:</label>
                                <DatePicker selected={endDate} dateFromat='yyyy-mm-dd' onChange={(date) => setEndDate(date)} className='date-picker' />
                            </div>
                            <div className='btn-search-view'>
                                <button
                                    onClick={viewBill}
                                    className="btn-search">
                                    View
                                </button>
                            </div>
                        </div>

                        <div className="date-picker-outlet-sm">
                            <div>
                                <h3>{selectedOutlet}</h3>
                                <SelectSearchInput token={token} setToken={setToken} setSelectedOutlet={setSelectedOutlet} selectedOutlet={selectedOutlet} />
                            </div>
                            <div className='start-date'>
                                <label className="">Start Date:</label>
                                <DatePicker selected={startDate} dateFromat='YYYY-MM-DD' onChange={(date) => setStartDate(date)} className='date-picker' />
                            </div>
                            <div className='end-date'>
                                <label className="">End Date:</label>
                                <DatePicker selected={endDate} dateFromat='yyyy-mm-dd' onChange={(date) => setEndDate(date)} className='date-picker' />
                            </div>
                            <div className='btn-search-view'>
                                <button
                                    onClick={viewBill}
                                    className="btn-search">
                                    View
                                </button>
                            </div>
                        </div>

                        {show &&
                            <div>
                                <BillTable order={order} totalInfo={totalInfo} />
                                <div className='food-beverage-table-width'>
                                    <div className='food-beverage-table'>
                                        <Foodtable food={food} foodGroup={foodGroup} />
                                        <BeverageTable beverage={beverage} beverageGroup={beverageGroup} />
                                    </div>
                                </div>
                                <div className='group-table-width'>
                                    <GroupTable Group={foodGroup} title={"Food"} />
                                    <GroupTable Group={beverageGroup} title={"Beverage"} />
                                </div>
                            </div>
                        }
                        {error &&
                            <div>
                                <p>An error occured!!</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bill