import { csrfFetch } from './csrf';


/***************************TYPE*******************/

const GET_ALL_SPOTS = 'spots/getSpots';
const GET_A_SPOT = 'spots/getSpot';
// const ADD_A_SPOT = 'spots/addSpot';
// const DELETE_A_SPOT = 'spot/removeSpot';


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




/***************************THUNK*******************/
export const getAllSpots = () => async (dispatch) => {
    // const res = await csrfFetch('api/Spots')
    const res = await fetch('api/Spots')


    if (res) {
        const data = await res.json()
        // console.log('data from thunk===>', data)
        dispatch(Spots(data))
        // return res
    }
}


export const getASpot = (id) => async (dispatch) => {
    const res = await fetch(`/api/Spots/${id}`)
    console.log('res===>', res)
    if (res) {
        const data = await res.json()
        console.log('spotThunk===>', data)
        dispatch(Spot(data))
        return res
    }
}


/***************************REDUCER*******************/

const initialState = {all:{}, one:{}}

export const SpotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        // case GET_ALL_SPOTS:
        //     newState = Object.assign({}, state);
        //     newState = action.data
        //     return newState
        case GET_ALL_SPOTS:
            const allSpots = { ...state}
            let all={}
            action.data.Spots.forEach(spot => {
                all[spot.id] = spot
            });
            allSpots.all=all
            return allSpots
        case GET_A_SPOT:
            newState={ ...state}
            let one={...action.spot}
            const Owner1Name=one.Owner.firstName
            const Owner2Name=one.Owner.lastName
            const imgUrl=one.SpotImages[0].url
            // console.log('ownerName===>', Owner1Name)
            one['firstName']=Owner1Name
            one['lastName']=Owner2Name
            one['imgUrl']=imgUrl
            newState.one=one
            return newState
        default:
            return state
    }
}
