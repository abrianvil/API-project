import { csrfFetch } from "./csrf";

/***************************TYPE*******************/
const GET_MY_SPOTS='spots/getMySpots'
const GET_MY_BOOKINGS='bookings/getMyBookings'


/***************************ACTION CREATOR*******************/
const loadMySpots=(spots) =>{
    return {
        type: GET_MY_SPOTS,
        spots
    }
}

const loadMyBookings=(bookings)=>{
    return {
        type: GET_MY_BOOKINGS,
        bookings
    }

}


/***************************THUNK*******************/


export const getAllMyBookings=()=> async (dispatch)=>{
    const response= await csrfFetch('api/bookings/current')

    if(response.ok){
        const data= await response.json()
        dispatch(loadMyBookings(data.Bookings))
    }
}


export const getAllMySpots=()=>async (dispatch)=>{
    const response= await csrfFetch('api/spots/current')

    if (response.ok){
        const data= await response.json()
        dispatch(loadMySpots(data.Spots))
    }
}


/***************************REDUCER*******************/
const initialState={ mySpots:{}, myBookings:{}}

const portfolioReducer =(state=initialState, action)=>{
    let newState={}
    switch (action.type){
        case GET_MY_BOOKINGS:
            newState={...state}
            newState.myBookings={}
            action.bookings.forEach(booking => {
                newState.myBookings[booking.id]=booking
            });
            return newState

        case GET_MY_SPOTS:
            newState={...state}
            newState.mySpots={}
            action.spots.forEach(spot=>{
                newState.mySpots[spot.id]=spot
            })
            return newState

        default:
            return state;
    }
}


export default portfolioReducer
