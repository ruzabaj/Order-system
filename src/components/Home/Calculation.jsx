import React from 'react'
import moment from 'moment';
import "../../scss/stopwatch.scss"
import ReactTimerStopwatch from 'react-stopwatch-timer';
var timediff = require('timediff');
var convert_time = require('convert-seconds');

const Calculation = ({ Ordertime }) => {
    var customer_time = Ordertime
    let current_moment = moment().format('HH:mm:ss')
    console.log(current_moment, "current Time")
    let current_date = new Date().toLocaleDateString('en-CA');
    let time = `${current_date} ${current_moment}`
    console.log(time, "time")
    var test_time = `${current_date} ${customer_time}`
    var elapsed_time = timediff(test_time, time, 'S').seconds;
    let format = convert_time(elapsed_time)
    var { hours, minutes, seconds } = format
    let hour = parseInt(hours)
    let minute = parseInt(minutes)
    console.log("minute", minute)
    let second = parseInt(seconds)
    const fromTime = new Date(0, 0, 0, hour, minute, second, 0);
    return (
        <div className='show-elapsed-time'>
            <ReactTimerStopwatch isOn={true} className="react-stopwatch-timer__table" watchType="stopwatch"
                displayCricle={true} color="gray" hintColor="red" fromTime={fromTime} />
        </div>
    )
}

export default Calculation
