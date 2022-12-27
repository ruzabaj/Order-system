import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import "../scss/home.scss";

const Home = () => {
    return (
        <div className="container text-center ">
            <div className="row">
                <div className="col">
                    <div className='top-icon'>
                        <FontAwesomeIcon icon={faCheck} className="check-icon " />
                    </div>
                    <div className='table-1'>
                        <div className='item-detail'>
                            <p>Order Time: <span>10pm</span></p>
                            <p>Table Number: <span>10</span></p>
                            <p>Employee: <span>Ram</span></p>
                            <p>Order Type: <span>Dine-In</span></p>
                        </div>
                        <div className='item-table'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Item</th>
                                        <th>Order</th>
                                        <th>Modification</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Chicken Momo</td>
                                        <td>2</td>
                                        <td></td>
                                        <td> <FontAwesomeIcon icon={faTimes} className="delete-icon" /></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Chicken Momo</td>
                                        <td>2</td>
                                        <td>2</td>
                                        <td> <FontAwesomeIcon icon={faTimes} className="delete-icon" /></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Chicken Momo</td>
                                        <td>2</td>
                                        <td>2</td>
                                        <td> <FontAwesomeIcon icon={faTimes} className="delete-icon" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className='top-icon'>
                        <FontAwesomeIcon icon={faCheck} className="check-icon " />
                    </div>
                    <div className='table-1'>
                        <div className='item-detail'>
                            <p>Order Time: <span>10pm</span></p>
                            <p>Table Number: <span>10</span></p>
                            <p>Employee: <span>Ram</span></p>
                            <p>Order Type: <span>Dine-In</span></p>
                        </div>
                        <div className='item-table'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Item</th>
                                        <th>Order</th>
                                        <th>Modification</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Chicken Momo</td>
                                        <td>2</td>
                                        <td>2</td>
                                        <td> <FontAwesomeIcon icon={faTimes} className="delete-icon" /></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Chicken Momo</td>
                                        <td>2</td>
                                        <td>2</td>
                                        <td> <FontAwesomeIcon icon={faTimes} className="delete-icon" /></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Chicken Momo</td>
                                        <td>2</td>
                                        <td>2</td>
                                        <td> <FontAwesomeIcon icon={faTimes} className="delete-icon" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className='top-icon'>
                        <FontAwesomeIcon icon={faCheck} className="check-icon " />
                    </div>
                    <div className='table-1'>
                        <div className='item-detail'>
                            <p>Order Time: <span>10pm</span></p>
                            <p>Table Number: <span>10</span></p>
                            <p>Employee: <span>Ram</span></p>
                            <p>Order Type: <span>Dine-In</span></p>
                        </div>
                        <div className='item-table'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Item</th>
                                        <th>Order</th>
                                        <th>Modification</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Chicken Momo</td>
                                        <td>2</td>
                                        <td>2</td>
                                        <td> <FontAwesomeIcon icon={faTimes} className="delete-icon" /></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Chicken Momo</td>
                                        <td>2</td>
                                        <td>2</td>
                                        <td> <FontAwesomeIcon icon={faTimes} className="delete-icon" /></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Chicken Momo</td>
                                        <td>2</td>
                                        <td>2</td>
                                        <td> <FontAwesomeIcon icon={faTimes} className="delete-icon" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
