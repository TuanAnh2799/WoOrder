import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const IconAddProductScreen = () => {

  const navigation = useNavigation();

  return (
    <View>
      <Icon
        name="plus-circle-outline"
        color={Colors.black}
        size={26}
        onPress={() => navigation.navigate('Add')}
        style={{marginRight: 10}}
      />
    </View>
  );
};

export default IconAddProductScreen;
