import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const PaymentModal = ({show, handleClose}) => {

    return (
        <div> 
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='amount-detail'>
                        <label>Amount</label>
                        <div>
                            <input type="text" className="form-control" id="amount" placeholder="Amount" />
                        </div>
                    </div>
                    <div className='amount-detail'>
                        <label>Payment Mode</label>
                        <div>
                            <input type="text" className="form-control" id="amount" placeholder="Amount" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal></div>
    )
}

export default PaymentModal