import React, {useState} from 'react'

const ComplimentaryTable = ({ complimentary, complimentaryTotal }) => {
    return (
        <div className="table-responsive-food">
            <div className=''>
                <h4 className=''>Complimentary Outlet</h4>
            </div>
            <div className="table-responsive">
                <table className="table-food">
                    <tr>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Cost</th>
                        <th>Mode</th>
                    </tr>
                    {complimentary.map((item) => (
                        <tr>
                            <td>{item.Date}</td>
                            <td>{item.Customer}</td>
                            <td>{item.Total}</td>
                            <td>{ }</td>
                            <td>{item.Mode}</td>
                        </tr>
                    ))
                    }
                    <tr>
                        <td>Total Complimentary:</td>
                        <td></td>
                        <td>{complimentaryTotal}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default ComplimentaryTable