import React from 'react'
import DateFormat from "../History/DateFormat";

const PaymentTable = ({ header, data }) => {
    return (
        <div className="table-credit-responsive">
            <table className="table-credit">
                <thead>
                    <tr className='position-sticky'>
                        {header.map((headers, index) => (
                            <th className='no-wrap'  key={index}>{headers}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((info, index) => (
                        <tr key={index}>
                            <td className='no-wrap'><DateFormat date={info.Date}/></td>
                            <td className='no-wrap'>{info.Time}</td>
                            <td className='no-wrap'>{info.Amount}</td>
                            <td className='no-wrap'>{info.PaymentMode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PaymentTable