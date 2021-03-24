import React, { useContext, useEffect } from "react";
import "./profile.css";
import { ProfileContext } from "./ProfileProvider";
import { Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import PageviewIcon from '@material-ui/icons/Pageview';
import Button from '@material-ui/core/Button';




export const Profile = (props) => {
  const { reviews, getReviewsByUserId } = useContext(ProfileContext);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    getReviewsByUserId(userId);
  }, []);

  return (
    <div className="review-container text-center">
        {/* <Button href="/reviews">Reviews</Button> */}
        <h3 className="text-center">Recent Reviews</h3>
      <div className="preview-container">
        

            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <Card className="profile-card">
                  <Card.Header className="header"><p>{review.menu_item_id.restaurant.name}</p>
                  <Button>< PageviewIcon style={{ fontSize: 30 }}to={`/reviews/${review.id}`}/></Button>
                  </Card.Header>
                  <Card.Body className="profile-card-body">
                    <Card.Title>{review.menu_item_id.name}</Card.Title>
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
              <tr>You haven't written any reviews.</tr>
            )}
        
      </div>
    </div>
  );
};
