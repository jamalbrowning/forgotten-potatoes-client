import React, { useContext, useEffect } from "react";
import { ReviewContext } from "./ReviewProvider";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { Fab } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import "./review.css";

export const ReviewRestaurants = (props) => {
  const { restaurants, getRestaurantsbyUserId } = useContext(ReviewContext);

  // const createRestaurant = (restaurant) => {
  //   return fetch("http://localhost:8000/restaurants", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Token ${localStorage.getItem("fp_token")}`,
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify(restaurant),
  //   })
  //     .then((response) => response.json())
  //     // .then(getRestaurants);
  // };

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    getRestaurantsbyUserId(userId);
  }, []);
  console.log("these are rests", restaurants);
  return (
    <div className="restaurant-list text-center justify-center align-items-center ">
      <h1>Please select a restaurant:</h1>
      <Tooltip title="back" aria-label="back">
        <Fab size="small" href="/reviews" color="primary" aria-label="back">
          <ArrowBackIcon />
        </Fab>
      </Tooltip>
      {restaurants && restaurants.length > 0
        ? restaurants.map((restaurant) => (
            <Button
              href={`/review/restaurants/${restaurant.id}`}
              variant="outlined"
              className="button-menu-item"
            >
              {restaurant.name}
            </Button>
          ))
        : ""}
    </div>
  );
};
