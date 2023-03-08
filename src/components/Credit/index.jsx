import React, { useState, useEffect } from 'react'
import Navbar from './../Navbar/index';
import SelectSearchInput from "../SelectSearch";
import "./../../scss/Credit/credit.scss";
import axios from 'axios';
import SelectSearch from 'react-select-search';
import CreditTables from './creditTable';
import CreditInfo from './creditInfo';
import PaymentModal from './../Modal/paymentModal';
import Footer from "../Footer";

const Credit = () => {
  let url = process.env.REACT_APP_BASE_URL;

  const [token, setToken] = useState("")
  const [selectedOutlet, setSelectedOutlet] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [creditDetails, setCreditDetails] = useState({})
  const [listCustomer, setListCustomer] = useState([]);
  const [creditWiseBillList, setCreditWiseBillList] = useState([]);
  const [creditWisePaymentList, setCreditWisePaymentList] = useState([]);
  const [isClicked, setIsClicked] = useState(false)
  const [isShown, setIsShown] = useState(false)

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
          // console.log(error)
        })
    }
  }, [token, selectedOutlet])

  useEffect(() => {
    if(selectedOutlet && selectedCustomer){
      axios.post(`${url}/customerCreditDetails`, {
        outlet: `${selectedOutlet}`,
        token: token,
        CustomerName: `${selectedCustomer}`
      })
        .then((response) => {
          // console.log("ok", response.data)
          setCreditDetails(response.data.CreditDetails)
          setCreditWiseBillList(response.data.CreditWiseBillList)
          setCreditWisePaymentList(response.data.CreditWisePaymentList)
        })
        .catch((error) => {
          // console.log(error)
        })
    }
  }, [selectedOutlet, selectedCustomer])

  const handleView = () => {
    setIsClicked(!isClicked)
  }
  const handleShow = () => {
    setIsShown(!isShown)
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShowModal = () => setShow(true);
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
        <CreditInfo creditDetails={creditDetails} handleView={handleView} isShown={isShown} handleShow={handleShow} isClicked={isClicked}/>
        <div className='btn-make-payment' >
          <button className='make-payment' onClick={handleShowModal}> Make Payment</button>
        </div>
        <CreditTables isShown={isShown} isClicked={isClicked} creditWiseBillList={creditWiseBillList} creditWisePaymentList={creditWisePaymentList}/>
      </div>
      <PaymentModal show={show} handleClose={handleClose} token={token} selectedOutlet={selectedOutlet} selectedCustomer={selectedCustomer}/>
      <Footer/>
    </section>
  )
}

export default Credit