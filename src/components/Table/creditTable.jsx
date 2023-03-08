import React from 'react'
import DateFormat from "../History/DateFormat";

const CreditTable = ({ header, data }) => {
    return (
        <div className="table-credit-responsive">
            <table className="table-credit">
                <thead>
                    <tr className='position-sticky'>
                        {header.map((headers) => (
                            <th className='no-wrap'>{headers}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((info, index) => (
                        <tr key={index}>
                            <td className='no-wrap'>{info.bill_no}</td>
                            <td className='no-wrap'><DateFormat date={info.Date}/></td>
                            <td className='no-wrap'>{info.DiscountAmt}</td>
                            <td className='no-wrap'>{info.Total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CreditTable