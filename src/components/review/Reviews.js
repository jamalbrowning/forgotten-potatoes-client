import { React, useContext, useEffect } from "react";
import { ReviewContext } from "./ReviewProvider"

import { Card, Button } from "react-bootstrap"
import { FaStar } from "react-icons/fa"
export const Reviews = (props) => {
  const {reviews, getReviewsByUserId, deleteReview } = useContext(ReviewContext);
 


  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    getReviewsByUserId(userId);
  }, []);

 
  return (
      <div className="review-container">
        <div className="review-body">
        {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
              <div>

              <Card className="text-center">
                <Card.Body>
                  <Card.Title>{review.menu_item_id.restaurant.name}</Card.Title>
                  <Card.Text>{review.menu_item_id.name}</Card.Text>
                  <Card.Text>{review.comment}</Card.Text>
                  <Card.Text>{review.rating}/5 <FaStar size="1rem"></FaStar></Card.Text>
                  <Button onClick={e => props.history.push(`/reviews/${review.id}/edit`)}> Edit </Button>
                  <Button onClick={() => deleteReview(review.id)}>Delete</Button>
                </Card.Body>
              </Card>
              </div>
              ))) : (<h1>You haven't written any reviews.</h1>)}
        </div>
      </div>
  ) 
  
};
