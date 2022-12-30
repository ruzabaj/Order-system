import React from 'react'
import moment from 'moment';
import Stopwatch from './Stopwatch';
var timediff = require('timediff');
var convert_time = require('convert-seconds');

const Calculation = ({ Ordertime }) => {
    console.log(Ordertime, "order-time")
    var customer_time = Ordertime
    let current_moment = moment().format('HH:mm:ss')
    let current_date = new Date().toLocaleDateString('en-CA');
    let time = `${current_date} ${current_moment}`
    var test_time = `${current_date} ${customer_time}`
    var elapsed_time = timediff(test_time, time, 'S').seconds;
    let format = convert_time(elapsed_time)
    return (
        <div className='show-elapsed-time'>
            <Stopwatch hour={format.hours} min={format.minutes} sec={format.seconds} />
        </div>
    )
}

export default Calculation
