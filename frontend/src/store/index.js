import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ReviewsReducer } from './reviews';
import sessionReducer from './session';
import { SpotsReducer } from './spots';
import bookingReducer from './bookings';
import portfolioReducer from './myStuff';

const rootReducer = combineReducers({
    session: sessionReducer,
    spots:SpotsReducer,
    reviews:ReviewsReducer,
    bookings:bookingReducer,
    portfolio:portfolioReducer

});



let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}




const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
