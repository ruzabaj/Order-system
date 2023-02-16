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
import SelectRange from './SelectRange';

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

    const handleMonthly = () => {
        setmonthly(true)
        setWeekly(false)
        setFreely(false)
    }
    const handleWeekly = () => {
        setmonthly(false)
        setWeekly(true)
        setFreely(false)

    }
    const handleFreely = () => {
        setmonthly(false)
        setWeekly(false)
        setFreely(true)
    }

    const handleDate = (e) => {
        let newStartdate = new Date(e[0])
        let newEnddate = new Date(e[1])
        let start = newStartdate.toISOString().slice(0, 10)
        let end = newEnddate.toISOString().slice(0, 10)
        console.log(start, end)

        axios.post(`${url}/datestats`, {
            Outlet_Name: `${selectedOutlet}`,
            start_date: `${start}`,
            end_date: `${end}`,
            token: `${token}`
        })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
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
                    {freely &&
                        <div className='calendar'>
                            <DateRangePicker onOk={(e) => handleDate(e)} />
                        </div>
                    }
                    {monthly &&
                        <div className='calendar-month'>
                            <p>Select Single Month</p>
                            <DateRangePicker  showOneCalendar hoverRange="month" ranges={[]} onOk={(e) => handleDate(e)}/>
                        </div>
                    }
                    {weekly &&
                        <div className='calendar-week'>
                            <p>Select Single Week</p>
                            <DateRangePicker oneTap showOneCalendar hoverRange="week" ranges={[]} onOk={(e) => handleDate(e)}/>
                        </div>
                    }
                </div>
            </div>
            <div className='stats-chart'>
                <div>
                    <LineChart/>
                </div>
            </div>
        </div>
    )
}

export default Stats