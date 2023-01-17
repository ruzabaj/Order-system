import React from 'react'
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import Cooking from '../components/Cooking';
import Home from '../components/Home';
import Report from '../components/Report';

const MainRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/home' element={<Home />} />
                <Route path='/on-cooking' element={<Cooking />} />
                <Route path='/report' element={<Report/>} />
            </Routes>
        </div>
    )
}

export default MainRoutes
