import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectSearch from 'react-select-search';
import "../../scss/bill.scss";
import axios from 'axios';
import BillTable from './BillTable';
import Dine from '../DineSidebar';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import BeverageTable from './BeverageTable';
import Foodtable from './Foodtable';
import ReactSidebar from './../ReactSidebar/index';

const Bill = () => {
    let url = process.env.REACT_APP_BASE_URL;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [listOutlet, setListOutlet] = useState([]);
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
        axios.post(`${url}/outlets`, {
            token: token
        })
            .then((response) => {
                setListOutlet(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [token])

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
                {/* <div className={arrow ? 'sidebar' : "sidebar-less"}>
                    <Dine dineinTabs={dineinTabs} paymentStatus={paymentStatus} toggleArrow={toggleArrow} arrow={arrow} startBillNum={startBillNum} endBillNum={endBillNum} FoodBeverageSum={FoodBeverageSum}/>
                </div> */}
                <div className='main-content'>
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
                            <label className="">Start Date:</label>
                            <div className='start-date'>
                                <DatePicker selected={startDate} dateFromat='YYYY-MM-DD' onChange={(date) => setStartDate(date)} className='date-picker' />
                            </div>
                            <label className="">End Date:</label>
                            <div className='end-date'>
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
                        {show &&
                            <div>
                                <BillTable order={order} totalInfo={totalInfo} />
                                <div className='food-beverage-table'>
                                    <Foodtable food={food} foodGroup={foodGroup} />
                                    <BeverageTable beverage={beverage} beverageGroup={beverageGroup} />
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