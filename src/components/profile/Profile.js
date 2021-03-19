import React, { useContext, useEffect } from "react";
import "./profile.css";
import { ProfileContext } from "./ProfileProvider";
import { ProfileReviewCards } from "./profileReviewCards";
import { Table } from "react-bootstrap"

export const Profile = (props) => {
  const { reviews, getReviewsByUserId } = useContext(ProfileContext);

  const userId = localStorage.getItem("user_id");
  console.log("user id", userId);
  useEffect(() => {
    getReviewsByUserId(userId);
  }, []);
  console.log("review", reviews.results);
  const reviewCards =
    reviews.length > 0 ? (
      reviews.map((review) => (
          
          <div>
            <tr>
              <td>{review.menu_item_id.menu.rest_id.name} </td>
          <td>{review.rating}</td>
          <td>{review.menu_item_id.name}</td>
          </tr>
            

          </div>
        
      ))
    ) : (
      <h1>You haven't written any reviews.</h1>
    );
  return (
    <div className="home-container">
      <div className="preview-container">
      <Table striped border hover>
      <thead>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
            
            <tbody>
              {
               reviews && reviews.length > 0 ? (
                  reviews.map((review) => (
                      
                      
                        <tr>
                          <td>{review.menu_item_id.menu.rest_id.name} </td>
                      <td>{review.rating}</td>
                      <td>{review.menu_item_id.name}</td>
                      </tr>
                        
            
                     
                    
                  ))
                ) : (
                  <h1>You haven't written any reviews.</h1>
                )
              } 
            </tbody>
      </Table>
          </div>
    </div>
  );
};
