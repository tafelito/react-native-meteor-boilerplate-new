import { AccessToken, LoginManager } from 'react-native-fbsdk';
import Meteor from 'react-native-meteor';
import { Actions } from 'react-native-router-flux';

import { appAuthToken } from '../lib/AppAuthToken';

const _ = require('underscore');

/**
 * ## Imports
 *
 * The actions supported
 */
const {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,

  LOGOUT,
  LOGIN,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} = require('../lib/constants').default;

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login or logout
 */

export function logoutState() {
  return {
    type: LOGOUT,
  };
}

export function loginState() {
  return {
    type: LOGIN,
  };
}

/**
 * ## Login actions
 */
export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginSuccess(json) {
  return {
    type: LOGIN_SUCCESS,
    payload: json,
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
}

/**
 * ## Logout actions
 */
export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}
export function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    payload: error,
  };
}

/**
 * ## SessionToken actions
 */
export function sessionTokenRequest() {
  return {
    type: SESSION_TOKEN_REQUEST,
  };
}
export function sessionTokenRequestSuccess(token) {
  return {
    type: SESSION_TOKEN_SUCCESS,
    payload: token,
  };
}
export function sessionTokenRequestFailure(error) {
  return {
    type: SESSION_TOKEN_FAILURE,
    payload: _.isUndefined(error) ? null : error,
  };
}

/**
 * ## DeleteToken actions
 */
export function deleteTokenRequest() {
  return {
    type: DELETE_TOKEN_REQUEST,
  };
}
export function deleteTokenRequestSuccess() {
  return {
    type: DELETE_TOKEN_SUCCESS,
  };
}

/**
 * ## saveSessionToken
 * @param {Object} response - to return to keep the promise chain
 * @param {Object} json - object with sessionToken
 */
export function saveSessionToken(json) {
  return appAuthToken.storeSessionToken(json);
}

/**
 * ## Delete session token
 *
 * Call the AppAuthToken deleteSessionToken
 */
export function deleteSessionToken() {
  return (dispatch) => {
    dispatch(deleteTokenRequest());
    return appAuthToken.deleteSessionToken()
      .then(() => {
        dispatch(deleteTokenRequestSuccess());
      });
  };
}

/**
 * ## Token
 * If AppAuthToken has the sessionToken, the user is logged in
 * so set the state to logout.
 * Otherwise, the user will default to the login in screen.
 */
export function getSessionToken() {
  return (dispatch) => {
    dispatch(sessionTokenRequest());
    return appAuthToken.getSessionToken()

      .then((token) => {
        if (token) {
          dispatch(sessionTokenRequestSuccess(token));
          dispatch(logoutState());
          Actions.Tabbar();
        } else {
          dispatch(sessionTokenRequestFailure());
          Actions.Login();
        }
      })

      .catch((error) => {
        dispatch(sessionTokenRequestFailure(error));
        dispatch(loginState());
        Actions.Login();
      });
  };
}

/**
 * ## Logout
 * After dispatching the logoutRequest, get the sessionToken
 *
 *
 * When the response is received and it's valid
 * change the state to register and finish the logout
 *
 * But if the call fails, like no network connection, just send the failure
 *
 * Nor Meteor, nor Facebook require to send the token, and tehy don't even return a promise,
 * so it's hard to tell if there was an error logging out
 * but for any other backend, the token might be needed to validate logout
 */
export function logout() {
  return (dispatch) => {
    dispatch(logoutRequest());
    return appAuthToken.getSessionToken()

      .then((token) => {
        Meteor.logout();
        LoginManager.logOut();
        dispatch(loginState());
        dispatch(logoutSuccess());
        dispatch(deleteSessionToken());
        Actions.Login();
      })

      .catch((error) => {
        dispatch(loginState());
        dispatch(logoutFailure(error));
      });
  };
}

/**
 * ## Login with Tokens
 *
 * After calling Facebook, login with Meteor, if response is good, save the json
 * which is the currentUser which contains the sessionToken
 * If not successful, set the state to logout
 * otherwise, dispatch a failure
 *
 */
export function loginWithTokens() {
  const Data = Meteor.getData();
  return (dispatch) => {
    AccessToken.getCurrentAccessToken()
      .then((res) => {
        if (res) {
          Meteor.call('login', { facebook: res }, (err, result) => {
            if (!err) { // save user id and token
              saveSessionToken(result.token)
                .then(() => {
                  dispatch(loginSuccess(result.token));
                  Data._tokenIdSaved = result.token;
                  Meteor._userIdSaved = result.id;
                  // navigate to Tabbar
                  Actions.Tabbar();
                  dispatch(logoutState());
                });
            } else {
              dispatch(loginFailure(err));
            }
          });
        }
      });
  };
}

/**
 * ## Login with Facebook
 *
 * Try to login with Facebook, if response is good, try to login with token
 *
 * If not successful, dispatch a failure
 */
export function loginWithFacebook() {
  return (dispatch) => {
    dispatch(loginRequest());
    LoginManager.logInWithReadPermissions(['public_profile'])
       .then(
        (result) => {
          if (result.isCancelled) {
            // dispatch login cancelled action
            console.log('Login cancelled');
            dispatch(loginFailure('Login cancelled'));
          } else {
            dispatch(loginWithTokens());
          }
        },
        (error) => {
          console.log('Login fail with error: ', error);
          dispatch(loginFailure(error));
        },
       );
  };
}
