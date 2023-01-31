import React from 'react'
import "../../scss/home.scss";
import Navbar from '../Navbar';
import Order from './order';

const Home = () => {
    return (
        <div>
            <Navbar/>
            <div className="container">
                <Order/>
            </div>
        </div>
    )
}

export default Home
