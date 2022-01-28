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
  RefreshControl,
} from 'react-native';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator, Colors} from 'react-native-paper';
import formatCash from '../../API/ConvertPrice';
//import {getListOrder,myOrder} from '../../API/getListOrder';



export default function AdminOrderScreen({navigation}) {
  const [myOrder, setMyOrder] = useState([]);
  const [myAddress, setMyAddress] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getListOrder();
    UserAddress();
  }, []);


    const getListOrder = async () => {
    const subscriber = await firestore()
      .collection('Orders')
      // Filter results
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

      //UserAddress();

    return () => subscriber();
  };
  

    const  UserAddress = async()=> {
      const subscriber = await firestore()
      .collection('UserAddress')
      .onSnapshot(querySnapshot => {
        const add = [];

        querySnapshot.forEach(documentSnapshot => {
          add.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
       
        setMyAddress(add);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
    }


  function wait(time) {
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      getListOrder();
    });
  }, [isRefreshing]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading || isRefreshing ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={Colors.blue500} />
        </View>
      ) : (
        <View>
          {myOrder.length > 0 ? (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                />
              }>
              {myOrder.map((item, index) => {
                let fullname = '';
                let phone ='';
                let diachi = '';
                myAddress.map((value,index)=>{
                  if(item.addressID == value.addressID)
                  {
                    fullname = value.fullname;
                    phone = value.phone;
                    diachi = value.address;
                  }
                })
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
                        {item.order.map((e, index) => {
                          
                          return (
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
                                  <View style={{marginTop: 10}}>
                                    <Text>
                                      Số lượng:
                                      <Text
                                        style={{
                                          fontSize: 15,
                                          fontWeight: '700',
                                        }}>
                                        {e.quantity}
                                      </Text>
                                    </Text>
                                    {e.size !== '' && (
                                      <Text>
                                        Size:
                                        <Text
                                          style={{
                                            fontSize: 15,
                                            fontWeight: '700',
                                          }}>
                                          {e.size}
                                        </Text>
                                      </Text>
                                    )}
                                    <Text>
                                      Màu:
                                      <Text
                                        style={{
                                          fontSize: 15,
                                          fontWeight: '700',
                                        }}>
                                        {e.color}
                                      </Text>
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          );
                        })}
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
                            <Text style={{fontSize: 16, marginRight: 10}}>
                              {item.dateTime
                                .toDate().toLocaleDateString('en-GB').replace( /(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3")}
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',

                              marginLeft: '1%',
                              marginTop: 5,
                            }}>
                            <View style={{width: '30%'}}>
                              <Text style={{fontSize: 17}}>Địa chỉ nhận: </Text>
                            </View>
                            
                            <View style={{width: '70%'}}>
                              <Text style={{fontSize: 16, marginRight: 10, marginLeft: 35, textAlign:'right'}}>{fullname} - {diachi} - {phone}</Text>
                            </View>
                            
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',

                              marginLeft: '1%',
                              marginTop: 5,
                            }}>
                            <Text style={{fontSize: 17}}>Tổng sản phẩm: </Text>
                            <Text style={{fontSize: 16, marginRight: 10}}>
                              {formatCash(item.total)} VNĐ
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',

                              marginLeft: '1%',
                              marginTop: 5,
                            }}>
                            <Text style={{fontSize: 17}}>
                              Trạng thái đơn hàng:
                            </Text>
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
                          <Button
                            title="Duyệt đơn hàng"
                            onPress={() => {
                              Alert.alert(
                                'Thông báo',
                                'Bạn muốn duyệt đơn hàng?',
                                [
                                  {
                                    text: 'Đồng ý',
                                    onPress: () => {
                                      firestore()
                                        .collection('Orders')
                                        .doc(item.id)
                                        .update({
                                          orderStatus: 'Đã duyệt',
                                        })
                                        .then(
                                          ToastAndroid.show(
                                            'Duyệt đơn hàng thành công.',
                                            ToastAndroid.SHORT,
                                          ),
                                          getListOrder(),
                                        );
                                    },
                                  },
                                  {
                                    text: 'Hủy',
                                    onPress: () =>
                                      console.log('Cancel Pressed'),
                                    style: 'cancel',
                                  },
                                ],
                              );
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
              <View style={{height: 55}}></View>
            </ScrollView>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
              <ImageBackground
                style={{
                  width: '100%',
                  height: '100%',
                  marginRight: 10,
                  justifyContent: 'center',
                }}
                source={{
                  uri: 'https://i.pinimg.com/474x/94/57/8b/94578b8106aae0097af26d35af55c1b2.jpg',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 170,
                    fontSize: 17,
                    fontWeight: '600',
                  }}>
                  CHƯA CÓ ĐƠN HÀNG NÀO
                </Text>
              </ImageBackground>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
