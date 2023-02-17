import React from 'react'
import "../../scss/TimelineTable.scss"

const TimelineTable = ({ tableSumamry }) => {
    return (
        <div className="timeline-table-wrapper">
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Table No</th>
                        <th>PAX</th>
                        <th>Start Time</th>
                        <th>Bill Print Time</th>
                        <th>End Time</th>
                        <th>Duration</th>
                        <th>Type</th>
                        <th>Server</th>
                        <th>Bill No</th>
                        <th>Total</th>
                        <th>Payment Mode</th>
                        <th>Rev. Per Guest</th>
                        <th>Items</th>
                    </tr>
                </thead>
                <tbody>
                    {tableSumamry.map((info, index) => (
                        <tr key={index}>
                            <td>{info.Date}</td>
                            <td>{info.Table_No}</td>
                            <td>{info.NoOfGuests}</td>
                            <td>{info.Start_Time}</td>
                            <td>{info.billPrintTime}</td>
                            <td>{info.End_Time}</td>
                            <td>{info.duration}</td>
                            <td>{info.Type}</td>
                            <td>{info.server}</td>
                            <td>{info.bill_no}</td>
                            <td>{info.Total}</td>
                            <td>{info.PaymentMode}</td>
                            <td>{info.revperguest}</td>
                            <td className='table-summary-item'>
                                <p>{info.items}</p></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TimelineTable