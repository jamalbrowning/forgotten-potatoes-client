import React, { useContext, useEffect } from 'react'
import { ReviewContext } from "./ReviewProvider"
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import "./review.css"

export const ReviewRestaurants = (props) => {
  const { restaurants, getRestaurants } = useContext(ReviewContext)

  useEffect(() => {
    getRestaurants()
  }, [])
  console.log("these are rests",restaurants.results)
  return (
    <div className="restaurant-list text-center justify-center align-items-center ">
      <h1>Please select a restaurant:</h1>
      {
        restaurants.results && restaurants.results.length > 0 ? (
          restaurants.results.map((restaurant) => (
           <Button href={`/review/restaurants/${restaurant.id}`}variant="outlined" className="button-menu-item">{restaurant.name}</Button>
          ))
        ) : ('')
      }
    </div>
  )
}
