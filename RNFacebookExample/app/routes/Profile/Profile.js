import React from 'react';
import { Text, View, Image, Button } from 'react-native';

import Avatar from '../../components/Avatar';
import images from '../../config/images';
import styles from './styles';

const Profile = (props) => {
  const { user, onLogout } = props;
  let email;

  if (user) {
    email = user.emails[0].address;
  }

  return (
    <View style={styles.container}>
      <Image style={styles.header} source={images.profileHeader} />
      <View style={styles.body}>
        <Avatar email={email} />
        <Text>{email}</Text>
        <Button title="Sign Out" onPress={onLogout} />
      </View>
    </View>
  );
};

Profile.propTypes = {
  user: React.PropTypes.object.isRequired,
  onLogout: React.PropTypes.func.isRequired,
};

export default Profile;

