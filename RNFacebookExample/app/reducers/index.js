/**
 * # reducers
 *
 * This class combines all the reducers into one
 *
 */

import { combineReducers } from 'redux';

/**
 * ## Imports
 *
 * other reducers
 */
import auth from './auth/authReducer';


/**
 * ## CombineReducers
 *
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
