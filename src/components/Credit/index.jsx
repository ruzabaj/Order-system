import React, { useState, useEffect } from 'react'
import Navbar from './../Navbar/index';
import SelectSearchInput from "../SelectSearch";
import "./../../scss/Credit/credit.scss";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SelectSearch from 'react-select-search';

const Credit = () => {
  // let navigate = useNavigate();
  let url = process.env.REACT_APP_BASE_URL;

  const [token, setToken] = useState("")
  const [selectedOutlet, setSelectedOutlet] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [listCustomer, setListCustomer] = useState([]);

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  useEffect(() => {
    if (selectedOutlet) {
      axios.post(`${url}/customerCredit`, {
        outlet: `${selectedOutlet}`,
        token: token
      })
        .then((response) => {
          setListCustomer(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [token, selectedOutlet])

  useEffect(() => {
    axios.post(`${url}/customerCreditDetails`, {
      outlet: `${selectedOutlet}`,
      token: token,
      CustomerName: `${selectedCustomer}`
    })
      .then((response) => {
        console.log("ok", response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [selectedOutlet, selectedCustomer])

  return (
    <section>
      <Navbar />
      <div className='handle-select-search-input'>
        <div className='handle-width'>
          <SelectSearchInput token={token} setToken={setToken} setSelectedOutlet={setSelectedOutlet} selectedOutlet={selectedOutlet} />
          <SelectSearch
            defaultValue={selectedCustomer}
            search
            placeholder={"Select Customer Name"}
            onChange={(event) => setSelectedCustomer(event)}
            options={listCustomer}
          />
        </div>
      </div>
      <div className='bg-credit'>
        <div className='credit-info'>
          <div className='total-credit-sale'>
            <div className='specify-width'>
              <p >Total Credit Sale: </p>
              <span>1000</span>
            </div>
            <button className='view'>View</button>
          </div>
          <div className='total-amount-paid'>
            <div className='specify-width'>
              <p >Total Amount Paid: </p>
              <span>1000</span>
            </div>
            <button className='view'>View</button>
          </div>
          <hr className='credit-hr-line'></hr>
          <div className='remaining-balance'>
            <div className='specify-width'>
              <p >Remaining Balance:: </p>
              <span>1000</span>
            </div>
          </div>
        </div>
        <div className='btn-make-payment'>
          <button className='make-payment'>Make Payment</button>
        </div>
        <div className='credit-table'>
          <div className='total-credit-sale-table'>
            <table>

            </table>
          </div>
          <div className='total-amount-paid-table'>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Credit