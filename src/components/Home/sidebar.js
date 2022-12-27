import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import "../../scss/sidebar.scss";

const Sidebar = () => {
  return (
    <div>
      <button classname="btn-bar" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Item Summary</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className='course-type'>
            <h5>Appetizer</h5>
            <ul>
              <li>Cheese Selection
                <span>5</span>
              </li>
            </ul>
          </div>
          <div className='course-type'>
            <h5>Entree</h5>
            <ul>
              <li>Filet Miglon
                <span>5</span>
              </li>
            </ul>
          </div>
          <div className='course-type'>
            <h5>Salads</h5>
            <ul>
              <li>Tres Leches
                <span>5</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
