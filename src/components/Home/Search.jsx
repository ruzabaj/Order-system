import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = ({ handleChange, handleEnter }) => {
    return (
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
    )
}

export default Search