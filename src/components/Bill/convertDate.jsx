import React from 'react'

const ConvertDate = ({date}) => {
    let newDate= date.slice(0, 17);
  return (
    <div>
        {newDate}
    </div>
  )
}

export default ConvertDate