import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCutlery} from '@fortawesome/free-solid-svg-icons'

const HandleButton= ({startCook, handleCookProcess}) => {
    return (
        <div>
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
    )
}

export default HandleButton
