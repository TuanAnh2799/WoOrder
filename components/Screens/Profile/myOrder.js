import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Button,
  ScrollView,
  ImageBackground,
  Alert,
  ToastAndroid,
  RefreshControl
} from 'react-native';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator, Colors } from 'react-native-paper';
import formatCash from '../API/ConvertPrice';
import { useSelector } from 'react-redux';
import convertDate from '../API/convertDate';
import getDay from '../API/getDay';


export default function MyOrderScreen({navigation}) {
  const userid = useSelector(state => state.userState.User);

  const [myOrder, setMyOrder] = useState([]);
  const [isLoading,setLoading] = useState(true);
  const [isRefreshing,setRefreshing] = useState(false);


  useEffect(() => {
    getData();
  }, []);
  
  const getData= async()=>{
    const subscriber = await firestore()
      .collection('Orders')
      // Filter results
      .where('orderBy', '==', `${userid}`)
      .where('orderStatus', '==', 'Đang chờ xử lý')
      .get()
      .then(querySnapshot => {
        const myorder = [];

        querySnapshot.forEach(documentSnapshot => {
          myorder.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
          
        });
        setLoading(false);
        setMyOrder(myorder);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }

  function wait(time){
    return new Promise(resolve => {
      setTimeout(resolve,time);
    });
  }
  
const onRefresh = React.useCallback(() => {
  setRefreshing(true)
  wait(2000).then(()=> {
    setRefreshing(false)
    getData();
  })
},[isRefreshing])

  return (
    <SafeAreaView style={{flex: 1}}>
    {
      isLoading || isRefreshing ? (<View style={{flex: 1, justifyContent:'center'}}><ActivityIndicator size='large' color={Colors.blue500}/></View>) : 
      (<View>
        {myOrder.length > 0 ? (
        <ScrollView refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}/>
        }>
          {myOrder.map((item, index) => {
            return (
              <View style={styles.wrap} key={index}>
                <View key={index} style={{marginTop: 5}}>
                  <View style={styles.wrappHeaderTitle}>
                    <View style={styles.wrappImg}>
                      <Image
                        style={styles.img}
                        source={{
                          uri: 'https://shop.thuviencokhi.com/wp-content/uploads/2018/06/icon-van-chuyen.png',
                        }}
                      />
                    </View>
                    <View style={styles.wrapTitle}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 17,
                          marginLeft: 15,
                          fontWeight: 'bold',
                        }}>
                        Đơn hàng: {item.key}
                      </Text>
                    </View>
                  </View>

                  {/*List order */}
                  <View style={{marginTop: 5}}>
                    {
                      item.order.map((e,index)=>{
                        return(
                          <View style={styles.item} key={index}>
                          <View style={styles.wrappIMG}>
                            <Image
                              source={{uri: e.url[0]}}
                              style={styles.image}
                              resizeMode={'stretch'}
                            />
                          </View>
                          <View style={styles.wrappInfo}>
                            <View style={styles.wrappName}>
                              <Text style={styles.name}>{e.name}</Text>
                              <View
                                style={{ marginTop: 10}}>
                                <Text>Số lượng: <Text style={{fontSize: 15,fontWeight: '700'}}>{e.quantity}</Text></Text>
                                {
                                  e.size !== '' && (<Text>Size: <Text style={{fontSize: 15,fontWeight: '700'}}>{e.size}</Text></Text>)
                                }
                                <Text>Màu: <Text style={{fontSize: 15,fontWeight: '700' }}>{e.color}</Text></Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        );
                      })
                    }
                  </View>

                  <View style={styles.WrapOrderDetail}>
                    <View style={{marginLeft: 7, marginTop: 20}}>
                    <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',

                          marginLeft: '1%',
                          marginTop: 2,
                        }}>
                        
                        <Text style={{fontSize: 17}}>Ngày đặt: </Text>
                        <Text style={{fontSize: 16, marginRight: 10}}>{convertDate(getDay(item.dateTime.toDate().toISOString()))}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',

                          marginLeft: '1%',
                          marginTop: 5,
                        }}>

                        <Text style={{fontSize: 17}}>Tổng sản phẩm: </Text>
                        <Text style={{fontSize: 16, marginRight: 10}}>{formatCash(item.total)} VNĐ</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',//
                          marginLeft: '1%',
                          marginTop: 5,
                        }}>
                        <Text style={{fontSize: 17}}>Trạng thái đơn hàng:</Text>
                        <View style={{width: '50%', height: 30, alignItems:'stretch'}}>
                          <Text style={{fontSize: 16, color: 'green', fontWeight:'bold', height: 40, textAlign:'right', marginRight: 10}}>{item.orderStatus}</Text>
                        </View>
                        
                      </View>
                    </View>
                  </View>

                  <View style={styles.WrapButton}>
                    <View
                      style={{
                        width: '40%',
                        alignItems: 'flex-end',
                        marginLeft: '55%',
                      }}>
                      {
                        
                        item.orderStatus == "Đang chờ xử lý" ? (
                        <Button title="Hủy đơn hàng" onPress={()=> {
                            Alert.alert('Thông báo', 'Bạn muốn hủy đơn hàng?', [
                            {
                              text: 'Đồng ý',
                              onPress: () => {
                                firestore()
                                .collection('Orders')
                                .doc(item.id)
                                .update({
                                  orderStatus: 'Đã hủy đơn hàng'
                                }).then(
                                  ToastAndroid.show('Hủy đơn hàng thành công.',ToastAndroid.SHORT),
                                  getData()
                                )
                              },
                            },
                            {
                              text: 'Hủy',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                          ]);
                        }}/>
                        ):(
                          <Button title="Mua lại lần nữa" onPress={()=>{
                            Alert.alert('Thông báo', 'Bạn muốn mua lại lần nữa?', [
                              {
                                text: 'Đồng ý',
                                onPress: () => {
                                  firestore()
                                  .collection('Orders')
                                  .doc(item.id)
                                  .update({
                                    orderStatus: 'Đang chờ xử lý'
                                  }).then(
                                    ToastAndroid.show('Đã đặt hàng lại thành công.',ToastAndroid.SHORT),
                                    getData()
                                  )
                                },
                              },
                              {
                                text: 'Hủy',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                            ]);
                          }}/>
                        )
                      }
                      
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
          <View style={{height: 55}}></View>
        </ScrollView>
      ) : (
        <View style={{justifyContent:'center', alignItems:'center',width: '100%', height: '100%'}}>
          <ImageBackground style={{width: '100%', height: '100%', marginRight: 10, justifyContent:'center'}} source={{uri: 'https://i.pinimg.com/474x/94/57/8b/94578b8106aae0097af26d35af55c1b2.jpg'}}>
            <Text style={{textAlign:'center', marginTop: 170, fontSize: 18,fontWeight:'600'}}>CHƯA CÓ ĐƠN HÀNG NÀO</Text>
          </ImageBackground>
        </View>
      )}
        
      </View>
      )

    }
      
    </SafeAreaView>
  );
}
