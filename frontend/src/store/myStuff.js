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
    const response= await csrfFetch('api/spots/current')

    if(response.ok){
        const data= await response.json()
        dispatch(loadMyBookings(data.Spots))
    }
}
