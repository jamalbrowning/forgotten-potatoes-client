import React from "react";
import "./App.scss";
import { Route } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/Navbar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

export const FP = () => (
  <>
    <Route
      render={() => {
        return (
          <>
            <Route render={(props) => <NavBar {...props} />} />
            <Route render={(props) => <ApplicationViews {...props} />} />
          </>
        );
      }}
    />
    <Route path="/login" render={(props) => <Login {...props} />} />
    <Route path="/register" render={(props) => <Register {...props} />} />
  </>
);
