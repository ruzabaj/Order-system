import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import "../../scss/search.scss";

const Search = ({ handleChange, outlet, handleEnter }) => {
    return (
        <div className='center-input-outlet'>
            <div className="search">
                <SelectSearch
                    options={outlet}
                    defaultValue=""
                    search
                    placeholder="Select Outlet Name"
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <button type="sumbit" className="btn-enter-icon" onClick={handleEnter}>
                <span><FontAwesomeIcon icon={faSearch} /></span>
            </button>
        </div>
    )
}

export default Search