import { csrfFetch } from './csrf';


/***************************TYPE*******************/

const GET_ALL_SPOTS = 'spots/getSpots';
const GET_A_SPOT = 'spots/getSpot';
// const ADD_A_SPOT = 'spots/addSpot';
const DELETE_A_SPOT = 'spot/removeSpot';
const UPDATE_A_SPOT = 'spot/updateSpot';
const CLEAR_STATE = 'spot/clearState'


/***************************ACTION CREATOR*******************/

const Spots = (data) => {
    return {
        type: GET_ALL_SPOTS,
        data
    }
}

const Spot = (spot) => {
    return {
        type: GET_A_SPOT,
        spot
    }
}


const Del = (data) => {
    return {
        type: DELETE_A_SPOT,
        data
    }
}

const editSpot = (spot) => {
    return {
        type: UPDATE_A_SPOT,
        spot
    }
}


export const clearState = () => {
    return {
        type: CLEAR_STATE,
        data: {}
    }
}

/***************************THUNK*******************/
//get all spot
export const getAllSpots = () => async (dispatch) => {
    // const res = await csrfFetch('api/Spots')
    const res = await fetch('api/spots')


    if (res.ok) {
        const data = await res.json()
        // console.log('data from thunk===>', data)
        dispatch(Spots(data))
        // return res
    }
}

//get a single spot
export const getASpot = (id) => async (dispatch) => {
    const res = await fetch(`/api/spots/${id}`)
    // console.log('res===>', res)
    if (res.ok) {
        const data = await res.json()
        // console.log('spotThunk===>', data)
        dispatch(Spot(data))
        return res
    }
}

//delete a spot
export const deleteASpot = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    })
    // console.log("did it delete===>", res)
    if (res.ok) {
        const res = await fetch('api/spots')
        if (res.ok) {
            const data = await res.json()
            dispatch(Del(data))
        }
        return res.json()
    }
}

//create a spot thunk
export const createASpot = (payload) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description,
        price, image } = payload
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            address, city,
            state, country,
            lat, lng,
            name, description,
            price
        })
    })
    if (res.ok) {
        const data = await res.json()
        // console.log('data from create spots===>', data)
        const sender = {
            id: data.id,
            url: image
        }
        // console.log('before dispatch add image')
        await dispatch(addImageToSpot(sender))
        // console.log('after dispatch add image')

        return data
    }
}

//edit a spot
export const editASpot = (payload) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name,
        description, price, id } = payload
    const res = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            address, city,
            state, country,
            lat, lng,
            name, description,
            price
        })
    })
    return res
}


//add image to spot
export const addImageToSpot = (payload) => async (dispatch) => {
    const { url, id } = payload
    // console.log('inside add image')
    const imageFetch = await csrfFetch(`/api/spots/${id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            url,
            preview: true
        })
    })
    // console.log('imageAdded===>', imageFetch)
    if (imageFetch.ok) {
        dispatch(getASpot(id))
    }
}



/***************************REDUCER*******************/

const initialState = { all: {}, one: {} }

export const SpotsReducer = (state = initialState, action) => {
    let newState;
    let all;
    let one;
    switch (action.type) {
        // case GET_ALL_SPOTS:
        //     newState = Object.assign({}, state);
        //     newState = action.data
        //     return newState
        case GET_ALL_SPOTS:
            const allSpots = { ...state }
            all = {}
            action.data.Spots.forEach(spot => {
                all[spot.id] = spot
            });
            allSpots.all = all
            return allSpots
        case GET_A_SPOT:
            newState = { ...state }
            one = { ...action.spot }
            let Owner1Name = one.Owner.firstName
            let Owner2Name = one.Owner.lastName
            let imgUrl = one.SpotImages[0].url
            // console.log('ownerName===>', Owner1Name)
            one['firstName'] = Owner1Name
            one['lastName'] = Owner2Name
            one['imgUrl'] = imgUrl
            newState.one = one
            return newState
        case DELETE_A_SPOT:
            newState = { ...state }
            all = {}
            action.data.Spots.forEach(spot => {
                all[spot.id] = spot
            });
            newState.all = all
            return newState
        case CLEAR_STATE:
            newState={...state}
            one={...action.data}
            newState.one=one
            return newState
        default:
            return state
    }
}
