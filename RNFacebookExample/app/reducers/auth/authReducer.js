const InitialState = require('./authInitialState').default;

/**
 * ## Auth actions
 */
const {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,

  LOGOUT,
  LOGIN,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} = require('../../lib/constants').default;

const initialState = new InitialState();
/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {
    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
    case SESSION_TOKEN_REQUEST:
    case LOGOUT_REQUEST:
    case LOGIN_REQUEST: {
      const nextState = state
        .setIn(['isFetching'], true)
        .setIn(['error'], null);
      return nextState;
    }

    /**
     * ### Logout state
     * The logged in user logs out
     * Clear any errors
     */
    case LOGOUT:
      return state.setIn(['state'], action.type)
        .setIn(['error'], null);

    /**
     * ### Loggin in state
     * The user isn't logged in
     *
     * Clear any errors
     */
    case LOGIN:
      // return formValidation(
      return state.setIn(['state'], action.type)
        .setIn(['error'], null);
    // )

    /**
     * ### Requests end, good or bad
     * Set the fetching flag
     */
    case SESSION_TOKEN_SUCCESS:
    case SESSION_TOKEN_FAILURE:
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
      return state.setIn(['isFetching'], false);

    /**
     *
     * The fetching is done, but save the error
     * for display to the user
     */
    case LOGOUT_FAILURE:
    case LOGIN_FAILURE:
      return state.setIn(['isFetching'], false)
      .setIn(['error'], action.payload);

    case DELETE_TOKEN_REQUEST:
    case DELETE_TOKEN_SUCCESS:
        /**
         * no state change, just an ability to track action requests...
         */
      return state;


    default:
      return state;

  }
}
