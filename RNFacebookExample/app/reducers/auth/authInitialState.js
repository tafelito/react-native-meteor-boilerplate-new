const { Record } = require('immutable');
const {
  REGISTER,
} = require('../../lib/constants').default;

/**
 * ## InitialState
 * This Record contains the state of the form and the
 * fields it contains.
 */
const InitialState = Record({
  state: REGISTER,
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
});

export default InitialState;

