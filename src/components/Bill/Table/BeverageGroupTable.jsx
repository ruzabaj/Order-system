import React from 'react'

const BeverageGroup = ({beverageGroup}) => {
    return (
        <div className='container beverage-column-group'>
            <div className='row beverage-table-group-row'>
                <table className='beverage-table-group'>
                    <tr>
                        <th>Group :</th>
                        <th>Total:</th>
                    </tr>
                    {beverageGroup.map((beverage, index) => (
                        <tr key={index}>
                            <td>{beverage.groupName}</td>
                            <td>{beverage.groupTotal}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default BeverageGroup