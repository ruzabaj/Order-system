import React from 'react'

const ThreeSix = ({ threeSix }) => {
    return (
        <div className='time-stamp'>
            <label className='evening'>3PM- 6PM</label>
            <p>{threeSix.total_count} X <span>{threeSix.Order_sales}</span></p>
            <div className='numbers'>
                <p><span>Dine-In : </span>{threeSix.dinein_count} X <span>{threeSix.dinein_sales}</span></p>
                <p><span>Tab :</span>{threeSix.Order_count} X <span>{threeSix.Order_sales}</span></p>
            </div>
        </div>
    )
}

export default ThreeSix