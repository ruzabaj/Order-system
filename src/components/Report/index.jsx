import React, { useState, useEffect } from 'react'
import "../../scss/table.scss";
import axios from 'axios';
import moment from 'moment';
import ControlDate from './ControlDate';
import Information from './Information';
import Pagination from './Pagination';

const Report = () => {
    const [outletName, setOutletName] = useState("")
    const [outlet, setOutlet] = useState([]);
    const [information, setInformation] = useState({});
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(true);
    const [totalCount, setTotalCount] = useState("");
    const [firstDate, setFirstDate] = useState("")
    const [secondDate, setSecondDate] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [maxPageLength, setMaxPageLength] = useState();
    const [pageLength, setPageLength] = useState([]);
    const [categories, setCategories]=useState({})
    let url = process.env.REACT_APP_BASE_URL;

    const { TakeAway_totalSales, TakeAway, Voids, DineIn, DineIn_totalSales, Cooked, cooking } = information;

    useEffect(() => {
        axios.get(`${url}/outlets`)
            .then((response) => {
                setOutlet(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    useEffect(() => {
        let initialDate = startDate
        let date = moment(initialDate).format();
        let firstDate = date.toString().substring(0, 10)
        setFirstDate(firstDate)

        let lastDate = endDate
        let dates = moment(lastDate).format();
        let secondDate = dates.toString().substring(0, 10)
        setSecondDate(secondDate);

    }, [startDate, endDate])

    useEffect(() => {
        let totalCount = 0;
        orders.map((element) => (
            element.items.map((item) => {
                totalCount = totalCount + 1;
            })
        ))
        setTotalCount(totalCount)
    }, [orders])

    useEffect(() => {
        let arrayLength = [];
        for (let i = 1; i < maxPageLength + 1; i++) {
            arrayLength.push(i)
        }
        setPageLength(arrayLength)
    }, [maxPageLength])

    const handleGenerateReport = () => {
        axios.post(`${url}/report`, {
            "start_date": firstDate,
            "end_date": secondDate,
            "outlet_name": outletName,
            "page_no": 1
        })
            .then((response) => {
                setInformation(response.data)
                setMaxPageLength(response.data.maxPage_Length)
                setOrders(response.data.orders)
                setError(false)
            })
            .catch((error) => {
                console.log(error)
                setError(true)
            })
    }
    const handleNumber = (page) => {
        axios.post(`${url}/report`, {
            "start_date": firstDate,
            "end_date": secondDate,
            "outlet_name": outletName,
            "page_no": page
        })
            .then((response) => {
                setOrders(response.data.orders)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    const handleSidebar = () => {
        axios.post(`${url}/completed`, {
            "start_date": firstDate,
            "end_date": secondDate,
            "outlet_name": outletName,
        })
            .then((response) => {
                console.log(response.data)
                setCategories(response.data)
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }

    const handleChange = (e) => {
        setOutletName(e)
    }

    return (
        <div className='container'>
            <ControlDate setStartDate={setStartDate} startDate={startDate} endDate={endDate} setEndDate={setEndDate}
                handleChange={handleChange}
                handleGenerateReport={handleGenerateReport} outlet={outlet}
                handleSidebar={handleSidebar}
                categories={categories}
            />
            {error ? "Error" :
                <div className='report'>
                    <div className='show-outlet-name'>
                        <h4>{outletName}</h4>
                    </div>
                    <Information orders={orders} information={information} />
                    <div className='information-report'>
                        <div className='report-flex'>
                            <div className='report-info-two'>
                                <div className='report-info'>
                                    <label>Dine In:</label>
                                    <span>{DineIn}</span>
                                </div>
                                <div className='report-info'>
                                    <label>Dine-In (Total Sales):</label>
                                    <span>{DineIn_totalSales}</span>
                                </div>
                                <div className='report-info'>
                                    <label>Takeaway:</label>
                                    <span>{TakeAway}</span>
                                </div>
                                <div className='report-info'>
                                    <label>Takeaway (Total Sales):</label>
                                    <span>{TakeAway_totalSales}</span>
                                </div>
                                <div className='report-info'>
                                    <label>Voids:</label>
                                    <span>{Voids}</span>
                                </div>
                                <div className='report-info'>
                                    <label>Cooked:</label>
                                    <span>{Cooked}</span>
                                </div>
                                <div className='report-info'>
                                    <label>Cooking:</label>
                                    <span>{cooking}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
            <Pagination pageLength={pageLength} handleNumber={handleNumber} />
        </div>
    )
}

export default Report