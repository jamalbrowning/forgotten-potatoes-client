import React, { useContext, useEffect, useState } from "react";
import { ReviewContext } from "./ReviewProvider";
import { Fab } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import PublishIcon from '@material-ui/icons/Publish';

import "./review.css";

export const Review = (props) => {
  console.log("props", props);
  const {
    getMenuItemById,
    createReview,
    getReviewById,
    updateReview,
  } = useContext(ReviewContext);
  const [menuItem, setMenuItem] = useState({});

  const [currentReview, setCurrentReview] = useState({
    user: 1,
    rating: 1,
    comment: "",
    menu_item_id: "",
  });

  useEffect(() => {
    if ("reviewId" in props.match.params) {
      getReviewById(props.match.params.reviewId).then((review) => {
        setCurrentReview({
          id: props.match.params.reviewId,
          user: review.user,
          rating: review.rating,
          comment: review.comment,
          menu_item_id: review.menu_item_id,
        });
      });
    }
  }, [props.match.params.reviewId]);

  useEffect(() => {
    const { menuitemId } = props.match.params;
    getMenuItemById(menuitemId).then(setMenuItem);
  }, []);

  const handleControlledInputChange = (e) => {
    const newReviewState = Object.assign({}, currentReview);
    newReviewState[e.target.name] = e.target.value;
    setCurrentReview(newReviewState);
  };

  console.log("review state", currentReview);
  return (
    <div>
      <h3>{menuItem.name}</h3>
      <form className="review-form">
        <fieldset>
          <div className="form-group-rating">
            <label htmlFor="rating">rating: </label>
            <input
              type="number"
              min="1"
              max="5"
              name="rating"
              required
              autoFocus
              className="form-control"
              value={currentReview.rating}
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group-comment">
            <label htmlFor="maker">Comment: </label>
            <textarea
            type="text"
            name="comment"
            required
            autoFocus
            className="form-control-comment"
            value={currentReview.comment}
            onChange={handleControlledInputChange}>

            </textarea>
          </div>
        </fieldset>
        {"reviewId" in props.match.params ? (
        <Tooltip title="Edit Review" aria-label="add">
        <Fab 
        size="small" 
        href="/review/restaurants" 
        color="primary" 
        aria-label="update"
        onClick={(evt) => {
          evt.preventDefault();
          updateReview({
            id: parseInt(props.match.params.reviewId),
            rating: parseInt(currentReview.rating),
            comment: currentReview.comment,
            menu_item_id: currentReview.menu_item_id.id,
            user: parseInt(localStorage.getItem("user_id")),
          }).then(() => props.history.push("/reviews"));
        }}>
          <PublishIcon />
        </Fab>
      </Tooltip>
        ) : (
          <Tooltip title="Add Review" aria-label="add">
<Fab 
size="small" 
href="/review/restaurants" 
color="primary" 
aria-label="Add"
onClick={(evt) => {
  evt.preventDefault();

  createReview({
    user: localStorage.getItem("user_id"),
    rating: currentReview.rating,
    comment: currentReview.comment,
    menu_item_id: menuItem.id,
  }).then(() => props.history.push("/reviews"));
}}>
  <PublishIcon />
</Fab>
</Tooltip>
        )}
      </form>
    </div>
  );
};
