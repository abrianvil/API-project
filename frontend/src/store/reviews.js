import { csrfFetch } from './csrf';

/***************************TYPE*******************/
const SPOT_REVIEWS = '/reviews/spot'
// const ADD_A_REVIEW= '/review/spot'
const RESET_REVIEWS = `/reviews/resetReviews`


/***************************ACTION CREATOR*******************/
const loadSpotReviews = (data) => {
    return {
        type: SPOT_REVIEWS,
        data
    }
}

export const reset = () => {
    return {
        type: RESET_REVIEWS,
        data: {}
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
    if (res.ok) {
        dispatch(getAllSpotReviews(id))
    }
    return res
}

export const deleteReview=(id, id2)=>async(dispatch)=>{
    const res= await csrfFetch(`/api/reviews/${id}`, {
        method:'DELETE'
    })
    if(res.ok){
        dispatch(getAllSpotReviews(id2))
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
        case RESET_REVIEWS:
            newState={...state}
            spotReviews={...action.data}
            newState.spotReviews=spotReviews
            return newState
        default:
            return state
    }
}
