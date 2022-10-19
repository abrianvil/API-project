import { csrfFetch } from './csrf';

/***************************TYPE*******************/
const SPOT_REVIEWS = '/reviews/spot'


/***************************ACTION CREATOR*******************/
const loadSpotReviews = (data) => {
    return {
        type: SPOT_REVIEWS,
        data
    }
}


/***************************THUNK*******************/
export const getAllSpotReviews = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}/reviews`)

    if (res.ok) {
        const data = await res.json()
        // console.log('data in reviews thunk', data)
        dispatch(loadSpotReviews(data))
    }
}


/***************************REDUCER*******************/
const initialState = { spotReviews: {}, userReviews: {} }
export const ReviewsReducer = (state = initialState, action) => {
    let newState;
    let spotReviews;
    switch (action.type) {
        case SPOT_REVIEWS:
            newState = { ...state }
            spotReviews = {}
            action.data.Reviews.forEach(review => {
                spotReviews[review.id] = review
            });
            newState.spotReviews = spotReviews
            return newState
        default:
            return state
    }
}
