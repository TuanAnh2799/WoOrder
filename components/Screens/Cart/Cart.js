import React from 'react'
import { StyleSheet, Text, View ,FlatList, Image,TouchableOpacity } from 'react-native'
import Sperator from '../Sperator/Sperator';
import { REMOVE_FROM_CART } from '../../Store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { Caption, Colors, TextInput, Title } from 'react-native-paper';

function CartScreen() {
    const cartItems = useSelector(state => state)
    const dispatch = useDispatch()
  
    function formatCash(str) {
      var money = ''+str;
      return money.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + '.')) + prev
      })
    }

    const removeItemFromCart = item =>
      dispatch({
        type: REMOVE_FROM_CART,
        payload: item
      })
    return (
      <View
        style={{
          flex: 1
        }}>
        {cartItems.length !== 0 ? (
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => <Sperator/>}
            renderItem={({ item }) => (
              <View style = {styles.container}>
                <View style={styles.wrappItem}>
                  <View style={{width: '40%', height: 160}}>
                      <Image source={{uri: item.url}} style={styles.imageProducts}/>  
                  </View>
                  <View style={{flexDirection:'column',width:'60%', marginLeft: 10,}}>
                    <View style={{width: '100%' , height: 40, backgroundColor:'yellow'}}>
                      <Title>{item.name}</Title>
                    </View>
                    <View style={{width: '100%' , height: 40, backgroundColor:'pink', flexDirection:'row'}}>
                      <View>
                        <Caption style={styles.caption}>Giá: {formatCash(item.price)} VNĐ</Caption>
                      </View>
                      <View>
                        <Icon name="trash-can-outline" size={27} color= {Colors.red400} onPress={() => removeItemFromCart(item)}/>
                      </View>
                    </View>
                    <View style={{width: '100%' , height: 40, backgroundColor:'brown',}}>
                      <Caption style={styles.caption}>@edit số lượng</Caption>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartMessage}>Giỏ hàng bạn đang trống:'(</Text>
          </View>
        )}
      </View>
    )
  }
  
  
  
  export default CartScreen;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      width: '100%',
      height: 150,
      marginTop: 5,
    },
    wrappIMG: {
    },
    wrappItem: {
      flexDirection: 'row',
    },
    imageProducts: {
      width: '96%',
      height: 146,
      marginLeft: '2%',
      borderRadius: 10,
      marginTop: 2,
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    
  })
