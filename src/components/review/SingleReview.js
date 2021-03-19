import { React, useEffect, useContext, useState } from "react";
import { ReviewContext } from "./ReviewProvider";
import { UserContext } from "../users/UserProvider"


export const SingleReview = (props) => {
  const { getReviewById } = useContext(ReviewContext)
  const { getSingleUser } = useContext(UserContext)
  const [ review, setReview] = useState({})


  const user_id = localStorage.getItem("user_id")

  useEffect(() => {
    getSingleUser(user_id)
  }, [])

  useEffect(() => {
     const { reviewId } = props.match.params
    
    getReviewById(reviewId)
    .then(setReview)
  }, [props.match.params.reviewId])

  return <h1>SingleReview</h1>;
};
