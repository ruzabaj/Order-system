import * as React from 'react';
import ReactStopwatch from 'react-stopwatch';

const Stopwatch = ({ hour, min, sec }) => (
    <ReactStopwatch
        seconds={0}
        minutes={0}
        hours={0}
        // limit="00:00:10"
        onCallback={() => console.log('Finish')}
        render={({ formatted, hours, minutes, seconds }) => {
            return (
                <div className='stop-watch' style={{display:'flex'}}>
                    <p style={{ color: 'white' }}>
                        Hours: {hour + hours}
                    </p>
                    <p style={{ color: 'white' }}>
                        Minutes: {minutes + min}
                    </p>
                    <p style={{ color: 'white' }}>
                        Seconds: {seconds +sec}
                    </p>
                </div>
            );
        }}
    />
);

export default Stopwatch;