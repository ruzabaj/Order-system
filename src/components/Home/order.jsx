import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faSearch, faMinus } from '@fortawesome/free-solid-svg-icons'
import Calculation from './Calculation';
import ConvertTime from './convertTime';
import HandleButton from './button';
import io from 'socket.io-client';
import uuid from 'uuid-random';

const Order = ({ startCook, handleCookProcess }) => {
    const [list, setList] = useState([])
    const [outletName, setOutletName] = useState("")
    const [show, setShow] = useState(true)
    const [id, setId] = useState("")
    const [hash, setHash] = useState("");

    var socket = io("ws://192.168.101.15:4000", {
        transports: ['websocket'],
        upgrade: false,
        cors: {
            origin: "*"
        },
        forceNode: true,
    })

    useEffect(() => {
        let uid = uuid();
        setId(uid)
    }, [])

    const handleEnter = () => {
        socket.emit('join', {
            userName: `${outletName}`,
            roomCode: `${id}`
        })
    }

    socket.on('get_live_error', (msg) => {
        setShow(false)
    })
    socket.on('message', (msg) => {
        socket.emit("get_live", { roomId: `${id}`, outlet_name: `${outletName}` })
        let received_hash = msg.update_endpoint || ""
        setHash(received_hash)
    })
    const updateList = (data) => {
        console.log(data, "inside update list");
        setList(current => [...data]);
    }
    useEffect(() => {
        socket.on(hash, (msg) => {
            console.log(msg)
            if (!msg) {
                return;
            }
            setShow(true)
            let temp_arr = [...list]
            console.log(JSON.stringify(temp_arr).includes(JSON.stringify(msg)));
            setList(current => [msg, ...current]);
        })
        socket.on(`${hash}item_response`, (res) => {
            console.log(res)
            const listIndex = list.map(e => e.table_id).indexOf(res.primary_key);
            console.log("index of list", listIndex)
            let data = list[listIndex];
            let tempList = list;
            let toFind = res.item_id;
            let index = Object.keys(data["OrderItemDetailsList"]).findIndex(key => data["OrderItemDetailsList"][key].item_id === toFind)
            tempList[listIndex]["OrderItemDetailsList"].splice(index, 1)
            console.log("temporary list", tempList)
            updateList(tempList)
        })
        socket.on(`${hash}itemresponse_error`, (error) => {
            console.log(error)
        })
        socket.on(`${hash}itemvoid_error`, (error) => {
            console.log(error)
        })
        socket.on(`${hash}orderseen_error`, (error) => {
            console.log(error)
        })
        socket.on(`${hash}tablevoid_error`, (error) => {
            console.log(error)
        })
        socket.on(`${hash}orderseen_response`, (res) => {
            console.log(res)
        })
        socket.on(`${hash}tablevoid_response`, (res) => {
            console.log(res)
        })
    }, [hash])

    socket.on('initial_load', (res) => {
        setShow(true)
        if (!res) {
            setShow(false)
            return;
        }
        let { data } = JSON.parse(res)
        console.log("=>", data)
        setList(data)
    })
    socket.on('entry_update', (res) => {
        if (!res) {
            return;
        }
        setShow(true)
        setList(current => [res, ...current]);
    })
    const handleChange = (event) => {
        setOutletName(event.target.value)
    }
    const handleCompleted = (item) => {
        console.log("inside completed")
        console.log(item)
        socket.emit("table_done", {
            roomId: `${id}`,
            table_id: `${item}`,
            hash: `${hash}`
        })
        let newList = list.filter(el => el.table_id !== item)
        setList(newList);
        socket.on(`${hash}table_response`, (res) => {
            console.log(res)
        })
    }

    socket.on("error", (error) => {
        console.log(error)
    })

    const handleFinished = (item) => {
        console.log("inside handle finished", item);
        socket.emit("item_complete", {
            roomId: `${id}`,
            item_id: `${item}`,
            hash: `${hash}`
        })
        socket.on(`${hash}item_response`, (res) => {
            console.log(res)
            const listIndex = list.map(e => e.table_id).indexOf(res.primary_key);
            console.log("index of list", listIndex)
            let data = list[listIndex];
            let tempList = list;
            let toFind = res.item_id;
            let index = Object.keys(data["OrderItemDetailsList"]).findIndex(key => data["OrderItemDetailsList"][key].item_id === toFind)
            tempList[listIndex]["OrderItemDetailsList"].splice(index, 1)
            console.log("temporary list", tempList)
            updateList(tempList)
        })
    }

    const handleCancel = (item) => {
        console.log('inside handle cancel/void')
        socket.emit("item_void", {
            roomId: `${id}`,
            item_id: `${item}`,
            hash: `${hash}`
        })
        socket.on(`${hash}itemvoid_response`, (res) => {
            console.log(res)
            const listIndex = list.map(e => e.table_id).indexOf(res.table_id);
            let data = list[listIndex];
            console.log("data", data)
            let tempList = list;
            let index = Object.keys(data["OrderItemDetailsList"]).findIndex(key => data["OrderItemDetailsList"][key].item_id === item)
            console.log("index", index)
            tempList[listIndex]["OrderItemDetailsList"].splice(index, 1)
            console.log("temporary list", tempList)
            updateList(tempList)
        })
    }


    const handleMinus = (item) => {
        console.log("inside handle minus")
        socket.emit("quantity_decrease", {
            roomId: `${id}`,
            item_id: `${item}`,
            hash: `${hash}`
        })
        socket.on(`${hash}quantity_response`, (res) => {
            console.log(res)
            const listIndex = list.map(i => i.table_id).indexOf(res.table_id)
            let clickedList = list[listIndex]
            let index = Object.keys(clickedList["OrderItemDetailsList"]).findIndex(key => clickedList["OrderItemDetailsList"][key].item_id === item)
            let newlist = list;
            newlist[listIndex].OrderItemDetailsList[index].Quantity = res.quantity
            updateList(newlist)
        })
    }
    socket.on(`${hash}quantity_error`, (error) => {
        console.log(error)
        console.log(error.item_id)
    })
    return (
        <div className="row">
            <div className='center-input-outlet'>
                <input
                    type="text"
                    placeholder="Outlet Name"
                    onChange={handleChange}
                    className="input-enter" />
                <button type="sumbit" className="btn-enter-icon" onClick={handleEnter}>
                    <span><FontAwesomeIcon icon={faSearch} /></span>
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
                                    onClick={() => handleCompleted(element.table_id)} />
                            </div>
                            <p className='item-type'>{element.orderType}</p>
                        </div>
                        <div className='item-course-detail'>
                            <div className='item-detail'>
                                <div className='time-guests'>
                                    <ConvertTime timeOrder={element.orderTime} />
                                    <p>Guests :<span>2</span>
                                    </p>
                                </div>
                                <h1>{element.tableNum}</h1>
                                <p>{element.employee}</p>
                                <Calculation Ordertime={element.orderTime} />
                            </div>
                            {element
                                .OrderItemDetailsList
                                .map((item, index) => (
                                    <div className='course-item' key={index}>
                                        <p className='course-type'></p>
                                        <div className='item-list'>
                                            <div className='item-name'>
                                                <p className='quantity-box'>
                                                    <span>{item.Quantity}</span></p>
                                                <p >{item.ItemName}</p>
                                                <div className='item-check-process'>
                                                    <div id='complete' onClick={() => handleFinished(item.item_id)}>
                                                        <FontAwesomeIcon icon={faCheck} className="completed-icon" />
                                                    </div>
                                                    {(item.Quantity > 1) ?
                                                        <div onClick={() => handleMinus(item.item_id)}>
                                                            <FontAwesomeIcon icon={faMinus} className="minus-icon" />
                                                        </div>
                                                        :
                                                        <div onClick={() => handleCancel(item.item_id)}>
                                                            <FontAwesomeIcon icon={faTimes} className="delete-icon" />
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            {(item.Modifications === '')
                                                ? ""
                                                : <p className='modifications'>-{item.Modifications}</p>
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
export default Order