import React, { useContext, useEffect, useState } from 'react'
import { ReviewContext } from "./ReviewProvider"
import { Link } from 'react-router-dom'

export const ReviewMenuItems = (props) => {
  const { menuItems, getMenuItemByRestId } = useContext(ReviewContext)
  const { getRestbyId } = useContext(ReviewContext)
  const [ restaurant, setRestaurant ] = useState({})
  
  useEffect(() => {
    const { restaurantId } = props.match.params

    getMenuItemByRestId(restaurantId)
  }, [])

  useEffect(() => {
    const { restaurantId } = props.match.params
    
    getRestbyId(restaurantId)
    .then(setRestaurant)
  }, [])
    
  return (
    <div className="text-center justify-center align-items-center">
      <h1>{restaurant.name}</h1>
      <h1>Please select a menu item:</h1>
      {
        menuItems && menuItems.length > 0 ? (
          menuItems.map((menuitem) => (
            <h4><Link to={`/review/menuitem/${menuitem.id}`}>{menuitem.name}</Link></h4>
          ))
        ) : ('')
      }
    </div>
  )
}
