import React, { useState } from 'react'
import "../../scss/home.scss";
import Card from './Card';
import Navbar from '../Navbar';
import ConvertTime from './convertTime';

const Home = () => {
    const [startCook, setStartCook] = useState(true)

    const handleCompleted = () => {
        console.log('handle-completed')
    }

    const handleDelete = () => {
        console.log('handle-delete')
    }

    const handleCookProcess = () => {
        console.log("handle-cook")
        setStartCook(!startCook)
    }
    return (
        <div>
            <div className="container">
                <Card handleCompleted={handleCompleted} handleDelete={handleDelete} handleCookProcess={handleCookProcess} startCook={startCook} />
            </div>
        </div>
    )
}

export default Home
