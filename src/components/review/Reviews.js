import { React, useContext, useEffect } from "react";
import { ReviewContext } from "./ReviewProvider";

import { Card, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from '@material-ui/core/Tooltip';

import "./review.css";

export const Reviews = (props) => {
  const { reviews, getReviewsByUserId } = useContext(ReviewContext);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    getReviewsByUserId(userId);
  }, []);

  return (
    <div><div></div>
      <div className="add-container">
      <Tooltip title="Add Review" aria-label="add">
        <Fab size="small" href="/review/restaurants" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      </div>
      <div className="review-container">
        <div className="review-body">
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <div>
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title>
                      {review.menu_item_id.restaurant.name}
                    </Card.Title>
                    <Card.Text>{review.menu_item_id.name}</Card.Text>
                    <Card.Text>{review.comment}</Card.Text>
                    <Card.Text>
                      {review.rating}/5 <FaStar size="1rem"></FaStar>
                    </Card.Text>
                    <Tooltip title="Edit Review" aria-label="edit">
                    <Fab
                      onClick={(e) =>
                        props.history.push(`/reviews/${review.id}/edit`)
                      }
                      color="secondary"
                      aria-label="edit"
                    >
                      <EditIcon />
                    </Fab>
                    </Tooltip>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <h1>You haven't written any reviews.</h1>
          )}
        </div>
      </div>
    </div>
  );
};
