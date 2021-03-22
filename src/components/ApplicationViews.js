import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./home/home";

import { Profile } from "./profile/Profile";

import { ProfileProvider } from "./profile/ProfileProvider";

import { ReviewProvider } from "./review/ReviewProvider";
import { Reviews } from "./review/Reviews";
import { SingleReview } from "./review/SingleReview";
import { ReviewRestaurants } from "./review/ReviewRestaurants"
import { ReviewMenuItems } from "./review/ReviewMenuItems"
import { ReviewForm } from "./review/ReviewForm";
import { Review } from "./review/Review"

export const ApplicationViews = () => {
  return (
    <>
      <Route
        exact
        path="/"
        render={(props) => {
          return <Home history={props.history} />;
        }}
      />

      <ProfileProvider>
          <Route
            exact
            path="/profile"
            render={(props) => {
              return <Profile {...props} history={props.history} />;
            }}
          />
      

        <ReviewProvider>

            <Route 
            exact path="/review/menuitem/:menuitemId"
            render={(props) => {
              return <Review {...props} />
            }} />
            <Route 
            exact path="/reviews/:reviewId(\d+)/edit"
            render={(props) => {
              return <Review {...props} />
            }}
            />


          <Route 
          exact path="/review/restaurants"
          render={(props) => {
            return <ReviewRestaurants {...props} />
          }}/>

          <Route 
          exact path="/review/restaurants/:restaurantId"
          render={(props) => {
            return <ReviewMenuItems {...props} />
          }}/>
      
         
          <Route
            exact
            path="/new-review"
            render= {(props) => {
              return <ReviewForm {...props}  />;
            }}
          />
          <Route
            exact
            path="/reviews"
            render={(props) => {
              return <Reviews {...props} />;
            }}
          />
          <Route
            exact
            path="/reviews/:reviewId"
            render={(props) => {
              return <SingleReview {...props} />;
            }}
          />
        </ReviewProvider>
      </ProfileProvider>
      
      
    </>
  );
};
