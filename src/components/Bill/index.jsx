import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'
import DatePicker from "react-datepicker";
import ConvertDate from './convertDate';
import "react-datepicker/dist/react-datepicker.css";
import "../../scss/bill.scss";
import axios from 'axios';

const Bill = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [token, setToken] = useState("");
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
    }, [])

    const viewBill = () => {
        axios.post(`https://ordersystem.silverlinepos.com/saleshistory`, {
            "outlet": "Bluestar Services Pvt Ltd.",
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
                            {/* <label >Outlet Name:</label> */}
                            <div>
                                <input
                                    type="text"
                                    className=""
                                    // value={inputValue}
                                    // onChange={handleInputChange}
                                    placeholder="Outlet Name"
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
                <div class="table-responsive-bill">
                    <table class="table-bill">
                        <tr>
                            <th>Date</th>
                            <th>Bill no:</th>
                            <th>Discount:</th>
                            <th>Sub Total: (Rs)</th>
                            <th>Service Charge</th>
                            <th>VAT(Rs)</th>
                            <th>Total(Rs)</th>
                            <th>Payment</th>
                            <th>Guest Name</th>
                        </tr>
                        {order.map((item, index) => (
                            <tr key={index}>
                                <td><ConvertDate date={item.Date} /></td>
                                <td>{item.bill_no}</td>
                                <td>{item.DiscountAmt}</td>
                                <td>{item.Subtotal}</td>
                                <td>{item.serviceCharge}</td>
                                <td>{item.VAT}</td>
                                <td>{item.Total}</td>
                                <td>{item.PaymentMode}</td>
                                <td>{item.GuestName}</td>
                            </tr>
                        ))}
                        <tr>
                            <td></td>
                            <td> <span className='detail-info'>Order : </span>{totalInfo.TotalOrders}</td>
                            <td><span className='detail-info'>Discount Sum : </span>{totalInfo.DiscountAmountSum}</td>
                            <td> <span className='detail-info'>Sub-Total Sum : </span>{totalInfo.TotalSum}</td>
                            <td> <span className='detail-info'>Service Charge Sum : </span>{totalInfo.ServiceChargeSum}</td>
                            <td> <span className='detail-info'>VAT sum : </span>{totalInfo.VatSum}</td>
                            <td><span className='detail-info'>Sum : </span>{totalInfo.TotalSum}</td>
                        </tr>

                    </table>
                </div>
                {/* <div>
                    <div className='view-totals'>
                        <label>Total: <span>{totalInfo.TotalSum}</span></label>
                        <label>VAT: <span>{totalInfo.VatSum}</span></label>
                        <label>Sub Total Sum: <span>{totalInfo.TotalSum}</span></label>
                        <label>ServiceChargeSum: <span>{totalInfo.ServiceChargeSum}</span></label>
                        <label>Order: <span>{totalInfo.TotalOrders}</span></label>
                    </div>
                </div> */}
            </section>
        </div>
    )
}

export default Bill