import React from 'react'
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import Cooking from '../components/Cooking';
import Home from '../components/Home';

const MainRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/home' element={<Home />} />
                <Route path='/on-cooking' element={<Cooking />} />
            </Routes>
        </div>
    )
}

export default MainRoutes
