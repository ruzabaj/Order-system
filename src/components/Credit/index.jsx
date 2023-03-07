import React, { useState, useEffect } from 'react'
import Navbar from './../Navbar/index';
import SelectSearchInput from "../SelectSearch";
import "./../../scss/Credit/credit.scss";

const Credit = () => {
  const [token, setToken] = useState("")
  const [selectedOutlet, setSelectedOutlet] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState("")

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])
  return (
    <section>
      <Navbar />
      <div className='handle-select-search-input'>
        <SelectSearchInput token={token} setToken={setToken} placeholder={"Select Outlet Name"} setSelectedOutlet={setSelectedOutlet} selectedOutlet={selectedOutlet} />
        <SelectSearchInput token={token} setToken={setToken} placeholder={"Select Customer Name"} setSelectedOutlet={setSelectedCustomer} selectedOutlet={selectedCustomer} />
      </div>
      <div className='bg-credit'>
      </div>
    </section>
  )
}

export default Credit