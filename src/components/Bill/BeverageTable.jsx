import React from 'react'

const BeverageTable = ({ beverage }) => {
    return (
        <div className="table-responsive-beverage">
            <div className='bg-heading-food'>
                <h4 className='beverage-heading'>Beverage</h4>
            </div>
            <div className="table-responsive">
                <table className="table-beverage">
                    <tr>
                        {/* <th>ItemType</th> */}
                        <th>Group</th>
                        <th>Item Name </th>
                        <th>Item Rate (Rs)</th>
                        <th>Quantity</th>
                        <th>Total(Rs)</th>
                    </tr>
                    {beverage.map((item) => (
                        <tr>
                            {/* <td>{item.ItemType}</td> */}
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
    )
}

export default BeverageTable