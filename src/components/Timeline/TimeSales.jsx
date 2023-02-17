import React from 'react'
import ElevenThree from './ElevenThree'
import SixTen from './SixTen'
import ThreeSix from './ThreeSix';

const TimeSales = ({ elevenThree, sixTen, threeSix}) => {
    return (
        <div className='time-sales'>
            <ElevenThree elevenThree={elevenThree} />
            <ThreeSix threeSix={threeSix}/>
            <SixTen sixTen={sixTen} />
        </div>
    )
}

export default TimeSales