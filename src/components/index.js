import React, {useState} from 'react'
import "../scss/home.scss";
import Sidebar from './Home/sidebar';   
import Card from './Home/Card';

const Home = () => {
    const [startCook, setStartCook]=useState(true)

    const handleCompleted = () => {
        console.log('handle-completed')
    }

    const handleDelete = () => {
        console.log('handle-delete')
    }
    
    const handleCookProcess=()=>{
        console.log("handle-cook")
        setStartCook(!startCook)
    }
    return (
        <div className="container">
            <Sidebar/>
            <Card handleCompleted={handleCompleted} handleDelete={handleDelete} handleCookProcess={handleCookProcess} startCook={startCook}/>
        </div>
    )
}

export default Home
