import React from 'react'

const FoodGroupTable = ({ foodGroup }) => {
    return (
        <div className='container food-column-group'>
            <div className='row food-table-group-row'>
                <table className='food-table-group'>
                    <tr>
                        <th>Group :</th>
                        <th>Total:</th>
                    </tr>
                    {foodGroup.map((food, index) => (
                        <tr>
                            <td>{food.groupName}</td>
                            <td>{food.groupTotal}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default FoodGroupTable