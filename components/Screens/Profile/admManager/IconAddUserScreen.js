import React from 'react';
import {View} from 'react-native';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';


const IconAddUserScreen = () => {

  const navigation = useNavigation();
  return (
    <View>
      <Icon
        name="plus-circle-outline"
        color={Colors.black}
        size={26}
        onPress={() => navigation.navigate('AddUser')}
        style={{marginRight: 10}}
      />
    </View>
  );
};

export default IconAddUserScreen;
