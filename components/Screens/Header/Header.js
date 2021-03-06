import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { IconButton, Colors, Title, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
//import { useDispatch, useSelector } from 'react-redux';



export default function HeaderScreen() {

    const navigation = useNavigation();
    //const [cartItems, setCartItems] = useState(0);
    //var cartItems = useSelector(state => state.cartStore.numberCart);
    
    return (
        <View style={styles.wrappHeader}>
            <View style={{alignContent:'center',justifyContent:'center',left:5}}>
                <Icon name="format-list-bulleted-square" size={26} color="#000" onPress={()=> Alert.alert(
                    'Thông báo',
                    'Chức năng sẽ câp nhật trong thời gian tới!'
                )} />
            </View>
            <View >
                <Title style={{fontSize: 20, fontWeight: '500'}}>Trang chủ</Title>
            </View>
            <View style={{top: 8, right: 30}}>
                <Icon
                    name="magnify"
                    color={Colors.black}
                    size={26}
                    onPress={()=> navigation.navigate('Search')}
                />
            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    wrappHeader: {
        flexDirection:'row',
        height: 45,
        justifyContent:'space-between',
        backgroundColor:'#fff'
    },
    wrappCount1: {
        right: 34,
        top: -8,
        backgroundColor: 'red',
        width:24,
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
