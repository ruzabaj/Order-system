import React from 'react'
import moment from 'moment';
import Stopwatch from './Stopwatch';
import ReactTimerStopwatch from 'react-stopwatch-timer';
var timediff = require('timediff');
var convert_time = require('convert-seconds');

const Calculation = ({ Ordertime }) => {
    var customer_time = Ordertime
    let current_moment = moment().format('HH:mm:ss')
    let current_date = new Date().toLocaleDateString('en-CA');
    let time = `${current_date} ${current_moment}`
    console.log(time, "123")
    var test_time = `${current_date} ${customer_time}`
    var elapsed_time = timediff(test_time, time, 'S').seconds;
    let format = convert_time(elapsed_time)
    var { hours, minutes, seconds } = format
    let hour = parseInt(hours)
    let minute = parseInt(minutes)
    let second = parseInt(seconds)
    const fromTime = new Date(0, 0, 0, hour, minute, second, 0);
    console.log(fromTime, "from-time")
    return (
        <div className='show-elapsed-time'>
            {/* <Stopwatch hour={format.hours} min={format.minutes} sec={format.seconds} /> */}
            <ReactTimerStopwatch isOn={true} className="react-stopwatch-timer__table" watchType="stopwatch"
                displayCricle={true} color="gray" hintColor="red" fromTime={fromTime} />
        </div>
    )
}

export default Calculation
