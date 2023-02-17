import React from 'react'

const TotalSale = ({totalSaleSummary}) => {
  return (
    <div className='total-sale-summary'>
    <p><span>Total PAX : </span>{totalSaleSummary.totalPax} </p>
    <p><span>Total Net Sale : </span>{totalSaleSummary.totalNetSales} </p>
    <p><span>Total Dine-In : </span>{totalSaleSummary.TotalDineIn} </p>
    <p><span>Total Tab : </span>{totalSaleSummary.TotalOrder} </p>
    <p><span>Revenue Per Guest : </span>{totalSaleSummary.RevenuePerGuest} </p>
</div>
  )
}

export default TotalSale