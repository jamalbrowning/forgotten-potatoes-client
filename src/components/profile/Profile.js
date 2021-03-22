import React, { useContext, useEffect } from "react";
import "./profile.css";
import { ProfileContext } from "./ProfileProvider";
import { Table, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom'

export const Profile = (props) => {
  const { reviews, getReviewsByUserId } = useContext(ProfileContext);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    getReviewsByUserId(userId);
  }, []);

  return (
    <div className="review-container">
      <div className="preview-container">
        <h3 className="text-center">Recent Reviews</h3>
        <Table striped border hover variant="dark">
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Menu Item</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <tr>
                  <td ><Link to={`/reviews/${review.id}`}>{review.menu_item_id.restaurant.name} </Link></td>
                  <td>{review.menu_item_id.name}</td>
                  <td>
                    {review.rating}/5 <FaStar size="1rem" />{" "}
                  </td>
                </tr>
              ))
            ) : (
              <h1>You haven't written any reviews.</h1>
            )}
          </tbody>
        </Table>
        <Button href="/review/restaurants">New Review</Button>
        <Button href="/reviews">Reviews</Button>
      </div>
    </div>
  );
};
