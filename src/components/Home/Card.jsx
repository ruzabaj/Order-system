import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import Calculation from './Calculation';
import ConvertTime from './convertTime';
import HandleButton from './button';
import axios from 'axios'
import io from 'socket.io-client';

const Card = ({ handleDelete, handleCompleted, startCook, handleCookProcess }) => {
    const url = process.env.REACT_APP_BASE_URL;
    const [list, setList] = useState([])
    const [updatedList, setUpdatedList] = useState({})

    // useEffect(() => {
    //     getOrder();
    // }, [])

    // const getOrder = async () => {
    //     try {
    //         const result = await axios.get(`http://192.168.101.15:5000/get_live`)
    //         setList(result.data.data)
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     socket.on('connect', (data)=>console.log(data))
    //     socket.on('newdata', (data) => console.log(data))
    //     cleanUp() ;
    //     }, [socket])

    //     const cleanUp=()=>{
    //           socket.disconnect();
    //   }

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
        socket.emit('join');
        socket.on('initial_load', (res) => {
            let { data } = JSON.parse(res)
            console.log('data=>', data)
            setList(data)
        })
    }, [])
    socket.on("entry_update", (update) => {
        console.log('update=>', update)
        console.log("list=>", list)
        let newList=list.push(update)
        console.log('list', newList)
        let newArray = [update, ...list] 
        console.log("new Array",newArray)
        setList(newArray)
    })

    return (
        <div className="row">
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
