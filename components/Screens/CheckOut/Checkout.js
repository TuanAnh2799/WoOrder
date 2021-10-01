import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
  Alert,
  ScrollView,
  ImageBackground,
  TextInput,
  Modal,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../Routes/AuthProvider';
import {useDispatch, useSelector} from 'react-redux';
import {
  IncreaseQuantity,
  DecreaseQuantity,
  DeleteCart,
} from '../../Store/action';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Caption, Title, Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const deviceWitdh = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

function CheckOutScreen({
  items,
  IncreaseQuantity,
  DecreaseQuantity,
  DeleteCart,
  route,
}) {
  let ListCart = [];
  let TotalCart = 0;

  const {user} = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([]);

  const [modalVisibleAddress, setModalAddress] = useState(false);
  const [modalVisiblePhone, setModalPhone] = useState(false);

  const [updateAddress, setUpdateAddress] = useState('');
  const [updatePhone, setUpdatePhone] = useState('');

  const Carts = useSelector(state => state.cartStore.Carts);

  const navigation = useNavigation();
  
  useEffect(() => {
    const subscriber = firestore()
      .collection('UserAddress')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        //console.log('User data: ', documentSnapshot.data());
        setUserInfo(documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  Object.keys(items.Carts).forEach(function (item) {
    TotalCart += items.Carts[item].quantity * items.Carts[item].price;
    ListCart.push(items.Carts[item]);
  });
  console.log('list cart: ', ListCart);

  function TotalPrice(price, tonggia) {
    return Number(price * tonggia).toLocaleString('en-US');
  }

  function formatCash(str) {
    var money = '' + str;
    return money
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + '.') + prev;
      });
  }

  function shipCost() {
    const ship = Number(TotalCart) * 0.02;
    return ship;
  }
  const closeModal = () => {
    setModalAddress(false);
  };

  const openModal = () => {
    setModalAddress(true);
  };
  const closeModalPhone = () => {
    setModalPhone(false);
  };

  const openModalPhone = () => {
    setModalPhone(true);
  };

  return (
    <SafeAreaView style={styles.WrappChat}>
      {Carts.length == 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{
              uri: 'https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png',
            }}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </View>
      ) : (
        <View>
          <ScrollView>
            <View>
              {Carts.map((item, key) => {
                //console.log(item.color);
                return (
                  <View style={styles.container} key={key}>
                    <View style={styles.wrappItem}>
                      <View style={{width: '40%', height: 160}}>
                        <Image
                          source={{uri: item.url[0]}}
                          style={styles.imageProducts}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          width: '60%',
                          marginLeft: 10,
                        }}>
                        <View style={{width: '100%', height: 40}}>
                          <Title>{item.name}</Title>
                        </View>
                        <View
                          style={{
                            width: '100%',
                            height: 40,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <View>
                            <Caption style={styles.caption}>
                              Giá:{' '}
                              {formatCash(
                                TotalPrice(item.price, item.quantity),
                              )}{' '}
                              VNĐ
                            </Caption>
                          </View>
                          <View style={{marginRight: '10%', marginTop: 15}}>
                            <Icon
                              name="trash-can-outline"
                              size={27}
                              color={Colors.red400}
                              onPress={() => {
                                Alert.alert('Xác nhận', 'Bạn có muốn xóa?', [
                                  {
                                    text: 'Đồng ý',
                                    onPress: () => {
                                      DeleteCart(key);
                                    },
                                  },
                                  {
                                    text: 'Hủy',
                                    onPress: () =>
                                      console.log('Cancel Pressed'),
                                    style: 'cancel',
                                  },
                                ]);
                              }}
                            />
                          </View>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                          {item.size === '' ? (
                            <View>
                              <Text>Màu: {item.color} </Text>
                            </View>
                          ) : (
                            <View>
                              <Text>Màu: {item.color} ,</Text>
                            </View>
                          )}
                          {item.size !== '' ? (
                            <View>
                              <Text>Kích cỡ: {item.size}</Text>
                            </View>
                          ) : (
                            <View></View>
                          )}
                        </View>
                        <View
                          style={{
                            width: '60%',
                            height: 40,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginTop: 15,
                          }}>
                          <TouchableOpacity
                            onPress={() => DecreaseQuantity(key)}>
                            <View
                              style={{
                                width: 40,
                                height: 30,
                                justifyContent: 'center',
                                borderWidth: 0.5,
                                borderColor: '#008CBA',
                                borderRadius: 50,
                                backgroundColor: '#fff',
                              }}>
                              <Text style={styles.textButton}> - </Text>
                            </View>
                          </TouchableOpacity>
                          <View
                            style={{
                              width: 30,
                              height: 30,
                              borderWidth: 1,
                              borderColor: '#a9a9a9',
                              borderRadius: 5,
                            }}>
                            <Text
                              style={[styles.textCount, {textAlign: 'center'}]}>
                              {item.quantity}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => IncreaseQuantity(key)}>
                            <View
                              style={{
                                width: 40,
                                height: 30,
                                backgroundColor: '#fff',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: '#636363',
                                borderRadius: 50,
                              }}>
                              <Text style={styles.textButton}> + </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>

            <View style={{marginTop: 10, width: '100%', borderTopWidth: 1}}>
              <View style={{width: '100%', marginTop: 20}}>
                <Text style={{marginLeft: 5, fontSize: 17}}>Địa chỉ: </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '98%',
                    alignItems: 'center',
                    marginLeft: '1%',
                    marginTop: 5,
                  }}>
                  <View style={{width: '74%', borderWidth: 1}}>
                    {userInfo.address !== '' ? (
                      <TextInput
                        editable={false}
                        value={userInfo.address}
                        multiline={true}
                        style={{color: '#585b60'}}
                      />
                    ) : (
                      <TextInput
                        editable={false}
                        value="Vui lòng cập nhật địa chỉ."
                        multiline={true}
                        style={{color: '#585b60'}}
                      />
                    )}

                    {/**Open Modal Address */}

                    <Modal
                      visible={modalVisibleAddress}
                      animationType={'fade'}
                      transparent={true}
                      onRequestClose={closeModal}>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: '#000000AA',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            backgroundColor: '#fff',
                            width: '100%',
                            height: deviceHeight * 0.4,
                            borderRadius: 25,
                          }}>
                          <View style={{flex: 1}}>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderRadius: 20,
                                backgroundColor: 'orange',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 17,
                                  fontWeight: 'bold',
                                }}>
                                Cập nhật địa chỉ
                              </Text>
                            </View>

                            <View style={{flex: 3, marginTop: 10}}>
                              <TextInput
                                style={{
                                  width: '90%',
                                  borderWidth: 1,
                                  height: 110,
                                  marginLeft: '5%',
                                  marginTop: 20,
                                }}
                                multiline={true}
                                autoFocus={true}
                                onChangeText={text => setUpdateAddress(text)}
                                value={updateAddress}
                              />
                            </View>
                            <View style={styles.modalWrappButton}>
                              <View style={{width: '40%', marginTop: 5}}>
                                <Button
                                  title="Hủy"
                                  onPress={() => closeModal()}
                                />
                              </View>
                              <View style={{width: '40%', marginTop: 5}}>
                                <Button
                                  title="Cập nhật"
                                  onPress={() => {
                                    if (updateAddress !== '') {
                                      try {
                                        firestore()
                                          .collection('UserAddress')
                                          .doc(user.uid)
                                          .update({
                                            address: updateAddress,
                                          })
                                          .then(() => {
                                            ToastAndroid.show(
                                              'Cập nhật thành công.',
                                              ToastAndroid.SHORT,
                                            );
                                            closeModal()
                                          });
                                      } catch {
                                        ToastAndroid.show(
                                          'Cập nhật thất bại.',
                                          ToastAndroid.SHORT,
                                        );
                                      }
                                    }
                                  }}
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Modal>

                    {/**Close Modal Address */}
                  </View>
                  <View style={{width: '25%', height: 40, marginLeft: '1%'}}>
                    <Button title="Thay đổi" onPress={() => openModal()} />
                  </View>
                </View>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10}}>
              <Text style={{marginLeft: 5, fontSize: 17}}>Số điện thoại: </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '98%',
                  alignItems: 'center',
                  marginLeft: '1%',
                  marginTop: 5,
                }}>
                <View style={{width: '74%', borderWidth: 1}}>
                  <TextInput
                    editable={false}
                    value={userInfo.phone}
                    multiline={false}
                    style={{color: '#585b60'}}
                  />
                </View>
                <View style={{width: '25%', height: 40, marginLeft: '1%'}}>
                  <Button title="Thay đổi" onPress={() => openModalPhone()} />
                </View>
              </View>
            </View>

            {/*
                Header modal Phone
            */}
            <Modal
              visible={modalVisiblePhone}
              animationType={'fade'}
              transparent={true}
              onRequestClose={closeModalPhone}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#000000AA',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    width: '100%',
                    height: deviceHeight * 0.35,
                    borderRadius: 25,
                  }}>
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderRadius: 20,
                        backgroundColor: 'orange',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 17,
                          fontWeight: 'bold',
                        }}>
                        Cập nhật số điện thoại
                      </Text>
                    </View>

                    <View style={{flex: 3, marginTop: 30}}>
                      <TextInput
                        style={{
                          width: '90%',
                          borderWidth: 1,
                          height: 50,
                          marginLeft: '5%',
                          marginTop: 20,
                        }}
                        multiline={true}
                        onChangeText={text => setUpdatePhone(text)}
                        value={updatePhone}
                        autoFocus={true}
                        keyboardType={'phone-pad'}
                      />
                    </View>
                    <View style={styles.modalWrappButton}>
                      <View style={{width: '40%', marginTop: 5}}>
                        <Button title="Hủy" onPress={() => closeModalPhone()} />
                      </View>
                      <View style={{width: '40%', marginTop: 5}}>
                        <Button
                          title="Cập nhật"
                          onPress={() => {
                            if (updatePhone !== '') {
                              try {
                                firestore()
                                  .collection('UserAddress')
                                  .doc(user.uid)
                                  .update({
                                    phone: updatePhone,
                                  })
                                  .then(() => {
                                    ToastAndroid.show(
                                      'Cập nhật thành công.',
                                      ToastAndroid.SHORT,
                                      closeModalPhone()
                                    );
                                  });
                              } catch {
                                ToastAndroid.show(
                                  'Cập nhật thất bại.',
                                  ToastAndroid.SHORT,
                                );
                              }
                            }
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>

            {/**Close modal Phone */}

            <View
              style={{
                marginLeft: 7,
                marginTop: 20,
                borderWidth: 0.5,
                borderRadius: 5,
                width: '96%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '96%',
                  marginLeft: '1%',
                  marginTop: 7,
                }}>
                <Text style={{fontSize: 17}}>Phí vận chuyển: </Text>
                <Text style={{fontSize: 17}}>{formatCash(shipCost())} VNĐ</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '96%',
                  marginLeft: '1%',
                  marginTop: 7,
                }}>
                <Text style={{fontSize: 17}}>Tổng tiền sản phẩm:</Text>
                <Text style={{fontSize: 17}}>
                  {formatCash(Number(TotalCart).toLocaleString('en-US'))} VNĐ
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '96%',
                  marginLeft: '1%',
                  marginTop: 7,
                }}>
                <Text style={{fontSize: 17}}>Tổng cộng: </Text>
                <Text style={{fontSize: 17}}>
                  {formatCash(shipCost() + Number(TotalCart))} VNĐ
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '96%',
                marginLeft: '2%',
                flexDirection: 'row',
                marginTop: '15%',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  width: '15%',
                  textDecorationLine: 'underline',
                }}>
                Lưu ý:{' '}
              </Text>
              <Text style={{fontSize: 16, width: '85%', lineHeight: 27}}>
                Hàng vận chuyển trong vòng 7 ngày. Nên cân nhắc khi đặt hàng.
              </Text>
            </View>

            <View style={{height: 70, justifyContent: 'center', marginTop: 20}}>
              <View
                style={{
                  width: '60%',
                  marginLeft: '20%',
                  height: 50,
                  marginTop: 10,
                }}>
                <Button
                  title="Đặt hàng"
                  onPress={() => {
                    var ID = function () {
                      return 'TA_' + Math.random().toString(36).substr(2, 7);
                    };
                    const Id = ID();
                    console.log('id hiện tại: ', Id);
                    if (userInfo.address !== '') {
                      const totalCash = shipCost() + Number(TotalCart);
                      const datetime = new Date();
                      console.log('lấy data to insert:', ...ListCart);

                      const newOrder = {
                        id: Id,

                        orderBy: user.uid,
                        addressID: user.uid,
                        total: totalCash,
                        dateTime: datetime,
                        orderStatus: 'Đang chờ xử lý',

                        order: ListCart,
                      };
                      Alert.alert('Thông báo', 'Bạn muốn đặt hàng?', [
                        {
                          text: 'Đồng ý',
                          onPress: () => {
                            try {
                              firestore()
                                .collection('Orders')
                                .doc(Id)
                                .set(newOrder)
                                .then(() => {
                                  ToastAndroid.show(
                                    'Đặt hàng thành công.',
                                    ToastAndroid.SHORT,
                                  );
                                  navigation.navigate('Tôi');
                                });
                            } catch (e) {
                              ToastAndroid.show(
                                'Đặt hàng thất bại.',
                                ToastAndroid.SHORT,
                              );
                              console.log('erro: ', e);
                            }
                          },
                        },
                        {
                          text: 'Hủy',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                      ]);
                    } else {
                      ToastAndroid.show(
                        'Bạn chưa nhập đầy đủ thông tin.',
                        ToastAndroid.SHORT,
                      );
                    }
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    items: state.cartStore,
  };
};
export default connect(mapStateToProps, {
  IncreaseQuantity,
  DecreaseQuantity,
  DeleteCart,
})(CheckOutScreen);

const styles = StyleSheet.create({
  WrappChat: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: 150,
    marginTop: 5,
  },
  wrappIMG: {},
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
    fontWeight: '500',
    textAlign: 'center',
  },
  textCount: {
    fontSize: 19,
    fontWeight: '500',
    textAlign: 'center',
  },
  emptyCartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrong: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalWrappButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
});
