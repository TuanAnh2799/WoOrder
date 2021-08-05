import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function Category(){

    return(
        <View style={styles.container}>
           <Text>Đây là thông tin</Text> 
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 30,
    },
});