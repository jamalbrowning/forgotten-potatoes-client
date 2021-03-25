import React, { useContext, useEffect } from 'react'
import { ReviewContext } from "./ReviewProvider"
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip';
import { Fab } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
      <Tooltip title="back" aria-label="back">
          <Fab size="small" href="/reviews" color="primary" aria-label="back">
          <ArrowBackIcon />
          </Fab>
        </Tooltip>
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
