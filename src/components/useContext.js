import React, {useState, createContext } from 'react'
import Sidebar from './Navbar/sidebar';

export const storeContext = createContext();
// let url = process.env.REACT_APP_BASE_URL;
const Context = (props) => {
    // const [appetizer, setAppetizer] = useState([]);
    // const [entree, setEntree] = useState([]);
    // const [dessert, setDessert] = useState([]);
    // const [salad, setSalad] = useState([]);

    // const handleSidebar = () => {
    //     axios.post(`${url}/completed`, {
    //         "start_date": firstDate,
    //         "end_date": secondDate,
    //         "outlet_name": outletName,
    //     })
    //         .then((response) => {
    //             console.log(response.data)
    //             setAppetizer(response.data.Appetizer)
    //             setSalad(response.data.Salad)
    //             setEntree(response.data.Entree)
    //             setDessert(response.data.Dessert)
    //         })
    //         .catch((error) => {
    //             console.log(error.response.data)
    //         })
    // }
    let name='try';

    return (
        <div>
            <storeContext.Provider value={name}>
                {props.children}
                {/* <Sidebar/> */}
            </storeContext.Provider>
        </div>
    )
}

export default Context