import React from 'react'

const GroupTable = ({ Group, title }) => {
    return (
        <div className='food-column-group'>
            <div className='bg-heading-food'>
                <h4 className='food-heading'>{title}</h4>
            </div>
            <div className='row food-table-group-row'>
                <table className='table-group'>
                    <tr>
                        <th>Group :</th>
                        <th>Total:</th>
                    </tr>
                    
                    {!Group?.error && Group.map((food, index) => (
                        <tr key={index}>
                            <td>{food.groupName}</td>
                            <td>{food.groupTotal}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default GroupTable