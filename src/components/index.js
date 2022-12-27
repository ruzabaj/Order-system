import React from 'react'
import "../scss/home.scss";
import Sidebar from './Home/sidebar';   
import Card from './Home/Card';

const Home = () => {
    const handleSuccess = () => {
        console.log('handle-success')
    }

    const handleDelete = () => {
        console.log('handle-delete')
    }
    return (
        <div className="container">
            <Sidebar/>
            <Card handleSuccess={handleSuccess} handleDelete={handleDelete}/>
        </div>
    )
}

export default Home
