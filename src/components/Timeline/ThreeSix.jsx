import React from 'react'

const ThreeSix = ({ threeSix }) => {
    return (
        <div>
            <label>3PM- 6PM</label>
            <p>{threeSix.total_count} X <span>{threeSix.Order_sales}</span></p>
            <div>
                <p>Dine-In : {threeSix.dinein_count} X <span>{threeSix.dinein_sales}</span></p>
                <p>Tab : {threeSix.Order_count} X <span>{threeSix.Order_sales}</span></p>
            </div>
        </div>
    )
}

export default ThreeSix