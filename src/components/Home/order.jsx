import React, {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faTimes, faSearch} from '@fortawesome/free-solid-svg-icons'
import Calculation from './Calculation';
import ConvertTime from './convertTime';
import HandleButton from './button';
import io from 'socket.io-client';

const Order = ({handleDelete, handleCompleted, startCook, handleCookProcess}) => {
    // const url = process.env.REACT_APP_BASE_URL;
    const [list, setList] = useState([])
    const [outletName, setOutletName] = useState("")
    const [show, setShow] = useState(true)

    var socket = io("ws://192.168.101.15:4000", {
        transports: ['websocket'],
        upgrade: false,
        cors: {
            origin: "*"
        }
    })
const fetch_data =async ()=> {
    socket.emit('join', {
        userName: "1233",
        //username-outlet roomCode random num
        roomCode: `${outletName}`
    })
}
console.log(Math.floor((Math.random() * 10) + 1));
console.log("4 digit",Math.floor(Math.random() * 9000 + 1000));

socket.on('get_live_error', (msg) => {
    setShow(false)
})
    socket.on('message', (msg) => {
        console.log(msg);
        socket.emit("get_live", { roomId: `${outletName}`, outlet_name: outletName})
    })
    socket.on('initial_load', (res) => {
        setShow(true)
        if(!res){
            setShow(false)
            return;
        }
        let {data} = JSON.parse(res)
        console.log('data=>', data)
        setList(data)
    })
    socket.on('test_event', (res) => {
        console.log(res);
    })
    socket.on('entry_update', (res) => {
        if(!res){
            return;
        }
        setShow(true)
        setList(current => [res,...current]);
    })
    const handleChange = (event) => {
        setOutletName(event.target.value)
    }
    const handleEnter = () => {
        fetch_data()
        // socket.on("user_connected", () => {     console.log("id") })
    }
    return (
        <div className="row">
            <div className='center-input-outlet'>
                <input
                    type="text"
                    placeholder="Outlet Name"
                    onChange={handleChange}
                    className="input-enter"/>
                <button type="sumbit" className="btn-enter-icon" onClick={handleEnter}>
                    <span><FontAwesomeIcon icon={faSearch}/></span>
                </button>
            </div>
            {!show && <div>Error! Please check the outlet name.</div>}
            {show && list.map((element, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                    <div className='ticket'>
                        <div className='item-order-type'>
                            <div className='top-icon'>
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className="check-icon"
                                    onClick={() => handleCompleted(element.OrderItemsDetailsList)}/>
                            </div>
                            <p className='item-type'>{element.orderType}</p>
                        </div>
                        <div className='item-course-detail'>
                            <div className='item-detail'>
                                <div className='time-guests'>
                                    <ConvertTime timeOrder={element.orderTime}/>
                                    <p>Guests :<span>2</span>
                                    </p>
                                </div>
                                <h1>{element.tableNum}</h1>
                                <p>{element.employee}</p>
                                <Calculation Ordertime={element.orderTime}/>
                            </div>
                            {element
                                .OrderItemDetailsList
                                .map((item, index) => (
                                    <div className='course-item' key={index}>
                                        <p className='course-type'>Item {index + 1}</p>
                                        <div className='item-list'>
                                            <div className='item-name'>
                                                <p>
                                                    <span>{item.Quantity}</span>
                                                    X {item.ItemName}</p>
                                                <div className='item-check-process'>
                                                    <FontAwesomeIcon icon={faCheck} className="completed-icon"/>
                                                    <FontAwesomeIcon icon={faTimes} className="delete-icon" onClick={handleDelete}/>
                                                </div>
                                            </div>
                                            {(item.Modifications === '')
                                                ? ""
                                                : <p className='modifications'>-{item.Modifications}</p>
}
                                        </div>
                                    </div>
                                ))}
                            <HandleButton startCook={startCook} handleCookProcess={handleCookProcess}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Order