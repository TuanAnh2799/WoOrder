import React from 'react'
import { StyleSheet, Text, View ,FlatList, Image,TouchableOpacity, TouchableWithoutFeedback, Button, Alert } from 'react-native'
import Sperator from '../Sperator/Sperator';
import { REMOVE_FROM_CART } from '../../Store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { Caption, Colors, TextInput, Title, TouchableRipple } from 'react-native-paper';

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
          <View style={{flex: 1 }}>
          <View style={{flex: 9.3}}>
            <FlatList
              data={cartItems}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={() => <Sperator/>}
              renderItem={({ item }) => (
                <View style = {styles.container}>
                  <View style={styles.wrappItem}>
                    <View style={{width: '40%', height: 160}}>
                        <Image source={{uri: item.url[1]}} style={styles.imageProducts}/>  
                    </View>
                    <View style={{flexDirection:'column',width:'60%', marginLeft: 10,}}>
                      <View style={{width: '100%' , height: 40 }}>
                        <Title>{item.name}</Title>
                      </View>
                      <View style={{width: '100%' , height: 40,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View>
                          <Caption style={styles.caption}>Giá: {formatCash(item.price)} VNĐ</Caption>
                        </View>
                        <View style={{marginRight: '10%'}}> 
                          <Icon name="trash-can-outline" size={27} color= {Colors.red400} onPress={() => {
                            Alert.alert(
                              'Xác nhận',
                              'Bạn có muốn xóa?',
                              [  
                                {
                                  text: 'Đồng ý', onPress: () => {
                                      removeItemFromCart(item)
                                    }
                                },  
                                {  
                                    text: 'Hủy',  
                                    onPress: () => console.log('Cancel Pressed'),  
                                    style: 'cancel',  
                                },  
                              ]  
                            );
                          } }/>
                        </View>
                      </View>

                      <View style={{width: '60%' , height: 40,flexDirection:'row', justifyContent:'space-around', marginTop: 15,}}>
                        <TouchableOpacity>
                          <View style={{width: 30, height:30, justifyContent:'center', borderWidth: 0.5, borderColor:'#008CBA', borderRadius:50,backgroundColor:'#fff'}}>  
                              <Text style={styles.textButton}> - </Text>
                          </View>
                        </TouchableOpacity>
                        <View style={{width: 30, height: 30, borderWidth: 1, borderColor:'#a9a9a9', borderRadius: 5}}>
                          <Text style={[styles.textCount,{textAlign:'center'}]}>1</Text>
                        </View>
                        <TouchableOpacity>
                          <View  style={{width: 30, height:30, backgroundColor:'#fff', justifyContent:'center',borderWidth: 1, borderColor:'#636363', borderRadius:50,alignContent:'center'}}>
                            <Text style={styles.textButton}> + </Text>
                          </View>
                        </TouchableOpacity>
                        
                      </View>

                    </View>
                  </View>
                </View>
              )}
            />
          </View>
          
           <View style={{flex:0.7, width: '100%', height: 30, flexDirection:'row',justifyContent:'space-between',alignItems:'center', borderTopWidth: 0.5}}>
              <View style={{width: '25%'}}>
                <Text style={{fontSize: 17}}>Tổng tiền: </Text>
              </View>
              <View style={{width: '50%'}}>
                <Text style={{fontSize: 18}}>12345689 VNĐ</Text>
              </View>
              <View style={{width: '25%',right: 5}}>
                <Button title="Đặt hàng"/>
              </View>
          </View>

        </View>
       
        ) : (
          <View style={[styles.emptyCartContainer, {alignItems:'center', flex:1}]}>
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
    textButton: {
      fontSize: 22,
      fontWeight:'500',
      textAlign:'center',
    },
    textCount: {
      fontSize: 19,
      fontWeight:'500',
      textAlign:'center',
    },
    emptyCartContainer: {
      justifyContent:'center',
      alignItems:'center'
    },
    emptyCartMessage :{
      textAlign:'center',
      fontSize: 20,
    }
    
  })
