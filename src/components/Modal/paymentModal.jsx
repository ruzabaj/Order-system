import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import ResponseModal from './responseModal';

const PaymentModal = ({ show, handleClose, token, selectedOutlet, selectedCustomer }) => {
    let baseUrl = process.env.REACT_APP_BASE_URL
    // const [respond, setRespond] = useState({
    //     sucsess: "",
    //     error:""
    // });
    const [respond, setRespond] = useState("");
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const handleCancel = () => setOpenModal(false);
    const handleShowed = () => setOpenModal(true);
    const [paymentValue, setPaymentValue] = useState({
        Amount: "",
        PaymentMode: "",
    })

    const handleSave = async () => {
        try {
            let response = await axios.post(`${baseUrl}/customerCreditInsert`, {
                token: token,
                outlet: `${selectedOutlet}`,
                Amount: paymentValue.Amount,
                PaymentMode: paymentValue.PaymentMode,
                CustomerName: `${selectedCustomer}`
            })
            setRespond(response.data.success)
            if (response.data.success) {
                handleClose()
                handleShowed()
            }
        }
        catch (error) {
            setError(error.response.data.error)
            // if (error.response.data.error) {
            //     handleClose()
            //     handleShowed()
            // }
        }
    }

    const handleChange = (event) => {
        const { id, value } = event.target;
        setPaymentValue({
            ...paymentValue,
            [id]: value,
        });
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose} centered >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='amount-detail'>
                        <label>Amount</label>
                        <div>
                            <input type="text" value={paymentValue.Amount} className="form-control" id="Amount" placeholder="1000" onChange={handleChange} />
                        </div>
                    </div>
                    <div className='amount-detail'>
                        <label>Payment Mode</label>
                        <div>
                            <input type="text" value={paymentValue.PaymentMode} className="form-control" id="PaymentMode" placeholder=" Cash" onChange={handleChange} />
                        </div>
                    </div>
                    <p className='error-color'>{error}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleSave} className="btn-save">
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <ResponseModal openModal={openModal} respond={respond}  handleCancel={handleCancel} />
        </div>
    )
}

export default PaymentModal