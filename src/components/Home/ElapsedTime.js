import React, { useState, useEffect } from "react";
import { useElapsedTime } from "use-elapsed-time";
import moment from 'moment';
 
const ElapsedTime = () => {
    const [isPlaying, setIsPlaying] = useState();                        
    const currentTime = new Date();
    let time = currentTime.getHours() + ":"
        + currentTime.getMinutes() + ":"
        + currentTime.getSeconds();
    var startTime = moment(time, 'HH:mm:ss');
    var endTime = moment('13:16:59', 'HH:mm:ss');
    var duration = moment.duration(endTime.diff(startTime));
    const { elapsedTime } = useElapsedTime({ isPlaying: true, startAt: duration._data.minutes, updateInterval:60 });
    
    useEffect(() => {
        document.addEventListener("keyup", () => {
            setIsPlaying((prevIsPlaying) => !prevIsPlaying);
        });
    }, []);
    return (
        <div>
            <div style={{ fontSize: 20 }}>{elapsedTime.toFixed(0)}</div>
        </div>
    )
}

export default ElapsedTime
