import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import "../scss/home.scss";
import Sidebar from './sidebar';

const Home = () => {
    const handleSuccess = () => {
        console.log('handle-success')
    }

    const handleDelete = () => {
        console.log('handle-delete')
    }
    return (
        <div className="container">
        <Sidebar FontAwesomeIcon={FontAwesomeIcon} Bar={faBars}/>
            <div className="row">
                <div className="col-md-3">
                    <div className='ticket'>
                        <div className='item-order-type'>
                            <div className='top-icon'>
                                <FontAwesomeIcon icon={faCheck} className="check-icon" onClick={handleSuccess} />
                            </div>
                            <p className='item-type'>Dine-In</p>
                        </div>
                        <div className='item-course-detail'>
                            <div className='item-detail'>
                                <p>2:53 PM</p>
                                <h1>10</h1>
                            </div>
                            <div className='course-item'>
                                <p className='course-type'>Entree</p>
                                <div className='item-list'>
                                    <div className='item-name'>
                                        <p><span>Quantity</span><FontAwesomeIcon icon={faTimes} /> ItemName</p>
                                        <FontAwesomeIcon icon={faTimes} className="delete-icon" onClick={handleDelete} />
                                    </div>
                                    <p className='description'>-Medium rare, potato wedge</p>
                                    <p className='allergies'>-Allergies<span>Peanut</span></p>
                                </div>
                            </div>
                            <div className='course-item'>
                                <p className='course-type'>Appetizer</p>
                                <div className='item-list'>
                                    <div className='item-name'>
                                        <p><span>Quantity</span><FontAwesomeIcon icon={faTimes} /> ItemName</p>
                                        <FontAwesomeIcon icon={faTimes} className="delete-icon" onClick={handleDelete} />
                                    </div>
                                    <p className='add-ons'>Extra Cheese</p>
                                    <p className='allergies'>-Allergies<span>Peanut</span></p>
                                </div>
                            </div>
                            <button className='seen-btn' type='submit'>
                                SEEN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
