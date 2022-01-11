import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Image,
  LogBox,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import deleteIcon from '../../../../img/Delete.png';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Searchbar, RadioButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const UserManagerScreen = () => {
  const [searchFillter, setSearchFillter] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);

  const [checked, setChecked] = useState(false); //type
  //   console.log("checked: ",checked);
  //   console.log("isAdmin: ",user?.isAdmin);
  // const isAdmin = user.isAdmin;

  useEffect(async () => {
    const subscriber = await firestore()
      .collection('UserAddress')
      .onSnapshot(querySnapshot => {
        const user = [];

        querySnapshot.forEach(documentSnapshot => {
          user.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setIsLoading(false);
        setListUser(user);
      });
    LogBox.ignoreLogs([
      "Can't perform a React state update on an unmounted component.",
    ]);
    return () => subscriber();
  }, []);

  const search = text => {
    if (text !== '') {
      const fillter = listUser.filter(e =>
        e.fullname.toLowerCase().includes(text.toLowerCase()),
      );
      setSearchFillter(fillter);
    }
  };

  const deleteUser = id => {};

  const updateProducts = Yup.object().shape({
    fullname: Yup.string()
      .max(25, () => `Tên tối đa 25 ký tự.`)
      .matches(/(\w.+\s).+/, 'Vui lòng nhập họ và tên')
      .required('Bạn chưa nhập họ tên.'),
    phone: Yup.string()
      .matches(/^(0)(\d)(?=.{8,})(?=.*[0-9])/, 'Số điện thoại không hợp lệ.')
      .required('Bạn chưa nhập số điện thoại'),
    address: Yup.string()
      .max(60, () => `Tên tối đa 60 ký tự.`)
      .matches(/(\w.+\s).+/, 'Vui lòng nhập đia chỉ')
      .required('Bạn chưa nhập địa chỉ.'),

  });

  const initValues = {
    fullname: user?.fullname,
    phone: user?.phone,
    address: user?.address,
    isAdmin: user?.isAdmin,
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          paddingTop: 5,
          paddingLeft: 10,
          paddingRight: 10,
          marginBottom: 7,
        }}>
        <Searchbar
          placeholder="Nhập tên người dùng ..."
          onChangeText={text => {
            search(text);
            setSearchQuery(text);
          }}
        />
      </View>
      <FlatList
        data={searchQuery !== '' ? searchFillter : listUser}
        style={{marginTop: 2}}
        renderItem={({item, index}) => (
          <TouchableNativeFeedback>
            <View style={styles.item} key={item.key}>
              <View style={styles.wrappIMG}>
                <Image
                  source={{uri: item.avatar}}
                  style={styles.image}
                  resizeMode={'stretch'}
                />
              </View>

              <View style={{width: '60%'}}>
                <View style={styles.wrappInfo}>
                  <View style={{marginTop: 5}}>
                    <Icon name="account" size={18} />
                  </View>
                  <View
                    style={{
                      //justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      width: '100%',
                    }}>
                    <Text style={styles.name}>{item.fullname}</Text>
                  </View>
                </View>

                <View style={styles.wrappEmail}>
                  <View style={{marginTop: 6, width: '10%'}}>
                    <Icon name="email" size={17} />
                  </View>
                  <View
                    style={{
                      alignItems: 'flex-start',
                      width: '85%',
                      overflow: 'hidden',
                    }}>
                    <Text style={styles.name}>{item.email}</Text>
                  </View>
                </View>

                <View style={styles.wrapPhone}>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      width: '100%',
                      flexDirection: 'row',
                    }}>
                    <Icon name="phone" size={17} style={{marginTop: 4}} />
                    <Text style={styles.phone}>{item.phone}</Text>
                  </View>
                </View>
              </View>

              <View style={{width: '10%', justifyContent: 'center'}}>
                <Menu>
                  <MenuTrigger text="Q.lý" />
                  <MenuOptions>
                    <MenuOption
                      onSelect={() => {
                        setUser(item);
                        setModalVisible(!modalVisible);
                      }}
                      text="Sửa thông tin"
                    />
                    <MenuOption onSelect={() => alert(`Delete`)}>
                      <Text style={{color: 'red'}}>Xóa tài khoản</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
            </View>
          </TouchableNativeFeedback>
        )}
        keyExtractor={(item, index) => index}
      />

      {/**Modal edit User info */}
      <Modal
        visible={modalVisible}
        animationType={'slide'}
        transparent={true}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <TouchableNativeFeedback
          onPress={() => {
            setChecked(false);
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000AA',
              justifyContent: 'center',
            }}>
            <TouchableNativeFeedback>
              <View
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  height: '60%',
                  borderRadius: 20,
                  //borderTopLeftRadius: 20,
                }}>
                <Formik
                  validationSchema={updateProducts}
                  initialValues={initValues}
                  validateOnMount={true}
                  onSubmit={values => console.log(values)}>
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isValid,
                  }) => (
                    <View style={{flex: 1}}>

                      <View
                        style={{
                          flex: 0.7,
                          justifyContent: 'space-between',
                          alignItems: 'center', flexDirection:'row', 
                        }}>
                        <View></View>
                        <Text style={{fontSize: 17, fontWeight: '700', textAlign:'center', marginLeft: '5%'}}>Sửa thông tin</Text>
                        <View>
                          <TouchableOpacity onPress={() => {
                              setChecked(false);
                              setModalVisible(!modalVisible);
                            }}>
                            <Image source={deleteIcon} style={{width: 25, height: 25, marginRight: 10}}/>
                          </TouchableOpacity>
                        </View>
                        
                      </View>

                        {/**Input */}
                      <View style={{flex: 8.3, justifyContent:'center'}}>

                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              width: '10%',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <FontAwesome
                              name="user-o"
                              color="#05375a"
                              size={20}
                            />
                          </View>
                          <View style={{width: '85%',borderRadius: 10, backgroundColor: 'white', height: 40, borderColor: 'green', borderWidth: 0.5,}}>
                            <TextInput
                              style={{width: '100%', height: '100%', color: 'black',}}
                              placeholder="Họ tên ..."
                              autoCapitalize="none"
                              onChangeText={handleChange('fullname')}
                              onBlur={handleBlur('fullname')}
                              value={values.fullname}
                            />
                          </View>
                        </View>
                        {errors.fullname && touched.fullname && (
                          <Text style={styles.text_err}>{errors.fullname}</Text>
                         )}

                        <View style={{flexDirection:'row',marginTop: 20}}>

                          <View style={{width:'10%',justifyContent:'center', alignItems:'center'}}>
                            <FontAwesome name="check" color="#05375a" size={20} />
                          </View>

                          <View style={{width: '85%',borderRadius: 10,backgroundColor: 'white',height: 40,borderColor: 'green',borderWidth: 0.5,}}>
                            <View
                              style={{
                                width: '100%',
                                height: 35,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                              }}>
                              <RadioButton
                                value={false}
                                status={
                                  checked === false ? 'checked' : 'unchecked'
                                }
                                onPress={() => setChecked(false)}
                              />
                              <Text style={styles.labelRadioBtn}>Người dùng</Text>

                              <RadioButton
                                value={true}
                                status={
                                  checked === true ? 'checked' : 'unchecked'
                                }
                                onPress={() => setChecked(true)}
                              />
                              <Text style={styles.labelRadioBtn}>Admin</Text>
                            </View>
                          </View>
                        </View>
                        
                        <View style={{flexDirection:'row', marginTop: 20}}>
                          <View style={{width:'10%',justifyContent:'center', alignItems:'center'}}>
                              <FontAwesome name="phone" color="#05375a" size={25} />
                          </View>
                          <View style={{width: '85%', borderRadius: 10, backgroundColor:'white', height: 40, borderColor:'green', borderWidth: 0.5}}>
                            <TextInput style={{width: '100%', height: '100%', color:'black'}} placeholder='Số điện thoại ...'
                              autoCapitalize="none"
                              onChangeText={handleChange('phone')}
                              onBlur={handleBlur('phone')}
                              value={values.phone}
                              keyboardType="phone-pad"
                            />
                          </View>
                        </View>

                        {errors.phone && touched.phone && (
                          <Text style={styles.text_err}>{errors.phone}</Text>
                        )}

                        <View style={{flexDirection:'row', marginTop: 20}}>
                          <View style={{width:'10%',justifyContent:'center', alignItems:'center'}}>
                              <FontAwesome name="home" color="#05375a" size={25} />
                          </View>
                          <View style={{width: '85%', borderRadius: 10, backgroundColor:'white', height: 40, borderColor:'green', borderWidth: 0.5}}>
                            <TextInput style={{width: '100%', height: '100%', color:'black'}} placeholder='Số điện thoại ...'
                              autoCapitalize="none"
                              onChangeText={handleChange('address')}
                              onBlur={handleBlur('address')}
                              value={values.address}
                              
                            />
                          </View>
                        </View>

                        {errors.address && touched.address && (
                          <Text style={styles.text_err}>{errors.address}</Text>
                        )}
                        
                       
                      </View>
                      {/** End Input */}

                      <View style={{flex: 1, alignItems:'center'}}>
                        <View style={{width: '40%'}}>
                          <Button disabled={!isValid} title='Lưu'/>
                        </View>   
                      </View>
                    </View>
                  )}
                </Formik>
              </View>
            </TouchableNativeFeedback>
          </View>
        </TouchableNativeFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default UserManagerScreen;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 5,
    marginVertical: 7,
    marginHorizontal: 5,
    width: '96%',
    height: 100,
    borderRadius: 5,
    marginTop: 1,
    borderColor: '#009387',
    borderWidth: 1,
    marginLeft: '2%',
    flexDirection: 'row',
    shadowColor: 'black',
    elevation: 2,
  },
  name: {
    fontSize: 14,
    marginTop: 4,
    marginLeft: 10,
  },
  phone: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
  },
  wrappIMG: {
    width: '24%',
    height: '100%',
    borderRadius: 100,
    borderColor: '#009387',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 520,
  },
  wrappInfo: {
    marginLeft: 3,
    flexDirection: 'row',
  },
  wrappEmail: {
    marginLeft: 3,
    marginTop: 5,
    flexDirection: 'row',
  },
  wrapPhone: {
    marginLeft: 3,
    marginTop: 5,
  },
  textAvaiable: {
    fontSize: 13,
  },
  wrapChooseProduct: {
    height: 200,
    width: '100%',
    borderWidth: 1,
    padding: 5,
    //flex: 3,
  },
  textTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  wrapChooseItem: {
    width: 150,
    height: '100%',
    marginLeft: 5,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  imgChoose: {
    width: '96%',
    height: '80%',
  },
  imageChoose: {
    width: '100%',
    height: '100%',
  },
  nameChoose: {
    textAlign: 'center',
    fontSize: 16,
  },
  flatListChoose: {
    padding: 5,
  },

  //list product
  listProduct: {
    marginTop: 5,
  },
  cartIcon: {
    alignItems: 'flex-start',
    marginRight: 4,
  },
  wrappIcon: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginTop: 1,
  },
  styleBtnTab: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginLeft: 3,
    right: 6,
    borderWidth: 0.5,
    borderColor: 'green',
  },
  btnTabActive: {
    backgroundColor: '#009387',
  },
  textTab: {
    fontSize: 16,
    color: 'black',
  },
  textTabActive: {
    color: '#fff',
  },
  search: {
    padding: 10,
    flex: 1,
  },
  text_err: {
    color: 'red',
    fontSize: 13,
    marginLeft: '10%',
  },
  labelRadioBtn: {
    left: -20,
  },
});
