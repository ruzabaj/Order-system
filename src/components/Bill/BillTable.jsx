import React from 'react'
import ConvertDate from './convertDate';

const BillTable = ({order, totalInfo}) => {
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
  )
}

export default BillTable