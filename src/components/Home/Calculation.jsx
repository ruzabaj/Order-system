import React, {useState, useEffect} from 'react'
import "../../scss/stopwatch.scss"
var moment = require("moment")
require("moment-duration-format");

const Calculation = ({Ordertime}) => {
    const [countup,setCountup] = useState(0)
  
    useEffect(() => {
        const customerTime = Ordertime
        const currentMoment = moment().format('HH:mm:ss')
        const currentDate = new Date().toLocaleDateString('en-CA');
        const time = `${currentDate} ${currentMoment}`
        var testTime = `${currentDate} ${customerTime}`
        var startDate = moment(testTime, 'YYYY/M/DD HH:mm:ss')
        var endDate = moment(time, 'YYYY/M/DD HH:mm:ss')
        var secondsDiff = endDate.diff(startDate, 'seconds')
        let interval1 = setInterval(() => {
            secondsDiff++;
            var duration = moment.duration(secondsDiff, 'seconds');
            var parsed_time = duration.format("hh:mm:ss", { trim: true});
            setCountup(parsed_time)
        }, 1000);
        return () => {
            clearInterval(interval1)
        }
    }, [Ordertime])

    return (
        <div key={Math.random()}>
            {countup}
        </div>
    )
}
export default Calculation