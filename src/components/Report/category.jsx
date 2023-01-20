import React from 'react'

const Category = ({ categories }) => {
  let categoryList = categories
  return (
    <div>
      {Object.entries(categoryList).map(([key, value]) => (
          <div className='course-type' key={key}>
            <h5 >{key}</h5>
            <ul>
              {value.map((food, index) => (
                <li key={index}>{food.item_name}
                  <span className='food-quantity'>{food.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
          ))}
    </div>
  )
}

export default Category
