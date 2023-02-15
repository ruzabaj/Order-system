import React from 'react'

const CustomerHistory = ({customerHistory, discountTotal, totalSum}) => {
    return (
        <div className="table-responsive-food">
            <div className=''>
                <h4 className=''>Customer History</h4>
            </div>
            <div className="table-responsive">
                <table className="table-food">
                    <tr>
                        <th>Bill</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>DiscountType</th>
                        <th>DiscountType</th>
                        <th>Mode</th>
                        <th>Outlet</th>
                        <th>Total</th>
                    </tr>
                    {customerHistory.map((item) => (
                        <tr>
                            <td>{item.Bill}</td>
                            <td>{item.Customer}</td>
                            <td>{item.Date}</td>
                            <td>{item.DiscountAmt}</td>
                            <td>{item.DiscountType}</td>
                            <td>{item.Mode}</td>
                            <td>{item.Outlet}</td>
                            <td>{item.Total}</td>
                        </tr>
                    ))
                    }
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Discount: <span>{discountTotal}</span> </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Total: {totalSum}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default CustomerHistory