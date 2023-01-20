import React, {useState, useEffect, createContext, useMemo } from 'react'
import Sidebar from './Navbar/sidebar';

export const storeContext = createContext();
// let url = process.env.REACT_APP_BASE_URL;
const Context = (props) => {
    const [appetizer, setAppetizer] = useState([]);
    // const [entree, setEntree] = useState([]);
    // const [dessert, setDessert] = useState([]);
    // const [salad, setSalad] = useState([]);
    // const [value, setValue] = useState([]);
    // const [value2, setValue2] = useState([]);


    //set the start date , end date, select change outlet name
     
    // useEffect(() => {
    //     let initialDate = startDate
    //     let date = moment(initialDate).format();
    //     let firstDate = date.toString().substring(0, 10)
    //     setFirstDate(firstDate)

    //     let lastDate = endDate
    //     let dates = moment(lastDate).format();
    //     let secondDate = dates.toString().substring(0, 10)
    //     setSecondDate(secondDate);

    // }, [startDate, endDate])

    let name='try';
    // let array=[let set=set,get]
    let providerValue= useMemo(()=>({appetizer, setAppetizer}), [appetizer, setAppetizer]);
    return (
        <div>
            <storeContext.Provider value={providerValue}>
                {props.children}
                {/* <Sidebar/> */}
            </storeContext.Provider>
        </div>
    )
}

export default Context