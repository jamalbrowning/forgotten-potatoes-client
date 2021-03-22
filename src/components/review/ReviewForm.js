import React, { useState, useEffect, useContext } from "react";
import $ from 'jquery'

import { ReviewContext } from "./ReviewProvider";


export const ReviewForm = (props) => {
  const { createReview, getRestaurants, restaurants, menuItems, getMenuItemByRestId } = useContext(
    ReviewContext
  );

  const [currentReview, setCurrentReview] = useState({
    rating: 1,
    comment: "",
    menu_item_id: 0,
    restaurant: 0,
  });

  useEffect(() => {
    getRestaurants();
    console.log("rest", restaurants);
  }, []);

  
  
    useEffect(() => {
      const restId = $(restaurants).value
      getMenuItemByRestId(restId);
      }, [])


    
  
  

  const handleControlledInputChange = (e) => {
    const newReviewState = Object.assign({}, currentReview);
    newReviewState[e.target.name] = e.target.value;
    setCurrentReview(newReviewState);
  };
  console.log("are there any", menuItems);
  return (
    <form>
      <h1>new game</h1>
      <fieldset>
        <div className="form-group">
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
                <div className="form-group">
                    <label htmlFor="maker">Comment: </label>
                    <input type="text" name="comment" required autoFocus className="form-control"
                        value={currentReview.comment}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="restaurant">Restaurant:</label>
          <select
            name="restaurant"
            id="restaurants"
            defaultValue=""
            onChange={handleControlledInputChange}
          >
            <option>Select...</option>
            {restaurants.results && restaurants.results.length > 0 ? (
              restaurants.results.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
              ))
            ) : (
              <option>option</option>
            )}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="menuItem">Menu Item:</label>
          <select
            name="menuItem"
            id="menuItem"
            defaultValue=""
            onChange={handleControlledInputChange}
          >
            <option>Select...</option>
            
            {menuItems.results && menuItems.results.length > 0 ? (
              menuItems.results.map((menuitem) => (
                <option key={menuitem.id} value={menuitem.id}>{menuitem.name}</option>
              ))
            ) : (
              <option>option</option>
            )}
          </select>
        </div>
      </fieldset>
    </form>
  );
};
