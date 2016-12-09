import React from 'react';
import { Text, View, Image } from 'react-native';
import { SocialIcon } from 'react-native-elements';

import images from '../../config/images';
import styles from './styles';

const Login = ({ onLogin }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={images.logo}
        />

        <Text style={styles.headerText}>React Native!</Text>
        {<Text style={styles.subHeaderText}>and Meteor</Text>}
      </View>

      <SocialIcon
        title="Sign In With Facebook"
        button
        type="facebook"
        onPress={onLogin}
      />
    </View>
  );
};

Login.propTypes = {
  onLogin: React.PropTypes.func.isRequired,
};

export default Login;
