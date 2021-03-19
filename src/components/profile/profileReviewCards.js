import React, { useContext, useEffect } from "react";
import { UserContext } from "../users/UserProvider";

export const ProfileReviewCards = (props) => {
  const { review } = props;

  return (
    <div className="profile-review-card">
      <p>{review.comment}</p>
    </div>
  );
};
