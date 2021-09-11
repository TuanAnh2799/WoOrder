import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { IconButton, Colors, Title, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';



export default function HeaderScreen() {

    const navigation = useNavigation();
    const cartItems = useSelector(state => state);
    
    return (
        <View style={styles.wrappHeader}>
            <View style={{alignContent:'center',justifyContent:'center',left:5}}>
                <Icon name="format-list-bulleted-square" size={26} color="#000" onPress={()=> Alert.alert(
                    'Thông báo',
                    'Chức năng sẽ câp nhật trong thời gian tới!'
                )} />
            </View>
            <View style={{left: '130%'}}>
                <Title style={{fontSize: 20, fontWeight: '500'}}>Trang chủ</Title>
            </View>
            <View style={{top: 8, left: 35}}>
                <Icon
                    name="magnify"
                    color={Colors.black}
                    size={26}
                    onPress={()=> navigation.navigate('Search')}
                />
            </View>
            <View style={{marginTop: 8}}>
                <View style={{flexDirection:'row'}}>
                    <Icon name="cart" size={25} color= {Colors.red400} onPress={()=> navigation.navigate('Cart')}/>
                   {
                    cartItems.length > 0 ?
                        <View style={styles.wrappCount1}>
                            <Text style={styles.text}>{cartItems.length}</Text>
                        </View> 
                       
                        : <View style={styles.wrappCount2}>
                            <Text style={styles.text}>{cartItems.length}</Text>
                         </View>
                   }

                </View>
                
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    wrappHeader: {
        flexDirection:'row',
        height: 40,
        justifyContent:'space-between',
        backgroundColor:'#fff'
    },
    wrappCount1: {
        right: 34,
        top: -8,
        backgroundColor: 'red',
        width:15,
        height:16,
        borderRadius: 5,
    },
    wrappCount2: {
        right: 34,
        top: -8,
        backgroundColor: 'rgba(95,197,123,0.8)',
        width:15,
        height:16,
        borderRadius: 5,
    },
    text: {
        fontSize: 13,
        textAlign:'center',
        top: -2,
        color: 'white',
        fontWeight: 'bold',
    }

})
