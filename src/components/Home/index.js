import React, { useState } from 'react'
import "../../scss/home.scss";
import Card from './Card';

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
        <div className="container">
            <Card handleCompleted={handleCompleted} handleDelete={handleDelete} handleCookProcess={handleCookProcess} startCook={startCook} />
        </div>
    )
}

export default Home
