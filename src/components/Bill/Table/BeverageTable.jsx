import React from 'react'
// import BeverageGroupTable from '../Bill/Table/BeverageGroupTable';
// import GroupTable from '../Bill/Table/GroupTable';

const BeverageTable = ({ beverage, beverageGroup }) => {
    return (
        <div>
            <div className="table-responsive-beverage">
                <div className='bg-heading-food'>
                    <h4 className='beverage-heading'>Beverage</h4>
                </div>
                <div className="table-responsive">
                    <table className="table-beverage">
                        <tr>
                            <th>Group</th>
                            <th>Item Name </th>
                            <th>Item Rate (Rs)</th>
                            <th>Quantity</th>
                            <th>Total(Rs)</th>
                        </tr>
                        {!beverage?.error && 
                        beverage.map((item, index) => (
                            <tr key={index}>
                                <td>{item.Description}</td>
                                <td>{item.itemName}</td>
                                <td>{item.itemrate}</td>
                                <td>{item.quantity}</td>
                                <td>{item.total}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div >
        </div>
    )
}

export default BeverageTable