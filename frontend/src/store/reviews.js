import { csrfFetch } from './csrf';

/***************************TYPE*******************/
const SPOT_REVIEWS = '/reviews/spot'
// const ADD_A_REVIEW= '/review/spot'


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

export const addReview = (payload) => async (dispatch) => {
    const { review, stars, id } = payload
    const res = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            review,
            stars
        })
    })
    return res
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
