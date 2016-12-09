import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Meteor from 'react-native-meteor';
import { Actions, Scene, Router } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import SETTINGS from './config/settings';
import AuthInitialState from './reducers/auth/authInitialState';
import configureStore from './lib/configureStore';

import { loginWithTokens } from './actions/authActions';
import LoginContainer from './routes/Login';
import HomeContainer from './routes/Home';
import ProfileContainer from './routes/Profile';
import ChatsContainer from './routes/Chats';
import Details from './routes/Details';

function getInitialState() {
  const initState = {
    auth: new AuthInitialState(),
    // Any extra initial state key structure
  };
  return initState;
}

const store = configureStore(getInitialState());

/**
* REMOVE
*/
const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
    backgroundColor: '#1A1A1A',
    opacity: 1,
  },
  routerStyle: {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  },
});

const TabIcon = (props) => {
  // use styles
  const color = props.selected ? '#FFFFFF' : 'lightgray';
  return (
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }}>
      <Icon style={{ color }} name={props.iconName} size={30} />
      <Text style={{ color }}>{props.title}</Text>
    </View>
  );
};

class App extends Component {
  componentWillMount() {
    Meteor.connect(SETTINGS.METEOR_URL);

    // Check if user already has a valid token
    // this example will always show the lgoin screen first, and then navigate into the app
    // look for a differet solution, either using Switch or something else
    store.dispatch(loginWithTokens());

    this.scenes = Actions.create(
      <Scene key="root">
        <Scene
          key="Login"
          component={LoginContainer}
          title="Login"
          initial
          type="replace"
          hideNavBar
        />
        <Scene
          key="Tabbar"
          tabs
          hideNavBar
          default="Chats"
          tabBarStyle={styles.tabBarStyle}
        >
          <Scene key="tab_home" title="Home" icon={TabIcon} iconName={'home'} navigationBarStyle={{ backgroundColor: '#CC1710' }} titleStyle={{ color: 'white' }}>
            <Scene key="Home" component={HomeContainer} title="Home" />
            <Scene key="Details" component={Details} title="Details" hideTabBar leftButtonIconStyle={{ tintColor: 'white' }} />
          </Scene>
          <Scene key="tab_chats" title="Chats" icon={TabIcon} iconName={'commenting-o'} initial navigationBarStyle={{ backgroundColor: '#CC1710' }} titleStyle={{ color: 'white' }}>
            <Scene key="Chats" title="Chats" hideNavBar component={ChatsContainer} />
          </Scene>

          <Scene
            key="Profile"
            title="Profile"
            icon={TabIcon}
            iconName={'user'}
            hideNavBar
            component={ProfileContainer}
          />
        </Scene>
      </Scene>,
    );
  }

  render() {
    return (
      <Provider store={store}>
        <Router scenes={this.scenes} sceneStyle={styles.routerStyle} />
      </Provider>
    );
  }
}

export default App;
