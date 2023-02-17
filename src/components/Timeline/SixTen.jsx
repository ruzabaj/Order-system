import React from 'react'

const SixTen = ({sixTen}) => {
    return (
        <div>
            <label>3PM- 6PM</label>
            <p>{sixTen.total_count} X <span>{sixTen.Order_sales}</span></p>
            <div>
                <p>Dine-In : {sixTen.dinein_count} X <span>{sixTen.dinein_sales}</span></p>
                <p>Tab : {sixTen.Order_count} X <span>{sixTen.Order_sales}</span></p>
            </div>
        </div>
    )
}

export default SixTen