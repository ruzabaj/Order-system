import React from 'react';

const Pagination = ({ pageLength, handleNumber}) => {

    return (
        <div>
            <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                    <a className="page-link">Previous</a>
                </li>
                {
                    pageLength.map((i, index) => (
                        <li className="page-item" key={index} >
                            <a className="page-link" href="#" onClick={() => handleNumber(i)}>{i}</a>
                        </li>

                    ))
                }
            </ul>
        </div >
    )
}

export default Pagination