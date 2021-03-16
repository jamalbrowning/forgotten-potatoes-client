import React, { useState } from "react";

export const ProfileContext = React.createContext();

export const ProfileProvider = (props) => {
  const [review, setReview] = useState({});

  const getReviewsByUserId = (id) => {
    return fetch(`http://localhost:8000/reviews?user=${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("fp_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setReview);
  };
  return (
    <ProfileContext.Provider
      value={{
        getReviewsByUserId,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};
