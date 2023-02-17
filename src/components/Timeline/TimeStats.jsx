import React from 'react'

const TimeStats = ({ timeStats }) => {
    return (
        <div className='time-stats'>
            <p><span>First Order At : </span>{timeStats.firstorderAt} </p>
            <p><span>First Order Date : </span>{timeStats.firstorderDate} </p>
            <p><span>Last Order At : </span>{timeStats.lastoderAt} </p>
            <p><span>Last Order At : </span>{timeStats.lastoderAt} </p>
            <p><span>Last Bill Closed : </span>{timeStats.lastbillclosedAt} </p>
            <p><span>Operation Time : </span>{timeStats.operationTime} </p>
        </div>
    )
}

export default TimeStats