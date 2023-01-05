import { csrfFetch } from './csrf';


/***************************TYPE*******************/

const GET_ALL_BOOKINGS = 'bookings/getSpots';
const GET_A_BOOKING = 'booking/getBooking';
const CREATE_BOOKING = 'booking/addBooking';
const DELETE_A_BOOKING = 'booking/removeBooking';
const UPDATE_A_BOOKING = 'booking/updateBooking';
const CLEAR_STATE = 'booking/clearState'


/***************************ACTION CREATOR*******************/

const loadBookings = (bookings) => {
    return {
        type: GET_ALL_BOOKINGS,
        bookings
    }
}

const loadOneBooking = (booking) => {
    return {
        type: GET_A_BOOKING,
        booking
    }
}

const addBooking = (booking) => {
    return {
        Type: CREATE_BOOKING,
        booking
    }
}


const delBooking = (bookingId) => {
    return {
        type: DELETE_A_BOOKING,
        bookingId
    }
}

const editBooking = (booking) => {
    return {
        type: UPDATE_A_BOOKING,
        booking
    }
}


export const clearState = () => {
    return {
        type: CLEAR_STATE,
        data: {}
    }
}


/***************************THUNK*******************/

//SECTION -GET ALL THE BOOKINGS OF A SPOT
export const getAllBookings = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}/bookings`)

    if (response.ok) {
        const data = await response.json()
        dispatch(loadBookings(data.Bookings))
    }
}


// export const getOneBooking = (id) => async dispatch => {
//     const response = await csrfFetch()
// }

export const createBooking = (payload) => async dispatch => {
    const { spotId, booking } = payload
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    })

    if (response.ok) {
        const data = response.json()
        await dispatch(addBooking(data))
    }
}


export const updateBooking = (booking) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    })

    if (response.ok) {
        const data = response.json()
        await dispatch(editBooking(data))
    }
}


export const deleteBooking = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = response.json()
        await dispatch(delBooking(bookingId))
    }
}


/***************************REDUCER*******************/


const initialState = { all: {}, one: {} }

const bookingReducer = (state = initialState, action) => {
    let newState = {}

    switch (action.type) {
        case GET_ALL_BOOKINGS:
            newState = { ...state }
            newState.all = {}
            action.bookings.forEach(booking => {
                newState.all[booking.id] = booking
            });
            return newState

        default:
            return state;
    }
}



export default bookingReducer
