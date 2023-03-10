import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";

const SameCustomerList = ({ header, handleDetails}) => {
    return (
        <div className="table-customer-list-responsive">
            <table className="table-customer-list">
                <thead>
                    <tr className='position-sticky'>
                        {header.map((detail) => (
                            <th>{detail}</th>
                        ))}
                        <th><button><BsThreeDotsVertical /></button></th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='position-sticky'>
                        <td>1</td>
                        <td>Ruja Bajracharya</td>
                        <td>ruja.bajracharya@gmail.com</td>
                        <td>Chhetrapati</td>
                        <td>9811111111</td>
                        <th><button onClick={handleDetails}><AiOutlineEye /></button></th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SameCustomerList