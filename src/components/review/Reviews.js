import { React, useContext, useEffect } from "react";
import { ReviewContext } from "./ReviewProvider"
import { Card, Button} from "react-bootstrap"
import { FaStar } from "react-icons/fa"
export const Reviews = (props) => {
  const {reviews, getReviewsByUserId } = useContext(ReviewContext);

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
                  <Card.Title>{review.menu_item_id.menu.rest_id.name}</Card.Title>
                  <Card.Text>{review.menu_item_id.name}</Card.Text>
                  <Card.Text>{review.rating}/5 <FaStar size="1rem"></FaStar></Card.Text>
                </Card.Body>
              </Card>
                  {/* <td ><Link to={`/singlereview/${review.id}`}>{ </Link></td>
                  <td></td>
                  <td>
                    {review.rating}/5 <FaStar size="1rem" />{" "}
                  </td> */}
              </div>
              ))
            ) : (
              <h1>You haven't written any reviews.</h1>
            )}
        </div>
      </div>
  ) 
  
};
