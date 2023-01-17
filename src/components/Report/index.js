import React from 'react'
import "../../scss/table.scss";

const Report = () => {
    return (
        <div>
            <div className='control-dates'>
                <div>
                    <label>Start Date:</label>
                    <div>
                        <input type="text"/>
                    </div>
                </div>
                <div>
                    <label>End Date:</label>
                    <div>
                        <input type="text"/>
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Item Name</th>
                        <th>Ordered At</th>
                        <th>Completed At</th>
                        <th>Total Time</th>
                        <th>Average Prepared Timet</th>
                        <th>Ordered At</th>
                        <th>Ordered At</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>James</td>
                        <td>Matman</td>
                        <td>Chief Sandwich Eater</td>
                    </tr>
                    <tr>
                        <td>The</td>
                        <td>Tick</td>
                        <td>Crimefighter Sorta</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Report