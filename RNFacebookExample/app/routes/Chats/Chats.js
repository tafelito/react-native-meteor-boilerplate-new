import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
// import ChatsList from '../../components/chats';

class Chats extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
       {/* Use custom navBar to add custom icons,
       * as I copuldn't find a way of adding icons to th react-native-router-flux navBar
       */}
        <View style={styles.customNavBar}>
          <Text style={styles.logo}>Chats</Text>
          <View style={styles.row}>
            <Icon name="search" color="#fff" size={23} style={{ padding: 5 }} />
            <Icon name="chat" color="#fff" size={23} style={{ padding: 5 }} />
            <Icon name="more-vert" color="#fff" size={23} style={{ padding: 5 }} />
          </View>
        </View>
        {/*<ChatsList {...this.props} />*/}
        <Text style={styles.main}>
          Here will go a chat List
        </Text>
      </View>
    );
  }
}

Chats.propTypes = {
  text: React.PropTypes.string,
};

export default Chats;
