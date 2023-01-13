import React, { useState } from 'react'
import "../../scss/home.scss";
import Order from "./order"

const Home = () => {
    const [startCook, setStartCook] = useState(true)

    const handleCookProcess = () => {
        console.log("handle-cook")
        setStartCook(!startCook)
    }
    return (
        <div className="container">
            <Order  handleCookProcess={handleCookProcess} startCook={startCook} />
        </div>
    )
}

export default Home
