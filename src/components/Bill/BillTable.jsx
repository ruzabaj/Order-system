import React, { useState, useEffect } from 'react'
import ConvertDate from './convertDate';
import CalculateTotal from './calculateTotal';

const BillTable = ({ order, totalInfo }) => {
    const [isChecked, setIsChecked] = useState(true);
    const [totalSubUnit, setTotalSubUnit] = useState("");
    const [ServiceSum, setServiceSum] = useState("");
    const [showSubTotal, setShowSubTotal] = useState([]);
    const [showServiceCharge, setServiceCharge] = useState([]);

    const handleCheckbox = () => {
        console.log("handle check box", isChecked)
        setIsChecked(!isChecked)
        console.log(isChecked)
    }

    let SubTotal = [];
    let ServiceCharge = [];

    useEffect(() => {
        order.forEach((item) => {
            {
                let newSubTotal = (item.Total / 1.243).toFixed(3)
                let newServiceCharge = (newSubTotal / 10).toFixed(3);
                SubTotal.push(newSubTotal)
                setShowSubTotal(SubTotal)

                ServiceCharge.push(newServiceCharge)
                setServiceCharge(ServiceCharge)

                let sum = 0;
                let serviceSum = 0;
                SubTotal.forEach((unit) => {
                    sum += parseFloat(unit);
                })
                setTotalSubUnit(sum.toFixed(3))
                ServiceCharge.forEach((unit) => {
                    serviceSum += parseFloat(unit);
                })
                setServiceSum(serviceSum.toFixed(3))
            }
        })
    }, [order])

    return (
        <div class="table-responsive-bill">
            <table class="table-bill">
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

                {order.map((item, index) => (
                    <tr key={index}>
                        <td><ConvertDate date={item.Date} /></td>
                        <td>{item.bill_no}</td>
                        <td>{item.DiscountAmt}</td>
                        <td> {isChecked ? item.Subtotal: showSubTotal[index]}</td>
                        <td> {isChecked ? item.serviceCharge: showServiceCharge[index]}</td>
                        <td>{item.VAT}</td>
                        <td>{item.Total}</td>
                        <td>{item.PaymentMode}</td>
                        <td>{item.GuestName}</td>
                    </tr>
                ))}
                <tr>
                    <td><span className='detail-info'>Total:</span></td>
                    <td> <span className='detail-info'>{totalInfo.TotalOrders}</span></td>
                    <td><span className='detail-info'>{totalInfo.DiscountAmountSum}</span></td>
                    <td> <span className='detail-info'>{isChecked ? totalInfo.SubtotalAmountSum : totalSubUnit}</span></td>
                    <td> <span className='detail-info'>{isChecked ? totalInfo.ServiceChargeSum : ServiceSum}</span></td>
                    <td> <span className='detail-info'>{totalInfo.VatSum}</span></td>
                    <td><span className='detail-info'>{totalInfo.TotalSum}</span></td>
                </tr>
            </table>
        </div>
    )
}

export default BillTable