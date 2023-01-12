import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faTimes, faSearch} from '@fortawesome/free-solid-svg-icons'
import Calculation from './Calculation';
import ConvertTime from './convertTime';
import HandleButton from './button';
import io from 'socket.io-client';
import uuid from 'uuid-random';

const Order = ({handleDelete, handleCompleted, startCook, handleCookProcess}) => {
    const [list,setList] = useState([])
    const [outletName, setOutletName] = useState("")
    const [show, setShow] = useState(true)
    const [id, setId] = useState("")
    const [hash, setHash] = useState("")
    var socket = io("ws://192.168.101.15:4000", {
        transports: ['websocket'],
        upgrade: false,
        cors: {
            origin: "*"
        },
        forceNode: true,
    })
const fetch_data =async ()=> {
    let uid = uuid();
    setId(uid)
    socket.emit('join', {
        userName: `${outletName}`,
        roomCode: `${uid}`
    })
}

socket.on('get_live_error', (msg) => {
    setShow(false)
})
    socket.on('message', (msg) => {
        socket.emit("get_live", { roomId: `${id}`, outlet_name: `${outletName}`})
        let received_hash = msg.update_endpoint||""
        setHash(received_hash)
    })
    useEffect(() => {
        console.log(hash);
        socket.on(hash,(msg)=>{
            console.log(msg)
            if(!msg){
                return;
            }
            setShow(true)
            let temp_arr = [...list]
            console.log(JSON.stringify(temp_arr).includes(JSON.stringify(msg)));
            setList(current => [msg,...current]);
   
        })
    }, [hash])
    socket.on('initial_load', (res) => {
        setShow(true)
        if(!res){
            setShow(false)
            return;
        }
        let {data} = JSON.parse(res)
        console.log(data);
        setList(data)
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
            {!show && <><div>Error! Please check the outlet name.</div></>}
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