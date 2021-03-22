import React, { useContext, useEffect, useState }from 'react'
import { ReviewContext } from "./ReviewProvider"


export const Review = (props) => {
  console.log('props', props)
  const { getMenuItemById, createReview, getReviewById, updateReview } = useContext(ReviewContext)
  const [ menuItem, setMenuItem ] = useState({})
  
  const [currentReview, setCurrentReview] = useState({
    user: 1,
    rating: 1,
    comment: "",
    menu_item_id: '',
  });
  

  
  useEffect(() =>{
    if ("reviewId" in props.match.params) {
      getReviewById(props.match.params.reviewId).then(review => {
        setCurrentReview({
          id: props.match.params.reviewId,
          user: review.user,
          rating: review.rating,
          comment: review.comment,
          menu_item_id: review.menu_item_id
        })
      })
    }
  }, [props.match.params.reviewId])

  useEffect(() => {
    const { menuitemId } = props.match.params
    getMenuItemById(menuitemId)
    .then(setMenuItem)
  }, []);

  const handleControlledInputChange = (e) => {
    const newReviewState = Object.assign({}, currentReview);
    newReviewState[e.target.name] = e.target.value;
    setCurrentReview(newReviewState);
  };

  

  console.log('review state', currentReview)
  return (<div>
    <h1>{menuItem.name}</h1>
    <form>
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
            {
                ("reviewId" in props.match.params)
                    ? <button
                        onClick={evt => {
                            evt.preventDefault()
                            updateReview({
                                id: parseInt(props.match.params.reviewId),
                                rating: parseInt(currentReview.rating),
                                comment: currentReview.comment,
                                menu_item_id: currentReview.menu_item_id.id,
                                user: parseInt(localStorage.getItem("user_id"))
                            })
                            .then(() => props.history.push("/reviews"))
                        }}
                        className="btn btn-primary">Update</button>
                    : <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()
    
                        createReview({
                          user: localStorage.getItem("user_id"),
                          rating: currentReview.rating,
                          comment: currentReview.comment,
                          menu_item_id: menuItem.id
                        })
                        .then(() => props.history.push("/reviews"))
                    }}
                    className="btn btn-primary">Submit</button>
            }
            
    </form>
  </div>)
}
