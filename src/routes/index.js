import { useState, useMemo, useEffect } from "react";
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import Home from '../components/Home';
import Report from '../components/Report';
import Bill from '../components/Bill';
import History from '../components/History';
import { UserContext } from '../components/Context';

const MainRoutes = () => {
    const [userName, setUserName] = useState("");
    const value = useMemo(() => ({ userName, setUserName }), [userName]);

    useEffect(() => {
        if (userName.length > 0) {
            console.log(userName, "updated")
        }
    }, [userName]);
    return (    
        <UserContext.Provider value={value}>
  
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/home' element={<Home />} />
                <Route path='/report' element={<Report />} />
                <Route path='/bill' element={<Bill />} />
                <Route path='/history' element={<History/>} />
            </Routes>
      
        </UserContext.Provider>
    )
}

export default MainRoutes
