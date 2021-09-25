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
} from 'react-native';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../Routes/AuthProvider';
import { ActivityIndicator, Colors } from 'react-native-paper';



export default function MyOrderScreen({navigation}) {
  const {user} = useContext(AuthContext);

  const [myOrder, setMyOrder] = useState([]);
  const [isLoading,setLoading] = useState(true);


  useEffect(async () => {
    const subscriber = await firestore()
      .collection('Orders')
      // Filter results
      .where('orderBy', '==', `${user.uid}`)
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
  }, []);
  
  function formatCash(str) {
    var money = ''+str;
    return money.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + '.')) + prev
    })
  }

  return (
    <SafeAreaView style={{flex: 1}}>
    {
      isLoading ? (<View style={{flex: 1, justifyContent:'center'}}><ActivityIndicator size='large' color={Colors.blue500}/></View>) : 
      (<View>
        {myOrder.length > 0 ? (
        <ScrollView>
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
                          marginTop: 5,
                        }}>
                        <Text style={{fontSize: 17}}>Tổng sản phẩm: </Text>
                        <Text style={{fontSize: 16, marginRight: 10}}>{formatCash(item.total)} VNĐ</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',

                          marginLeft: '1%',
                          marginTop: 5,
                        }}>
                        <Text style={{fontSize: 17}}>Trạng thái đơn hàng:</Text>
                        <Text style={{fontSize: 16, marginRight: 10}}>{item.orderStatus}</Text>
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
                      <Button title="Hủy đơn hàng" />
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
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
