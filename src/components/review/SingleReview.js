import { React, useEffect, useContext, useState } from "react";
import { ReviewContext } from "./ReviewProvider";
import { UserContext } from "../users/UserProvider"
import { Card , Button} from "react-bootstrap"
import { FaStar } from "react-icons/fa"


export const SingleReview = (props) => {
  const { getReviewById } = useContext(ReviewContext)
  const {reviews, getReviewsByUserId } = useContext(ReviewContext);
  // const { user, getSingleUser } = useContext(UserContext)
  const [ review, setReview] = useState({})


  
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    console.log("user", userId)
    getReviewsByUserId(userId);
  }, []);

  // useEffect(() => {
  //   const userId = localStorage.getItem("user_id")
  //   console.log("user2", userId)
  //   getSingleUser(userId)
  // }, [])
  
  useEffect(() => {
     const { reviewId } = props.match.params
    
    getReviewById(reviewId)
    .then(setReview)
  }, [props.match.params.reviewId])
  console.log(review)

  return <div className="review-container">
  {review && review ? 
  <div>
  <Card className="text-center">
  {review && review.menu_item_id ? <Card.Header>{review.menu_item_id.menu.rest_id.name}</Card.Header>: ''}
  <Card.Body>
   {review && review.menu_item_id ? <Card.Title>{review.menu_item_id.name}</Card.Title> : ''}
    {review && review.comment  ? <Card.Text>
      {review && review.comment}
    </Card.Text> : ''}
    <Button href={`/reviews/${review.id}/edit`} variant="primary">Update Review</Button>
  </Card.Body>
  
</Card> </div>: ''}
</div>
};
