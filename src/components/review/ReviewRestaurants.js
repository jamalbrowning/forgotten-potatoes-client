import React, { useContext, useEffect } from 'react'
import { ReviewContext } from "./ReviewProvider"
import { Link } from 'react-router-dom'

export const ReviewRestaurants = (props) => {
  const { restaurants, getRestaurants } = useContext(ReviewContext)

  useEffect(() => {
    getRestaurants()
  }, [])
  console.log("these are rests",restaurants.results)
  return (
    <div className="text-center justify-center align-items-center">
      <h1>Please select a restaurant:</h1>
      {
        restaurants.results && restaurants.results.length > 0 ? (
          restaurants.results.map((restaurant) => (
           <h2><Link to={`/review/restaurants/${restaurant.id}`} >{restaurant.name}</Link></h2> 
          ))
        ) : ('')
      }
    </div>
  )
}
