import React from 'react';
import {StyleSheet, Text, View, Linking} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const HelpScreen = () => {
  return (
    <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
      <Text style={[styles.text, {fontWeight:'bold', textShadowColor:'black'}]}>Mọi thắc mắc vui lòng liên hệ</Text>
      <Text style={styles.text}>Số điện thoại: 0342918313</Text>
      <Text style={styles.text}>Zalo: 01236694015</Text>
      <Text style={styles.text}>Facebook: Tuấn Anh </Text>
      <Text style={styles.text}>Wechat: junying9x99</Text>
    </View>
  );
};

export default HelpScreen;
const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        marginTop: 10
    }
  });