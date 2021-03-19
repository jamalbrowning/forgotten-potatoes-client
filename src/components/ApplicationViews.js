import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Home } from "./home/home";
import { Reviews } from "./review/Reviews";
import { SingleReview } from "./review/SingleReview";
import { Profile } from "./profile/Profile";

import { ProfileProvider } from "./profile/ProfileProvider";
import { ReviewProvider } from "./review/ReviewProvider";

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
      </ProfileProvider>
      <ReviewProvider>
      <Route
        exact
        path="/reviews"
        render={(props) => {
          return <Reviews {...props} history={props.history} />;
        }}
      />
      <Route
        exact
        path="/singlereview"
        render={(props) => {
          return <SingleReview history={props.history} />;
        }}
      />
      </ReviewProvider>
      
    </>
  );
};
