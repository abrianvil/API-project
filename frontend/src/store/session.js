import { csrfFetch } from './csrf';


/***************************TYPE*******************/

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
/***************************ACTION CREATOR*******************/

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

/***************************THUNK*******************/

export const signup = (user) => async (dispatch) => {
    const { username, email, firstName, lastName, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        firstName,
        lastName,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data));
    return response;
  };

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data));
    // console.log('in login thunk===>', data)
    return response;
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};


export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };


/***************************REDUCER*******************/

const initialState = null ;

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState= null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
