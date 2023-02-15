import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './../Navbar/index';
import ComplimentaryTable from './ComplimentaryTable';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import CustomerHistory from './CustomerHistory';
import "../../scss/history.scss";

const History = () => {
  let url = process.env.REACT_APP_BASE_URL;
  const [discountTotal, setDiscountTotal] = useState("")
  const [totalSum, setTotalSum] = useState("")
  const [customerHistory, setCustomerHistory] = useState([])
  const [complimentary, setComplimentary] = useState([])
  const [complimentaryTotal, setTotal] = useState("")
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [token, setToken] = useState("");
  const [selectedOutlet, setSelectedOutlet] = useState("");
  const [inputChange, setInputChange] = useState("");

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

  const showComplimentary = () => {
    axios.post(`${url}/customersaleshistory`, {
      start_date: start,
      end_date: end,
      uname: `${inputChange}`,
      token: token,
      Outlet_Name: `${selectedOutlet}`
    })
      .then((response) => {
        console.log(response.data.Total)
        setCustomerHistory(response.data.details)
        setDiscountTotal(response.data.DiscountTotal)
        setTotalSum(response.data.Total)
      })
      .catch((error) => {
        console.log(error)
      })
    axios.post(`${url}/complimentary`, {
      start_date: start,
      end_date: end,
      uname: `${inputChange}`,
      token: token,
      Outlet_Name: `${selectedOutlet}`
    })
      .then((response) => {
        console.log(response.data.Total)
        setComplimentary(response.data.details)
        setTotal(response.data.Total)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleInputChange = (event) => {
    setInputChange(event.target.value)
  }
  return (
    <div>
      <Navbar />
      <div className='handle-date-input-btn'>
        <div className='date-picker-start'>
          <label className="">Start Date:</label>
          <DatePicker selected={startDate} dateFromat='YYYY-MM-DD' onChange={(date) => setStartDate(date)} className='date-picker' />
        </div>
        <div className='input-customer-name'>
          <input type="text" placeholder="Customer Name" onChange={handleInputChange} value={inputChange} />
        </div>
        <div className='date-picker-end'>
          <label className="">End Date:</label>
          <DatePicker selected={endDate} dateFromat='YYYY-MM-DD' onChange={(date) => setEndDate(date)} className='date-picker' />
        </div>
        <button onClick={showComplimentary} className="btn-show">Show</button>
      </div>
      <div className='customer-complimentary-history'>
        <CustomerHistory customerHistory={customerHistory} discountTotal={discountTotal} totalSum={totalSum} />
        <ComplimentaryTable complimentary={complimentary} complimentaryTotal={complimentaryTotal} />
      </div>
    </div>
  )
}

export default History