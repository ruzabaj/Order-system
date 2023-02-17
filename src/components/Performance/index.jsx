import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import axios from 'axios';
import Navbar from '../Navbar';
import LineChart from './../Charts/Stats/LineChart';
import "../../scss/performance.scss";
import "../../scss/button.scss";

const Performance = () => {
    let url = process.env.REACT_APP_BASE_URL;
    let navigate = useNavigate();
    const [listOutlet, setListOutlet] = useState([]);
    const [token, setToken] = useState("");
    const [selectedOutlet, setSelectedOutlet] = useState("");
    const [listYear, setListYear] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [dailyTotal, setDailyTotal] = useState([])
    const [dailyLabel, setDailyLabel] = useState([])
    const [monthlyLabel, setMonthlyLabel] = useState([])
    const [monthlyTotal, setMonthlyTotal] = useState([])
    const [chartShow, setshowChart] = useState(false)

    useEffect(() => {
        let tokenCheck = localStorage.getItem("token");
        if (!tokenCheck) {
            navigate('/')
        } else {
            setToken(localStorage.getItem("token"))
        }
    }, [])

    useEffect(() => {
        if (token) {
            axios.post(`${url}/outlets`, {
                token: token
            })
                .then((response) => {
                    setListOutlet(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [token])

    useEffect(() => {
        if (selectedOutlet) {
            axios.post(`${url}/years`, {
                outlet: `${selectedOutlet}`,
                token: token
            })
                .then((response) => {
                    setListYear(response.data)
                    console.log(response.data, "list year")
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [selectedOutlet])

    const showChart = () => {
        setshowChart(true)
    }

    
    useEffect(() => {
      if(selectedYear){
        axios.post(`${url}/chartsummary`, {
            outlet: `${selectedOutlet}`,
            date: `${selectedYear}`,
            type: "yearly",
            token: `${token}`
        })
            .then((res) => {
                if (res?.data) {
                    setDailyLabel(res.data?.dailylabel)
                    setDailyTotal(res.data?.dailytotal)
                    setMonthlyLabel(res.data?.monthlylabel)
                    setMonthlyTotal(res.data?.monthlytotal)
                    
                }
            })
            .catch((error) => {
                console.log(error)
            })
      }
      return () => {
        setshowChart(false)
      }
    }, [selectedYear])
    

    return (
        <div>
            <Navbar />
            <div className='search-select-year-outlet'>
                <div className='select-outlet-year'>
                    <h3>{selectedOutlet}</h3>
                    <SelectSearch
                        defaultValue={selectedOutlet}
                        search
                        placeholder="Select Outlet Name"
                        onChange={(event) => setSelectedOutlet(event)}
                        options={listOutlet}
                    />
                </div>
                <div className='select-outlet-year'>
                    <SelectSearch
                        defaultValue={selectedYear}
                        search
                        placeholder="Select Year"
                        onChange={(event) => setSelectedYear(event)}
                        options={listYear}
                        disabled={selectedOutlet ? false : true}
                    />
                </div>
                <div className='btn-search-view '>
                    <button onClick={showChart} className="btn-search">Show Chart</button>
                </div>
            </div>
            <div className='performance-chart'>
                {chartShow && monthlyLabel && monthlyTotal && monthlyLabel.length > 0 && monthlyTotal.length > 0 &&
                    <LineChart labels={monthlyLabel} Total={monthlyTotal} labelTitle={"Month"} Title={"Monthly Performance"} />
                }
                {chartShow && dailyTotal && dailyLabel && dailyTotal.length > 0 && dailyLabel.length > 0 &&
                    <LineChart Total={dailyTotal} labels={dailyLabel} labelTitle={"WeekDay"} Title={"Yearly Weekday Performance"} />
                }

            </div>
        </div>
    )
}

export default Performance