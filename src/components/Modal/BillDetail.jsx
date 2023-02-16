import React from 'react'
import "../../scss/bill.scss";

const BillDetail = ({ billInfoList, billInfo }) => {
    return (
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <div style={{ display: 'flex' }} className="modal-p-span">
                            <h5 className="modal-title" id="exampleModalLabel"> <p><span>Bill No</span>{billInfo.bill_no}</p></h5>
                            <p><span>Start Time</span>{billInfo.Start_Time}</p>
                            <p><span>End Time</span>{billInfo.End_Time}</p>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                    </div>
                    <div className="modal-body">
                        <table >
                            <thead>

                                <div style={{ display: 'flex' }} className="modal-p-span">
                                    <p>Payment Mode:<span>{billInfo.PaymentMode}</span></p>
                                    <p>Type: <span>{billInfo.Type}</span></p>
                                </div>
                                <div style={{ display: 'flex' }} className="modal-p-span"> 
                                    <p>Table No: <span>{billInfo.Table_No} </span></p>
                                    <p>Employee:<span>{billInfo.employee}</span></p>
                                </div>
                            </thead>
                            <hr className="hr-line" />
                            <div className='bill-info-details'>
                                <tbody>
                                    <tr>
                                        <th>Item Type</th>
                                        <th>Quantity</th>
                                        <th>Item Name</th>
                                        <th>Item Rate</th>
                                        <th>Total</th>
                                    </tr>
                                    {billInfoList.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.ItemType}</td>
                                            <td>{item?.Quantity}</td>
                                            <td>{item.itemName}</td>
                                            <td>{item.itemrate}</td>
                                            <td>{item.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </div>

                            <hr className="hr-line" />
                            <tfood>
                                <div style={{ display: 'flex' }} className="modal-p-span">
                                    <p>Food Count:<span> {billInfo.foodCount}</span></p>
                                    <p>Beverage Count:<span>{billInfo.beverageCount}</span></p>
                                    <p>Service Charge: <span>{billInfo.serviceCharge}</span></p>
                                </div>
                                <div style={{ display: 'flex' }} className="modal-p-span">
                                    <p><span>Total</span>{billInfo.total}</p>
                                    <p><span>VAT</span>{billInfo.vat}</p>
                                </div>
                            </tfood>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn" data-bs-dismiss="modal">Close</button>
                        {/* <button type="button" className="btn ">Save changes</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillDetail