import { React, useContext, useEffect } from "react";
import { ReviewContext } from "./ReviewProvider";

import { Card, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PageviewIcon from "@material-ui/icons/Pageview";

import "./review.css";

export const Reviews = (props) => {
  const { reviews, getReviewsByUserId } = useContext(ReviewContext);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    getReviewsByUserId(userId);
  }, []);

  const deleteReviewNow = (id) => {
    return fetch(`http://localhost:8000/reviews/${id}`, {
      method: "DELETE",
    }).then(window.location.reload());
  };

  return (
    <div>
      <div className="review-container">
        <div className="add-container">
          <Tooltip title="Add Review" aria-label="add">
            <Fab
              size="small"
              href="/review/restaurants"
              color="primary"
              aria-label="add"
            >
              <AddIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="back" aria-label="back">
            <Fab size="small" href="/profile" color="primary" aria-label="back">
              <ArrowBackIcon />
            </Fab>
          </Tooltip>
        </div>
        <div className="review-body">
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <div>
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title className="review-page">
                      {review.menu_item_id.restaurant.name}
                    </Card.Title>
                    <Card.Text>{review.menu_item_id.name}</Card.Text>
                    <Card.Text>{review.comment}</Card.Text>
                    <Card.Text>
                      {review.rating}/5 <FaStar size="1rem"></FaStar>
                    </Card.Text>
                    <div className="bottom-icons">
                      <Fab href={`/reviews/${review.id}`} size="small">
                        <PageviewIcon style={{ fontSize: 30 }} />
                      </Fab>

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
                      <Fab
                        size="small"
                        onClick={() => deleteReviewNow(review.id)}
                      >
                        <DeleteIcon />
                      </Fab>
                    </div>
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
