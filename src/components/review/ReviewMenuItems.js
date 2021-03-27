import React, { useContext, useEffect, useState } from "react";
import { ReviewContext } from "./ReviewProvider";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import "./review.css";

export const ReviewMenuItems = (props) => {
  const { menuItems, getMenuItemByRestId } = useContext(ReviewContext);
  const { getRestbyId } = useContext(ReviewContext);
  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    const { restaurantId } = props.match.params;

    getMenuItemByRestId(restaurantId);
  }, []);

  useEffect(() => {
    const { restaurantId } = props.match.params;

    getRestbyId(restaurantId).then(setRestaurant);
  }, []);

  return (
    <div className="text-center menu-items">
      <h2>{restaurant.name}</h2>
      <h6>Please select a menu item:</h6>
      <div className="menuitem-container">
        {menuItems && menuItems.length > 0
          ? menuItems.map((menuitem) => (
              <Button
                href={`/review/menuitem/${menuitem.id}`}
                variant="outlined"
                className="button-menu-item"
              >
                {menuitem.name}
              </Button>
            ))
          : ""}
      </div>
    </div>
  );
};
