import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import Calculation from './Calculation';
import ConvertTime from './convertTime';
import HandleButton from './button';
import io from 'socket.io-client';

const Card = ({ handleDelete, handleCompleted, startCook, handleCookProcess }) => {
    // const url = process.env.REACT_APP_BASE_URL;
    const [list, setList] = useState([])
    const [outletName, setOutletName] = useState("")

    let socket = io("http://192.168.101.15:3000", {
        transports: ['websocket'],
        cors: {
            origin: "*"
        }
    })

    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected!');
        });
    })
    const handleChange = (event) => {
        setOutletName(event.target.value)
    }
    const handleEnter=()=>{
        console.log("hanle enter")
        console.log(outletName, "outletName")
        socket.emit('join', { data: outletName });
        console.log("after emit")
    }
    useEffect(()=>{
        socket.on('initial_load', (res) => {
            let { data } = JSON.parse(res)
            console.log('data=>', data)
            setList(data)
        })
    },[])

    useEffect(() => {
        console.log("inside useEffect")
        socket.on("entry_update", (update) => {
            console.log('update=>', update)
            console.log("list=>", list)
            let newArray = [update, ...list]
            console.log("new Array", newArray)
            //to push an update to the last of an array
            // console.log("new",[...list,update] )
            setList(newArray)
        })
    }, [list])
   
   
    return (
        <div className="row">
            <div>
                <input type="text" placeholder="Outlet Name" onChange={handleChange} />
                <button type="sumbit" onClick={handleEnter}>Enter</button>
            </div>
            {list.map((element, index) => (
                <div className="col-md-4 col-lg-3 col-sm-2" key={index}>
                    <div className='ticket'>
                        <div className='item-order-type'>
                            <div className='top-icon'>
                                <FontAwesomeIcon icon={faCheck} className="check-icon" onClick={() => handleCompleted(element.OrderItemsDetailsList)} />
                            </div>
                            <p className='item-type'>{element.orderType}</p>
                        </div>
                        <div className='item-course-detail'>
                            <div className='item-detail'>
                                <div className='time-guests'>
                                    <ConvertTime timeOrder={element.orderTime} />
                                    <p>Guests :<span>2</span></p>
                                </div>
                                <h1>{element.tableNum}</h1>
                                <p>{element.employee}</p>
                                <Calculation Ordertime={element.orderTime} />
                            </div>
                            {element.OrderItemDetailsList.map((item, index) => (
                                <div className='course-item' key={index}>
                                    <p className='course-type'>Item {index + 1}</p>
                                    <div className='item-list'>
                                        <div className='item-name'>
                                            <p><span>{item.Quantity}</span> X {item.ItemName}</p>
                                            <div className='item-check-process'>
                                                <FontAwesomeIcon icon={faCheck} className="completed-icon" />
                                                <FontAwesomeIcon icon={faTimes} className="delete-icon" onClick={handleDelete} />
                                            </div>
                                        </div>
                                        {
                                            (item.Modifications === '') ? "" :
                                                <p className='modifications'>-{item.Modifications}</p>
                                        }
                                    </div>
                                </div>
                            ))}
                            <HandleButton startCook={startCook} handleCookProcess={handleCookProcess} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Card
