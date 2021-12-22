import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Button,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {styles} from './styles';
import {AddCart, AddToFavorite} from '../../../Store/action';
import firestore, {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, TouchableRipple, ActivityIndicator} from 'react-native-paper';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import Share from 'react-native-share';
import {useDispatch, useSelector} from 'react-redux';
import Textarea from 'react-native-textarea';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const listTab = [
  {
    status: 'Tất cả',
    type: 0,
  },
  {
    status: 'Công nghệ',
    type: 1,
  },
  {
    status: 'Thời trang',
    type: 2,
  },

  {
    status: 'Đồ chơi',
    type: 3,
  },
];

import deleteIcon from '../../../../img/Delete.png';

const deviceWitdh = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

function ListProduct({AddToFavorite}) {

  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  //const [heart, setHeart] = useState('heart-outline');
  const [isLoading, setIsLoading] = useState(true);
  const [statusType, setStatusType] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const [size, setSize] = useState([]);
  const [type, setType] = useState('');
  const [color, setColor] = useState([]);
  const [url, setUrl] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [info, setInfo] = useState('');

  const [dataList, setDataList] = useState([]);

  useEffect(async () => {
    const subscriber = await firestore()
      .collection('Products')
      .onSnapshot(querySnapshot => {
        const productss = [];

        querySnapshot.forEach(documentSnapshot => {
          productss.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setIsLoading(false);
        setProducts(productss);
        setDataList(productss);
      });

    return () => subscriber();
  }, []);

  function formatCash(str) {
    var money = '' + str;
    return money
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + '.') + prev;
      });
  }
  const deleteProduct = (id,urlIMG)=> {
    
    console.log("Xóa ID", id);

    urlIMG.map(e => {
      let ref = storage().refFromURL(e);
      storage().ref(ref.fullPath).delete().catch(err => console.log(err));
    });
    firestore()
    .collection('Products')
    .doc(id)
    .delete()
    .then(() => {
      console.log(id,'Product deleted!');
      ToastAndroid.show('Xóa thành công!.', ToastAndroid.SHORT);
    });

  }
  
  const customShare = async url => {
    const shareOptions = {
      message: 'Tải ngay app để order nhé!',
      url: url,
    };
    try {
      const shareRespone = await Share.open(shareOptions);
    } catch (error) {
      console.log(error);
    }
  };
  //console.log('info:', info);

  const setStatusFillter = getType => {
    if (getType === 0) {
      setDataList(products);
    } else {
      setDataList([...products.filter(e => e.type === getType)]);
    }
    setStatusType(getType);
  };

  const search = textSearch => {
    const fillter = User.filter(e =>
      e.name.toLowerCase().includes(textSearch.toLowerCase()),
    );
    setSearchFillter(fillter);
  };

  const Search = () => (
    <View style={{paddingTop: 5, paddingLeft: 10, paddingRight: 10}}>
      <Searchbar
        placeholder="Nhập tên sản phẩm ..."
        onChangeText={text => {
          search(text);
        }}
      />
    </View>
  );

  const headerFillter = () => {
    return (
      <View
        style={{
          height: 10,
          width: '100%',
          height: 40,
          marginTop: 2,
          borderTopWidth: 0.5,
          borderRightWidth: 0.5,
          borderLeftWidth: 0.5,
          borderLeftColor: '#009387',
          borderTopColor: '#009387',
          borderRightColor: '#009387',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginVertical: 10,
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '93%',
            height: 30,
            marginTop: 12,
            marginLeft: '3%',
            marginVertical: 2,
          }}>
          {listTab.map((e, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.styleBtnTab,
                statusType === e.type && styles.btnTabActive,
              ]}
              onPress={() => {
                console.log(e.type);
                setStatusFillter(e.type);
              }}>
              {e.type == 0 && <Text style={styles.textTab}>Tất cả</Text>}
              {e.type == 1 && <Text style={styles.textTab}>Công nghệ</Text>}
              {e.type == 2 && <Text style={styles.textTab}>Thời trang</Text>}
              {e.type == 3 && <Text style={styles.textTab}>Đồ chơi</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  const ViewPhoto = () => {
    if (url?.length === 0) {
      return (
        <View
          style={{
            width: '23%',
            height: 95,
            marginLeft: 20,
            marginTop: 10,
            borderWidth: 1,
            borderColor: '#000000AA',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            backgroundColor: '#ffff'
          }}>
          <Icon name='camera' size={28} color='black'/>
        </View>
      );
    } else if (url?.length >= 1 && url?.length <= 5) {
      return (
        <View
          style={{
            flexDirection: 'row',
            height: '90%',
            flexWrap: 'wrap',
          }}>
          {url.map((e, index) => (
            <View
              style={styles.wrappImgEDIT} key={index}>
              <Image
                source={{uri: e}}
                style={{width:'100%', height: '100%',borderRadius: 7}}
                key={index}
              />
              <Image
                style={{
                  position: 'absolute',
                  width: 20,
                  height: 25,
                  marginLeft: '78%',
                  marginTop: 5,
                }}
                source={deleteIcon}
              />
            </View>
          ))}
          <View
          style={{
            width: '25%',
            height: 95,
            marginLeft: 15,
            marginTop: 10,
            borderWidth: 1,
            borderColor: '#000000AA',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            backgroundColor: '#ffff'
          }}>
          <Icon name='camera' size={28} color='black'/>
        </View>
        </View>
      );
    } else if(url?.length == 6){
      return (
        <View
          style={{
            flexDirection: 'row',
            height: '90%',
            flexWrap: 'wrap',
          }}>
          {url.map((e, index) => (
            <View
              style={styles.wrappImgEDIT} key={index}>
              <Image
                source={{uri: e}}
                style={{width:'100%', height: '100%',borderRadius: 7}}
                key={index}
              />
              <Image
                style={{
                  position: 'absolute',
                  width: 20,
                  height: 25,
                  marginLeft: '78%',
                  marginTop: 5,
                }}
                source={deleteIcon}
              />
            </View>
          ))}
        </View>
      );
    }
  };
  return (
    <SafeAreaView>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', marginTop: '90%'}}>
          <ActivityIndicator size="large" color={Colors.blue500} />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.listProduct}>
            <Search />
            {/*modal chỉnh sửa sản phẩm */}

            <Modal
              visible={modalVisible}
              animationType={'slide'}
              transparent={true}
              onRequestClose={() => setModalVisible(!modalVisible)}>
              <TouchableNativeFeedback
                onPress={() => setModalVisible(!modalVisible)}>
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
                        height: deviceHeight * 0.95,
                        borderRadius: 20,
                        //borderTopLeftRadius: 20,
                      }}>
                      <View style={{flex: 2}}>
                        <View
                          style={{
                            flex: 0.4,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                            Sửa thông tin sản phẩm
                          </Text>
                        </View>

                        <View style={{flex: 9}}>
                          <View style={{height: '60%'}}>
                            <View
                              style={{
                                flexDirection: 'row',
                                marginTop: 10,
                                height: 35,
                              }}>
                              <View
                                style={{
                                  width: '30%',
                                  justifyContent: 'center',
                                }}>
                                <Text>Tên sản phẩm:</Text>
                              </View>
                              <View style={{width: '70%'}}>
                                <TextInput
                                  style={{
                                    width: '80%',
                                    height: 35,
                                    borderWidth: 1,
                                  }}
                                  value={name}
                                />
                              </View>
                            </View>

                            <View
                              style={{
                                flexDirection: 'row',
                                marginTop: 7,
                                height: 35,
                              }}>
                              <View
                                style={{
                                  width: '30%',
                                  justifyContent: 'center',
                                }}>
                                <Text>Giá sản phẩm:</Text>
                              </View>
                              <View style={{width: '70%'}}>
                                <TextInput
                                  style={{
                                    width: '80%',
                                    height: 35,
                                    borderWidth: 1,
                                  }}
                                  value={price.toString()}
                                />
                              </View>
                            </View>

                            {type == '2' ? (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  marginTop: 7,
                                  height: 35,
                                }}>
                                <View
                                  style={{
                                    width: '30%',
                                    justifyContent: 'center',
                                  }}>
                                  <Text>Kích cỡ</Text>
                                </View>
                                <View style={{width: '70%'}}>
                                  <TextInput
                                    style={{
                                      width: '80%',
                                      height: 35,
                                      borderWidth: 1,
                                    }}
                                    value={size.toString()}
                                  />
                                </View>
                              </View>
                            ) : null}

                            <View
                              style={{
                                flexDirection: 'row',
                                marginTop: 7,
                                height: 35,
                              }}>
                              <View
                                style={{
                                  width: '30%',
                                  justifyContent: 'center',
                                }}>
                                <Text>Màu sắc:</Text>
                              </View>
                              <View style={{width: '70%'}}>
                                <TextInput
                                  style={{
                                    width: '80%',
                                    height: 35,
                                    borderWidth: 1,
                                  }}
                                  value={color.toString()}
                                />
                              </View>
                            </View>

                            <View
                              style={
                                type == '2'
                                  ? styles.labelMota1
                                  : styles.labelMota2
                              }>
                              <Text>Mô tả</Text>
                            </View>
                            <View style={styles.container}>
                              <View
                                style={{
                                  width: '100%',
                                  borderWidth: 1,
                                  borderRadius: 10,
                                }}>
                                <Textarea
                                  containerStyle={styles.textareaContainer}
                                  style={styles.textarea}
                                  onChangeText={text => setInfo(text)}
                                  value={info}
                                  maxLength={300}
                                  placeholderTextColor={'#c7c7c7'}
                                  underlineColorAndroid={'transparent'}
                                />
                              </View>
                            </View>
                          </View>

                          <View style={{height: '40%', top: -5}}>
                            <Text style={{textAlign: 'center'}}>Ảnh sản phẩm</Text>
                            <ViewPhoto/>
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 0.6,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            //backgroundColor: 'red'
                          }}>
                          <View style={{width: '40%', marginTop: 0}}>
                            <Button
                              title="Hủy"
                              onPress={() => setModalVisible(!modalVisible)}
                            />
                          </View>
                          <View style={{width: '40%', marginTop: 0}}>
                            <Button title="Lưu" />
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </TouchableNativeFeedback>
            </Modal>

            <View style={{marginTop: 10}}>
              <FlatList
                data={dataList}
                ListHeaderComponent={headerFillter}
                renderItem={({item, index}) => (
                  <TouchableNativeFeedback>
                    <View style={styles.item} key={index}>
                      <View style={styles.wrappIMG}>
                        <Image
                          source={{uri: item.url[0]}}
                          style={styles.image}
                          resizeMode={'stretch'}
                        />
                      </View>

                      <View style={{width: '50%'}}>
                        <View style={styles.wrappInfo}>
                          <View
                            style={{
                              //justifyContent: 'flex-start',
                              alignItems: 'flex-start',
                              width: '100%',
                            }}>
                            <Text style={styles.name}>{item.name}</Text>
                          </View>
                        </View>

                        <View style={styles.wrapPrice}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'flex-start',
                              width: '100%',
                            }}>
                            <Text style={styles.price}>
                              Giá: {formatCash(item.price)} VNĐ
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View style={{width: '10%', justifyContent: 'center'}}>
                        <Menu>
                          <MenuTrigger text="Sửa" />
                          <MenuOptions>
                            <MenuOption
                              onSelect={() => {
                                //setIndex(index);
                                //setDataModal(products[index]);
                                setName(item.name);
                                setPrice(item.price);
                                setInfo(item.info);
                                setUrl(item.url);
                                setSize(item.size);
                                setType(item.type);
                                setColor(item.color);
                                setModalVisible(!modalVisible);
                              }}
                              text="Chỉnh sửa"
                            />
                            <MenuOption onSelect={() => {
                              Alert.alert('Xác nhận', 'Bạn muốn xóa sản phẩm?', [
                                {
                                  text: 'Đồng ý',
                                  onPress: () => {
                                    deleteProduct(item.id,item.url);
                                  },
                                },
                                {
                                  text: 'Hủy',
                                  onPress: () => console.log('Cancel Pressed'),
                                  style: 'cancel',
                                },
                              ]);
                            }}>
                              <Text style={{color: 'red'}}>Xóa</Text>
                            </MenuOption>
                          </MenuOptions>
                        </Menu>
                      </View>
                    </View>
                  </TouchableNativeFeedback>
                )}
                keyExtractor={(item, index) => item.id}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
const mapDispatchToProps = dispatch => ({
  AddToFavorite: item => dispatch(AddToFavorite(item)),
});

export default connect(mapDispatchToProps, {AddToFavorite})(ListProduct);
