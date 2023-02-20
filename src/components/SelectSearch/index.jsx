import React from 'react'

const SelectSearchInput = () => {
    return (
        <div><h3>{selectedOutlet}</h3>
            <SelectSearch
                defaultValue={selectedOutlet}
                search
                placeholder="Select Outlet Name"
                onChange={(event) => setSelectedOutlet(event)}
                options={listOutlet}
            />
        </div>
    )
}

export default SelectSearchInput