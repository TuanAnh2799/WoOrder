import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View ,SafeAreaView, Image,TouchableOpacity, TouchableWithoutFeedback, Button, Alert, ScrollView, ImageBackground } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../Routes/AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import {IncreaseQuantity,DecreaseQuantity,DeleteCart} from '../../Store/action';
import { connect } from 'react-redux';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { Caption, Title ,Colors} from 'react-native-paper';

 function CheckOutScreen({items,IncreaseQuantity,DecreaseQuantity,DeleteCart,route,navigation}) {

  let ListCart = [];
  let TotalCart=0;

  const Carts = useSelector(state => state.cartStore.Carts)
  //const navigation = useNavigation();

  Object.keys(items.Carts).forEach(function(item){
    TotalCart += items.Carts[item].quantity * items.Carts[item].price;
    ListCart.push(items.Carts[item]);
  });
console.log('list cart: ',ListCart);
  function TotalPrice(price,tonggia){
      return Number(price * tonggia).toLocaleString('en-US');
  }
 
  function formatCash(str) {
    var money = ''+str;
    return money.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + '.')) + prev
    })
  }

  return (
    <SafeAreaView style={styles.WrappChat}>
      {Carts.length < 1 ? 
        (
          <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}> 
            <ImageBackground style={{flex: 1,justifyContent:'center', alignItems:'center'}}>
              <Text style={styles.textWrong}>Bạn chưa có sản phẩm nào vào giỏ hàng.</Text>
              <Text style={styles.textWrong}>Vui lòng thêm sản phẩm rồi tiến hành đặt hàng.</Text>
            </ImageBackground> 
          </View>
          ):(
            <View>
              <ScrollView>
                <View>
                {
                Carts.map((item,key) => {
                  console.log(item.color);
                  return(
                    <View style = {styles.container} key={key}>
                    <View style={styles.wrappItem}>
                      <View style={{width: '40%', height: 160}}>
                          <Image source={{uri: item.url[0]}} style={styles.imageProducts}/>  
                      </View>
                      <View style={{flexDirection:'column',width:'60%', marginLeft: 10,}}>
                        <View style={{width: '100%' , height: 40 }}>
                          <Title>{item.name}</Title>
                        </View>
                        <View style={{width: '100%' , height: 40,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                          <View>
                            <Caption style={styles.caption}>Giá: {formatCash(TotalPrice(item.price,item.quantity))} VNĐ</Caption>
                          </View>
                          <View style={{marginRight: '10%'}}> 
                            <Icon name="trash-can-outline" size={27} color= {Colors.red400} onPress={() =>{
                              Alert.alert(
                                'Xác nhận',
                                'Bạn có muốn xóa?',
                                [  
                                  {
                                    text: 'Đồng ý', onPress: () => {
                                      DeleteCart(key);
                                      }
                                  },  
                                  {  
                                      text: 'Hủy',  
                                      onPress: () => console.log('Cancel Pressed'),  
                                      style: 'cancel',  
                                  },  
                                ]  
                              );

                            }}/>
                          </View>
                        </View>
                          
                          <View style={{flexDirection:'row'}}>
                            { item.size === '' ? (
                              <View>
                              <Text>Màu: {item.color} </Text>
                            </View>
                            ):(<View>
                              <Text>Màu: {item.color} ,</Text>
                            </View>)}
                            {
                              item.size !== "" ? (
                              <View>
                                <Text>Kích cỡ: {item.size}</Text>
                              </View>
                            ): (<View></View>)
                            }
                          </View>
                        <View style={{width: '60%' , height: 40,flexDirection:'row', justifyContent:'space-around', marginTop: 15,}}>
                          <TouchableOpacity onPress={()=>DecreaseQuantity(key)}>
                            <View style={{width: 40, height:30, justifyContent:'center', borderWidth: 0.5, borderColor:'#008CBA', borderRadius:50,backgroundColor:'#fff'}}>  
                                <Text style={styles.textButton}> - </Text>
                            </View>
                          </TouchableOpacity>
                          <View style={{width: 30, height: 30, borderWidth: 1, borderColor:'#a9a9a9', borderRadius: 5}}>
                            <Text style={[styles.textCount,{textAlign:'center'}]}>{item.quantity}</Text>
                          </View>
                          <TouchableOpacity onPress={()=>IncreaseQuantity(key)}>
                            <View  style={{width: 40, height:30, backgroundColor:'#fff', justifyContent:'center',borderWidth: 1, borderColor:'#636363', borderRadius:50}}>
                              <Text style={styles.textButton}> + </Text>
                            </View>
                          </TouchableOpacity>
                          
                        </View>

                      </View>
                    </View>
                  </View>
                  )
                  
                })
              }
                </View>

                <View>

                </View>
              </ScrollView>
            </View>
          )
      
      }
    </SafeAreaView>
  )
}

const mapStateToProps = state =>{
    return{
        items:state.cartStore
    }
}
export default connect(mapStateToProps,{IncreaseQuantity,DecreaseQuantity,DeleteCart})(CheckOutScreen);

const styles = StyleSheet.create({
  WrappChat: {
    flex: 1,
    backgroundColor:'#f0f0f0'
  },
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
  textWrong: {
    fontSize:16,
    color: 'red',
    fontWeight:'bold',
    textAlign:'center'
  }
  
})
