import React from 'react'

const SixTen = ({sixTen}) => {
    return (
        <div className='time-stamp'>
            <label className='late'>6PM- 10PM</label>
            <p>{sixTen.total_count} X <span>{sixTen.Order_sales}</span></p>
            <div className='numbers'>
                <p><span>Dine-In : </span>{sixTen.dinein_count} X {sixTen.dinein_sales}</p>
                <p><span>Tab : </span>{sixTen.Order_count} X {sixTen.Order_sales}</p>
            </div>
        </div>
    )
}

export default SixTen