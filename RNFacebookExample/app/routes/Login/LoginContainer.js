import { connect } from 'react-redux';

import Login from './Login';
import { loginWithFacebook } from '../../actions/authActions';


const mapDispatchToProps = dispatch => ({
  onLogin() {
    dispatch(loginWithFacebook());
  },
});

const LoginContainer = connect(null, mapDispatchToProps)(Login);

export default LoginContainer;
