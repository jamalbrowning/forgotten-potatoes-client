import React, { useContext, useEffect } from "react";
import "./profile.css";
import { ProfileContext } from "./ProfileProvider";
import { Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import PageviewIcon from "@material-ui/icons/Pageview";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

export const Profile = (props) => {
  const { reviews, getReviewsByUserId } = useContext(ProfileContext);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    getReviewsByUserId(userId);
  }, []);

  return (
    <div className="review-container text-center">
      {/* <Button href="/reviews">Reviews</Button> */}
      <h3 className="text-center profile-header">Recent Reviews</h3>
      <div className="preview-container">
        {reviews && reviews.length > 0 ? (
          reviews.slice(0, 2).map((review) => (
            <Card className="profile-card">
              <Card.Header className="header">
                <p>{review.menu_item_id.restaurant.name}</p>
                <Button href={`/reviews/${review.id}`}>
                  <PageviewIcon style={{ fontSize: 30 }} />
                </Button>
              </Card.Header>
              <Card.Body className="profile-card-body">
                <Card.Title>
                  <p className="profile-review-menu-name">
                    {review.menu_item_id.name}
                  </p>
                </Card.Title>
                <Card.Text>
                  {review.rating}/5 <FaStar size="1rem" />{" "}
                </Card.Text>
              </Card.Body>
            </Card>

            // <tr>
            //   <td ><Link to={`/reviews/${review.id}`}>{review.menu_item_id.restaurant.name} </Link></td>
            //   <td>{review.menu_item_id.name}</td>
            //   <td>
            //     {review.rating}/5 <FaStar size="1rem" />{" "}
            //   </td>
            // </tr>
          ))
        ) : (
          <div>
            <p>You haven't written any reviews.</p>
            <p>Please add a review.</p>
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
          </div>
        )}
        <Button variant="outlined" href="/reviews">
          All Reviews
        </Button>
      </div>
    </div>
  );
};
