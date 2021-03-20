import React, { useState } from "react";

export const ReviewContext = React.createContext();

export const ReviewProvider = (props) => {
  const [reviews, setReviews] = useState({});
  const [ review, setReview ] = useState({})

  const getReviews = () => {
    return fetch('http://localhost:8000/reviews',{
        headers:{
        "Authorization": `Token ${localStorage.getItem("fp_token")}`
        }
    })
        .then(response => response.json())
        .then(setReviews)
    }

  const getReviewsByUserId = (id) => {
    return fetch(`http://localhost:8000/reviews?user=${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("fp_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setReviews);
  };

  const createReview = review => {
    return fetch('http://localhost:8000/reviews', {
      method: 'POST',
      headers:{
        "Authorization": `Token ${localStorage.getItem("fp_token")}`,
        'Content-Type': 'application/json',
        "Accept":"application/json",
      },
      body: JSON.stringify(review)
    })
      .then(response => response.json())
      .then(getReviews)
  }

  const updateReview = review => {
    return fetch(`http://localhost:8000/reviews/${review.id}`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review)
    })
      .then(getReviews)
  }
  const deleteReview = id => {
    return fetch(`http://localhost:8000/reviews/${id}`, {
        method: 'DELETE',
    })
        .then(getReviews)
}

const getReviewById = (id) => {
  return fetch(`http://localhost:8000/reviews/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("fp_token")}`
    }
  })
    .then((res) => res.json())
    // .catch(error => {
    //   console.log(error);
    // }); 
}

  console.log("more", getReviewById(1));
  return (
    <ReviewContext.Provider
      value={{
        review,
        reviews,
        getReviewsByUserId,
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
