/**
 * # configureStore.js
 *
 * A Redux boilerplate setup
 *
 */


/**
 * ## Imports
 *
 * redux functions
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

/**
* ## Reducer
* The reducer contains the 4 reducers from
* device, global, auth, profile
*/
import reducer from '../reducers';

/**
 * ## logger
 */
// const logger = createLogger();

/**
 * ## creatStoreWithMiddleware
 * Like the name...
 */
/* const createStoreWithMiddleware = applyMiddleware(
  thunk,
  logger,
)(createStore);*/

/**
 * ## configureStore
 * @param {Object} the state with for keys:
 * device, global, auth, profile
 *
 */
export default function configureStore(initialState) {
  // return createStoreWithMiddleware(reducer, initialState);

  const middlewares = [thunk];

  if (process.env.NODE_ENV === 'development') {
    const createLogger = require('redux-logger');
    const logger = createLogger();
    middlewares.push(logger);
  }

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...middlewares),
     ),
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
