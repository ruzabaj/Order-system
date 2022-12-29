import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faCutlery } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import data from "../Data/data";

const Card = ({ handleDelete, handleCompleted, handleCookProcess, startCook }) => {
    const [list, setList] = useState([])
    const [orderTime, setOrderTime] = useState([])
    const url = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        getOrder();
    }, [])
    const getOrder = async () => {
        try {
            const result = await axios.get(`${url}/get_live`)
            setList(result.data.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    const currentTime = new Date();
    let time = currentTime.getHours() + ":"
        + currentTime.getMinutes() + ":"
        + currentTime.getSeconds();
    console.log(time, 'time')

    let arrayOrderTime=[]
    function calculateOrderTime(array) {
        array.map((item) => {
            console.log(item.orderTime)
            arrayOrderTime.push(item.orderTime)
            console.log(arrayOrderTime)
        });
    }
    let orderedTime = calculateOrderTime(list);

    return (
        <div className="row">
            {list.map((element, index) => (
                <div className="col-md-4 col-lg-3 col-sm-2" key={index}>
                    <div className='ticket'>
                        <div className='item-order-type'>
                            <div className='top-icon'>
                                <FontAwesomeIcon icon={faCheck} className="check-icon" onClick={handleCompleted} />
                            </div>
                            <p className='item-type'>{element.orderType}</p>
                        </div>
                        <div className='item-course-detail'>
                            <div className='item-detail'>
                                <div className='time-guests'>
                                    <p>{element.orderTime}</p>
                                    <p>Guests :<span>2</span></p>
                                </div>
                                <h1>{element.tableNum}</h1>
                                <p>{element.employee}</p>
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
                            {startCook ?
                                <button className='seen-btn' type='submit' onClick={handleCookProcess}>
                                    SEEN
                                </button>
                                :
                                <button className='start-cooking' type='submit' onClick={handleCookProcess}>
                                    <FontAwesomeIcon icon={faCutlery} />
                                </button>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Card
