import React from 'react'

const ElevenThree = ({elevenThree }) => {
    return (
        <div className='time-stamp'>
            <label className='morning'> 11AM -3PM</label>
            <p>{elevenThree.total_count} X <span>{elevenThree.Order_sales}</span></p>
            <div className='numbers'>
                <p><span>Dine-In : </span> {elevenThree.dinein_count} X {elevenThree.dinein_sales}</p>
                <p><span>Tab :</span>{elevenThree.Order_count} X {elevenThree.Order_sales}</p>
            </div>
        </div>
    )
}

export default ElevenThree