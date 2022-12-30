import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faCutlery } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import Calculation from './Calculation';

const Card = ({ handleDelete, handleCompleted, handleCookProcess, startCook }) => {
    const url = process.env.REACT_APP_BASE_URL;
    const [list, setList] = useState([])
       
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

    return (
        <div className="row">
            {list.map((element, index) => (
                <div className="col-md-4 col-lg-3 col-sm-2" key={index}>
                    <div className='ticket'>
                        <div className='item-order-type'>
                            <div className='top-icon'>
                                <FontAwesomeIcon icon={faCheck} className="check-icon" onClick={()=>handleCompleted(element.OrderItemsDetailsList)} />
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
                                <Calculation Ordertime={element.orderTime}/>
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
