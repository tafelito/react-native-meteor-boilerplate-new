import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from './styles';

class Home extends Component {
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    Actions.Details({
      title: 'Details',
      // you can add additional props to be passed to Subview here...
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.main}>
          Home
        </Text>
        <Button
          title="Details"
          onPress={this.handlePress}
        />
      </View>
    );
  }
}

Home.propTypes = {
  onDetailsPress: React.PropTypes.func,
};

export default Home;
