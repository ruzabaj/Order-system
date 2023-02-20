import React from 'react'
// import GroupTable from './Table/GroupTable';

const Foodtable = ({ food, foodGroup }) => {
    return (
        <div>
            <div className="table-responsive-food">
                <div className='bg-heading-food'>
                    <h4 className='food-heading'>Food</h4>
                </div>
                <div className="table-responsive">
                    <table className="table-food">
                        <thead>
                            <tr>
                                <th>Group</th>
                                <th>Item Name </th>
                                <th>Item Rate (Rs)</th>
                                <th>Quantity</th>
                                <th>Total(Rs)</th>
                            </tr>
                        </thead>
                        {food.map((item) => (
                            <tr>
                                <td>{item.Description}</td>
                                <td>{item.itemName}</td>
                                <td>{item.itemrate}</td>
                                <td>{item.quantity}</td>
                                <td>{item.total}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
            {/* <FoodGroupTable foodGroup={foodGroup} /> */}
            {/* <GroupTable Group={foodGroup}/> */}

        </div>
    )
}

export default Foodtable