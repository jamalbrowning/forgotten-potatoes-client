import { React, useEffect, useContext, useState } from "react";
import { ReviewContext } from "./ReviewProvider";
import { UserContext } from "../users/UserProvider";
import { Card, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import EditIcon from "@material-ui/icons/Edit";
import { Fab } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export const SingleReview = (props) => {
  const { getReviewById } = useContext(ReviewContext);
  const { reviews, getReviewsByUserId } = useContext(ReviewContext);

  const [review, setReview] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    console.log("user", userId);
    getReviewsByUserId(userId);
  }, []);

  useEffect(() => {
    const { reviewId } = props.match.params;

    getReviewById(reviewId).then(setReview);
  }, []);

  return (
    <div className="review-container">
      <Tooltip title="back" aria-label="back">
        <Fab size="small" href="/profile" color="primary" aria-label="back">
          <ArrowBackIcon />
        </Fab>
      </Tooltip>
      {review && review ? (
        <div>
          <Card className="text-center">
            {review && review.menu_item_id ? (
              <Card.Header>{review.menu_item_id.restaurant.name}</Card.Header>
            ) : (
              ""
            )}
            <Card.Body>
              {review && review.menu_item_id ? (
                <Card.Title>{review.menu_item_id.name}</Card.Title>
              ) : (
                ""
              )}
              {review && review.comment ? (
                <Card.Text>
                  <p>{review && review.comment}</p>
                  <p>
                    {review && review.rating}/5
                    <FaStar />
                  </p>
                </Card.Text>
              ) : (
                ""
              )}

              <Tooltip title="Edit Review" aria-label="edit">
                <Fab
                  onClick={(e) =>
                    props.history.push(`/reviews/${review.id}/edit`)
                  }
                  color="secondary"
                  aria-label="edit"
                  size="small"
                >
                  <EditIcon />
                </Fab>
              </Tooltip>
            </Card.Body>
          </Card>{" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
