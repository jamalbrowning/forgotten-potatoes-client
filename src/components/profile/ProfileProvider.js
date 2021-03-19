import React, { useState } from "react";

export const ProfileContext = React.createContext();

export const ProfileProvider = (props) => {
  const [reviews, setReviews] = useState({});

  const getReviewsByUserId = (id) => {
    return fetch(`http://localhost:8000/reviews?user=${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("fp_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setReviews);
  };
  console.log("more", reviews);
  return (
    <ProfileContext.Provider
      value={{
        reviews,
        getReviewsByUserId,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};
