import React, { useState } from "react";

export const ReviewContext = React.createContext();

export const ReviewProvider = (props) => {
  const [reviews, setReviews] = useState({});
  const [review, setReview] = useState({});
  const [restaurants, setRestaurants] = useState({});
  const [restaurant, setRestaurant] = useState({});
  const [menuItems, setMenuItems] = useState({});
  const [menuItem, setMenuItem] = useState({});

  const getReviews = () => {
    return fetch("http://localhost:8000/reviews", {
      headers: {
        Authorization: `Token ${localStorage.getItem("fp_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setReviews);
  };

  const getReviewsByUserId = (id) => {
    return fetch(`http://localhost:8000/reviews?user=${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("fp_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setReviews);
  };

  const createReview = (review) => {
    return fetch("http://localhost:8000/reviews", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("fp_token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((response) => response.json())
      .then(getReviews);
  };

  const updateReview = (review) => {
    console.log("here is the update review", review);
    return fetch(`http://localhost:8000/reviews/${review.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("fp_token")}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(review),
    }).then(getReviews);
  };

  const deleteReview = (id) => {
    return fetch(`http://localhost:8000/reviews/${id}`, {
      method: "DELETE",
    }).then(getReviews);
  };

  const getReviewById = (id) => {
    return fetch(`http://localhost:8000/reviews/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("fp_token")}`,
      },
    }).then((res) => res.json());
    // .catch(error => {
    //   console.log(error);
    // });
  };

  const getRestbyId = (id) => {
    return fetch(`http://localhost:8000/restaurants/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("fp_token")}`,
      },
    }).then((res) => res.json());
  };

  const getRestaurantsbyUserId = (id) => {
    return fetch(`http://localhost:8000/restaurants?user=${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("fp_token")}`,
      },
    })
      .then((res) => res.json())
      .then(setRestaurants);
  };

  const getMenuItems = () => {
    return fetch("http://localhost:8000/menuitems", {
      headers: {
        Authorization: `Token ${localStorage.getItem("fp_token")}`,
      },
    })
      .then((res) => res.json())
      .then(setMenuItems);
  };

  const getMenuItemByRestId = (id) => {
    return fetch(`http://localhost:8000/menuitems?restaurant=${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("fp_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setMenuItems);
  };

  const getMenuItemById = (id) => {
    return fetch(`http://localhost:8000/menuitems/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("fp_token")}`,
      },
    }).then((res) => res.json());
  };

  return (
    <ReviewContext.Provider
      value={{
        review,
        reviews,
        restaurant,
        restaurants,
        menuItems,
        menuItem,
        getMenuItemById,
        getMenuItems,
        getRestaurantsbyUserId,
        getRestbyId,
        getReviewsByUserId,
        getMenuItemByRestId,
        createReview,
        updateReview,
        deleteReview,
        getReviewById,
      }}
    >
      {props.children}
    </ReviewContext.Provider>
  );
};
