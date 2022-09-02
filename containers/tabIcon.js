import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Icon
} from 'react-native';

const styles = {
    tabIconContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabIconStyle: {
      width: 24,
      height: 24,
      fontSize: 24,
    },
  }

const TabIcon = props => (
    <View style={styles.tabIconContainerStyle}>
        <Icon
        name={props.iconName}
        color={props.focused ? 'blue' : 'grey'}
        style={styles.tabIconStyle}
        />
  </View>
);

export default TabIcon;