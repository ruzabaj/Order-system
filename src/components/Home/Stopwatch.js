import * as React from 'react';
import ReactStopwatch from 'react-stopwatch';

const Stopwatch = ({ hour, min, sec }) => (
    <ReactStopwatch
        seconds={0+sec}
        minutes={0+min}
        hours={0+hour}
        limit="00:00:00"
        // onCallback={() => console.log('Finish')}
        render={({ hours, minutes, seconds }) => {
            return (
                <div className='stop-watch' style={{display:'flex', fontSize:"20px"}}>
                    <p>
                        {hours} :
                    </p>
                    <p>
                        { minutes}:
                    </p>
                    <p>
                        {sec + seconds}
                    </p>
                </div>
            );
        }}
    />
    
);

export default Stopwatch;