import React from 'react'

const ElevenThree = ({elevenThree }) => {
    return (
        <div>
            <label>11AM -3PM</label>
            <p>{elevenThree.total_count} X <span>{elevenThree.Order_sales}</span></p>
            <div>
                <p>Dine-In : {elevenThree.dinein_count} X <span>{elevenThree.dinein_sales}</span></p>
                <p>Tab : {elevenThree.Order_count} X <span>{elevenThree.Order_sales}</span></p>
            </div>
        </div>
    )
}

export default ElevenThree