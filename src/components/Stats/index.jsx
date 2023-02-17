import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../Navbar'
import axios from "axios";
import subDays from 'date-fns/subDays';
import 'rsuite/dist/rsuite.min.css';
import { DateRangePicker } from 'rsuite';
import SelectSearch from 'react-select-search';
import "../../scss/stats.scss";
import LineChart from '../Charts/Stats/LineChart';
// import SelectRange from './SelectRange';
import Performance from './../Performance/index';

const Stats = () => {
    let url = process.env.REACT_APP_BASE_URL;
    let navigate = useNavigate();

    const ranges = [
        {
            label: 'today',
            value: [new Date(), new Date()]
        },
        {
            label: 'yesterday',
            value: [subDays(new Date(), 1), subDays(new Date(), 1)]
        }
    ];
    const [monthly, setmonthly] = useState(false)
    const [weekly, setWeekly] = useState(false)
    const [freely, setFreely] = useState(true)
    const [token, setToken] = useState("");
    const [selectedOutlet, setSelectedOutlet] = useState("");
    const [listOutlet, setListOutlet] = useState([]);
    const [Total, setTotal] = useState([]);
    const [labels, setLabels] = useState([]);
    const [rangeType, setRangeType] = useState("")

    const handleMonthly = () => {
        setmonthly(true)
        setWeekly(false)
        setFreely(false)
        setRangeType("monthly")
    }
    const handleWeekly = () => {
        setmonthly(false)
        setWeekly(true)
        setFreely(false)
        setRangeType("weekly")
    }
    const handleFreely = () => {
        setmonthly(false)
        setWeekly(false)
        setFreely(true)
        setRangeType("Free range")
    }

    const handleDate = (e) => {
        console.log("here")
        let newStartdate = new Date(e[0])
        let newEnddate = new Date(e[1])
        let start = newStartdate.toISOString().slice(0, 10)
        let end = newEnddate.toISOString().slice(0, 10)
        console.log(start, end)
        if (rangeType === "Free Range") {
            axios.post(`${url}/datestats`, {
                Outlet_Name: `${selectedOutlet}`,
                start_date: `${start}`,
                end_date: `${end}`,
                token: `${token}`
            })
                .then((response) => {
                    console.log(response.data)
                    setTotal(response.data.total)
                    setLabels(response.data.labels)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        if (rangeType && rangeType === "weekly") {
            axios.post(`${url}/chartsummary`, {
                outlet: `${selectedOutlet}`,
                start_date: `${start}`,
                end_date: `${end}`,
                type: `${rangeType}`,
                token: `${token}`
            })
                .then((response) => {
                    if (response?.data) {
                        setTotal(response.data.weeklyTotal)
                        setLabels(response.data.weeklabel)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        console.log(rangeType)
        if (rangeType && rangeType === "monthly") {
            console.log("here monthly")
            axios.post(`${url}/chartsummary`, {
                outlet: `${selectedOutlet}`,
                start_date: `${start}`,
                end_date: `${end}`,
                type: `${rangeType}`,
                token: `${token}`
            })
                .then((response) => {
                    if (response?.data) {
                        setTotal(response.data.monthlyTotal)
                        setLabels(response.data.monthlabel)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
    useEffect(() => {
        let tokenCheck = localStorage.getItem("token");
        if (!tokenCheck) {
            navigate('/')
        } else {
            setToken(localStorage.getItem("token"))
        }
    }, [])

    useEffect(() => {
        axios.post(`${url}/outlets`, {
            token: token
        })
            .then((response) => {
                console.log('to get outlet name', response)
                setListOutlet(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [token])
    return (
        <div>
            <Navbar />
            <div className='stats-chart'>
                <div className="datepicker-select-search-radio">
                    <div>
                        <p>Please select your favorite Web language:</p>
                        <div className='select-range'>
                            <input type="radio" id="Monthly" name="fav_language" value="Monthly" onClick={handleMonthly} />
                            <label for="Monthly">Monthly</label>
                        </div>
                        <div className='select-range'>
                            <input type="radio" id="Weekly" name="fav_language" value="Weekly" onClick={handleWeekly} />
                            <label for="Weekly">Weekly</label>
                        </div>
                        <input type="radio" id="Free" name="fav_language" value="Free" onClick={handleFreely} />
                        <label for="Free">Free Range</label>
                    </div>
                    <div className='select-search'>
                        <h3>{selectedOutlet}</h3>
                        <SelectSearch
                            defaultValue={selectedOutlet}
                            search
                            placeholder="Select Outlet Name"
                            onChange={(event) => setSelectedOutlet(event)}
                            options={listOutlet}
                        />
                    </div>

                    <div className='calendar-month-week'>
                    </div>
                </div>
                {monthly &&
                    <div className='calendar-month'>
                        <p>Select Single Month</p>
                        <DateRangePicker ranges={[]} onOk={(e) => handleDate(e)} />
                    </div>
                }
                {weekly &&
                    <div className='calendar-week'>
                        <p>Select Single Week</p>
                        <DateRangePicker ranges={[]} onOk={(e) => handleDate(e)} />
                    </div>
                }

                <div className='stats-chart'>
                    {freely &&
                        <div className='calendar'>
                            <DateRangePicker onOk={(e) => handleDate(e)} />
                        </div>
                    }
                    {Total && Total.length > 0 && labels && labels.length > 0 &&
                        <div className='stats-chart'>
                            <div>
                                <LineChart labels={labels} Total={Total} labelTitle={rangeType} Title={"Stats"} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Stats