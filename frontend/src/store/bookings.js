import { csrfFetch } from './csrf';


/***************************TYPE*******************/

const GET_ALL_BOOKINGS = 'bookings/getBookings';
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
        type: CREATE_BOOKING,
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
        return data
    }
}


// export const getOneBooking = (id) => async dispatch => {
//     const response = await csrfFetch()
// }

export const createBooking = (payload) => async dispatch => {
    const { spotId, booking } = payload
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    })

    if (response.ok) {
        const data = await response.json()
        // console.log('this is response in the create booking thunk', data)
        if (data.errors) {
            return data
        } else {
            dispatch(addBooking(data))
            return data
        }
    }
    // } else if (response.status < 500) {
    //     const data = await response.json();
    //     console.log('this is response in the create booking thunk', data)
    //     if (data.errors) {
    //         return data
    //     }
    // }
}


export const updateBooking = (booking) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    })

    if (response.ok) {
        const data = response.json()
        dispatch(editBooking(data))
    }
}


export const deleteBooking = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = response.json()
        dispatch(delBooking(bookingId))
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

        case GET_A_BOOKING:
            newState = { ...state }
            newState.one = { ...action.booking }
            return newState

        case CREATE_BOOKING:
            newState.all = { ...state.all, [action.booking.id]: action.booking }
            return newState

        case UPDATE_A_BOOKING:
            newState = { ...state, [action.booking.id]: action.booking }
            return newState

        case DELETE_A_BOOKING:
            newState = { ...state }
            delete newState[action.bookingId]
            return newState

        case CLEAR_STATE:
            newState = { ...state }
            newState.all = {}
            return newState

        default:
            return state;
    }
}



export default bookingReducer
