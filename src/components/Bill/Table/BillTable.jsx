import React, { useState, useEffect, useRef } from 'react'
import ConvertDate from '../convertDate';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import axios from 'axios';
import BillDetail from '../../Modal/BillDetail';

const BillTable = ({ order, isOrder, totalInfo, selected, token }) => {
    let url = process.env.REACT_APP_BASE_URL;
    const [isChecked, setIsChecked] = useState(true);
    const [totalSubUnit, setTotalSubUnit] = useState("");
    const [ServiceSum, setServiceSum] = useState("");
    const [showSubTotal, setShowSubTotal] = useState([]);
    const [showServiceCharge, setServiceCharge] = useState([]);
    const tableRef = useRef(null);
    const [billInfo, setBillInfo] = useState({});
    const [billInfoList, setBillInfoList] = useState([])

    const handleCheckbox = () => {
        setIsChecked(!isChecked)
    }

    let SubTotal = [];
    let ServiceCharge = [];

    useEffect(() => {
        order.forEach((item) => {
            {
                let newSubTotal = (item.Total / 1.243).toFixed(2)
                let newServiceCharge = (newSubTotal / 10).toFixed(2);
                SubTotal.push(newSubTotal)
                setShowSubTotal(SubTotal)

                ServiceCharge.push(newServiceCharge)
                setServiceCharge(ServiceCharge)

                let sum = 0;
                let serviceSum = 0;
                SubTotal.forEach((unit) => {
                    sum += parseFloat(unit);
                })
                setTotalSubUnit(sum.toFixed(2))
                ServiceCharge.forEach((unit) => {
                    serviceSum += parseFloat(unit);
                })
                setServiceSum(serviceSum.toFixed(2))
            }
        })
    }, [order])

    const handleBillInfo = (bill, date) => {
        const convertDate = new Date(date).toISOString().substring(0, 10);
        axios.post(`${url}/billinfo`, {
            bill_no: `${bill}`,
            Date: `${convertDate}`,
            Outlet_Name: `${selected}`,
            token: `${token}`
        })
            .then((response) => {
                if (response?.data) {
                    // console.log(response?.data)
                    setBillInfoList(response.data.details)
                    setBillInfo(response.data)
                }
            })
            .catch((error) => {
                // console.log(error)
            })
    }
    return (
        <div>
            <DownloadTableExcel
                filename="users_table"
                sheet="users"
                currentTableRef={tableRef.current}
            >
                <button className='export'> Export </button>
            </DownloadTableExcel>
            <div class="table-responsive-bill" ref={tableRef}>
                <table class="table-bill" >
                    <tr>
                        <th>Date</th>
                        <th>Bill no:</th>
                        <th>Discount: (Rs)</th>
                        <th>Sub Total: (Rs)</th>
                        <th>Service Charge<input type="checkbox" className='checkbox' onChange={handleCheckbox} /></th>
                        <th>VAT(Rs)</th>
                        <th>Total(Rs)</th>
                        <th>Payment</th>
                        <th>Guest Name</th>
                    </tr>

                    {!order?.error &&
                        order.map((item, index) => (
                            <tr key={index}>
                                <td className='no-wrap'><ConvertDate date={item.Date} /></td>
                                <td><button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleBillInfo(item.bill_no, item.Date)}>{item.bill_no}</button></td>
                                <td>{item.DiscountAmt}</td>
                                <td> {isChecked ? item.Subtotal : showSubTotal[index]}</td>
                                <td> {isChecked ? item.serviceCharge : showServiceCharge[index]}</td>
                                <td>{item.VAT}</td>
                                <td>{item.Total}</td>
                                <td className='no-wrap'>{item.PaymentMode}</td>
                                <td>{item.GuestName}</td>
                            </tr>
                        ))}
                    {isOrder &&
                        <tr>
                            <td><span className='detail-info'>Total:</span></td>
                            <td> <span className='detail-info'>{totalInfo.TotalOrders}</span></td>
                            <td><span className='detail-info'>{totalInfo.DiscountAmountSum}</span></td>
                            <td> <span className='detail-info'>{isChecked ? totalInfo.SubtotalAmountSum : totalSubUnit}</span></td>
                            <td> <span className='detail-info'>{isChecked ? totalInfo.ServiceChargeSum : ServiceSum}</span></td>
                            <td> <span className='detail-info'>{totalInfo.VatSum}</span></td>
                            <td><span className='detail-info'>{totalInfo.TotalSum}</span></td>
                        </tr>
                    }
                </table>
            </div>
            <BillDetail billInfo={billInfo} billInfoList={billInfoList} selected={selected} />
        </div>
    )
}

export default BillTable