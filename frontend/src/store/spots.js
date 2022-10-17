import { csrfFetch } from './csrf';


/***************************TYPE*******************/

const GET_ALL_SPOTS = 'spots/getSpots';
// const GET_A_SPOTS = 'spots/getSpot';
// const ADD_A_SPOT = 'spots/addSpot';
// const DELETE_A_SPOT = 'spot/removeSpot';


/***************************ACTION CREATOR*******************/

const Spots = (data) => {
    return {
        type: GET_ALL_SPOTS,
        data
    }
}




/***************************THUNK*******************/
export const getAllSpots = () => async (dispatch) => {
    // const res = await csrfFetch('api/Spots')
    const res = await fetch('api/Spots')


    if (res) {
        const data = await res.json()
        console.log('data from thunk===>', data)
        dispatch(Spots(data))
        // return res
    }
}



const initialState = {}

export const SpotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        // case GET_ALL_SPOTS:
        //     newState = Object.assign({}, state);
        //     newState = action.data
        //     return newState
        case GET_ALL_SPOTS:
            const allSpots={...state}
            action.data.Spots.forEach(spot => {
                allSpots[spot.id]=spot
            });
            console.log('allSpots====>',allSpots)
            return allSpots
        default:
            return state
    }
}
