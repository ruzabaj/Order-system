import React from 'react'
import ConvertDate from './convertDate';

const BillTable = ({ order, totalInfo }) => {
    const billNum= [];
    let calculateBillNum=  order.map((item) => {
         billNum.push(item.bill_no)
    })
    console.log(calculateBillNum)
    return (
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
                    <td><span className='detail-info'>Total:</span></td>
                    <td> <span className='detail-info'>{totalInfo.TotalOrders}</span></td>
                    <td><span className='detail-info'>{totalInfo.DiscountAmountSum}</span></td>
                    <td> <span className='detail-info'>{totalInfo.SubtotalAmountSum}</span></td>
                    <td> <span className='detail-info'>{totalInfo.ServiceChargeSum}</span></td>
                    <td> <span className='detail-info'>{totalInfo.VatSum}</span></td>
                    <td><span className='detail-info'>{totalInfo.TotalSum}</span></td>
                </tr>
            </table>
        </div>
    )
}

export default BillTable