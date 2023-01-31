import React, {useState, useEffect} from 'react'
import moment from 'moment';
import "../../scss/stopwatch.scss"

const Calculation = ({Ordertime}) => {
    console.log(Ordertime)
    const [countup_state,
        setcountup_state] = useState(0)
   
    useEffect(() => {
        const customerTime = Ordertime
        console.log(`${Ordertime}test`)
        const currentMoment = moment().format('HH:mm:ss')
        const currentDate = new Date().toLocaleDateString('en-CA');
        const time = `${currentDate} ${currentMoment}`
        var testTime = `${currentDate} ${customerTime}`
        var startDate = moment(testTime, 'YYYY/M/DD HH:mm:ss')
        var endDate = moment(time, 'YYYY/M/DD HH:mm:ss')
        var secondsDiff = endDate.diff(startDate, 'seconds')
        let interval1 = setInterval(() => {
            secondsDiff++;
            var date = new Date(null);
            date.setSeconds(secondsDiff);
            let parsed_time = moment
                .unix(secondsDiff)
                .utc()
                .format('m [M:] s [S]');
            setcountup_state(parsed_time)
           
        }, 1000);
        return () => {
            clearInterval(interval1)
        }
    }, [Ordertime])

    return (
        <div key={Math.random()}>
            {countup_state}
        </div>
    )
}
export default Calculation