import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';


const Details = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text>
        {title}
      </Text>
    </View>
  );
};

Details.propTypes = { title: React.PropTypes.string };
Details.defaultProps = { title: 'Stateless' };

export default Details;
