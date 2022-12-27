import React from 'react'

const Sidebar = ({FontAwesomeIcon, Bar}) => {
  return (
    <div>
          <button classname="btn-bar" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                <FontAwesomeIcon icon={Bar} />
            </button>
            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Add</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <h1>Appetizer</h1>
                    <p>Appetizer List</p>
                </div>
            </div>
    </div>
  )
}

export default Sidebar
