import React, {useState, useEffect} from 'react';
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
  LogBox,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import {styles} from './styles';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {Colors, ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import formatCash from '../../API/ConvertPrice';
import deleteProducts from '../../API/deleteProduct';
import chuanhoa from '../../API/convertString';
import {Checkbox} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import {connect} from 'react-redux';

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

import deleteIcon from '../../../../img/delete.png';
import { deleteProduct } from '../../../Store/action';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const ListProduct = () => {

  const [products, setProduct] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUpdate, setIsLoadUpdate] = useState(false);
  const [statusType, setStatusType] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [id, setID] = useState('');
  const [size, setSize] = useState('');
  const [type, setType] = useState('');
  const [colors, setColors] = useState('');
  const [url, setUrl] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [info, setInfo] = useState('');

  const [sizeM, setSizeMChecked] = useState(false);
  const [sizeL, setSizeLChecked] = useState(false);
  const [sizeXL, setSizeXLChecked] = useState(false);
  const [sizeXXL, setSizeXXLChecked] = useState(false);

  const [dataList, setDataList] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const convertColor =(color)=> {
    try {
    let colors='';
    color?.map(e => colors += e+' ');
    setColors(colors);
    } catch (error) {
      console.log("Convert size ",error);
    }
    
  }


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
        setProduct(productss);
        setDataList(productss);
        
      });
    LogBox.ignoreLogs(["Can't perform a React state update on an unmounted component."]);
    return () => subscriber();
  }, []);

const Search =(text)=>{
  if(text !== ''){
      const fillter = products.filter( e =>
      e.name.toLowerCase().includes(text.toLowerCase()));
      setDataSearch(fillter);
  }  
}

const LoadingScreen =()=> (

  <View style={{backgroundColor:'#1c1c1c1c', width:windowWidth, height:windowHeight, justifyContent:'center',}}>
    <View style={{justifyContent:'center', alignSelf:'center', alignContent:'center'}}>
       <ActivityIndicator color='green' size={40} style={{marginTop: 10}} />
       <Text style={{textAlign:'center', marginTop: 10, color:'black'}}>Đang thay đổi...</Text>
       <Text style={{textAlign:'center', marginTop: 10, color:'black'}}>Xin vui lòng chờ trong giây lát</Text>
     </View>
  </View>
)

const updateProduct =async(name,price,color,info)=>{
  setIsLoadUpdate(true);
  let colorSP = await chuanhoa(color);
  let listColor = colorSP.trim().split(' ');

  let size = '';
  let listSize;

  if(type == 2)
  {
    console.log('chjay qua check size');
    if(sizeM !== false){
      size += 'M'+' ';
    }
    if(sizeL !== false){
      size += 'L'+' ';
    }
    if(sizeXL !== false){
      size += 'XL'+' ';
    }
    if(sizeXXL !== false){
      size += 'XXL';
    }
    listSize = size.trim().toUpperCase().split(' ');
  }
  else {
    listSize = [];
  }

  firestore()
    .collection('Products')
    .doc(id)
    .update({
      name: name,
      color: listColor,
      price: parseInt(price),
      size: listSize,
      info: info,
      type: parseInt(type),
      
    })
    .then(() => {
      console.log('Product update!');
      setIsLoadUpdate(false);
      ToastAndroid.show(
        'Sửa thành công!.',
        ToastAndroid.SHORT,
      );
      setModalVisible(false);
    })
    .catch(error => {
      console.log(
        'Something went wrong with added post to firestore.',
        error,
      );
      ToastAndroid.show('Sửa thất bại!.', ToastAndroid.SHORT);
    });
}

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

const updateProducts = Yup.object().shape({
  name: Yup.string()
    .max(30, () => `Tên tối đa 30 ký tự.`)
    .matches(/(\w.+\s).+/, 'Vui lòng nhập tên sản phẩm.')
    .required('Bạn chưa nhập tên sản phẩm.'),
  price: Yup.string()
    .matches(/^(\d)(?=.{4,})(?=.*[0-9])/, 'Số tiền không hợp lệ.')
    .required('Bạn chưa nhập giá sản phẩm'),
  color: Yup.string()
    .required('Bạn chưa nhập màu sắc.'),
  info: Yup.string()
    .max(300, () => `Tối đa 300 ký tự.`)
    .matches(/(\w.+\s).+/, 'Vui lòng nhập mô tả.')
    .required('Bạn chưa mô tả sản phẩm.'),
});

const initValues = {
  name: name,
  price: price.toString(),
  color: colors,
  info: info,
}

const setStatusFillter = getType => {
  if (getType === 0) {
    setDataList(products);
  } else {
    setDataList([...products.filter(e => e.type === getType)]);
  }
  setStatusType(getType);
};


  const ListProductScreen = () => (
    <View style={{marginTop: 10}}>
      <FlatList
        data={searchQuery !== '' ? dataSearch : dataList}
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
                  <MenuTrigger text="Q.lý"/>
                  <MenuOptions >
                    <MenuOption
                      onSelect={() => {
                        if (item.type == 2) {
                          item.size.map(e => {
                            if (e === 'M') {
                              setSizeMChecked(true);
                            }
                            if (e === 'L') {
                              setSizeLChecked(true);
                            }
                            if (e === 'XL') {
                              setSizeXLChecked(true);
                            }
                            if (e === 'XXL') {
                              setSizeXXLChecked(true);
                            }
                          });
                        }
                        setID(item.id);
                        setName(item.name);
                        setPrice(item.price);
                        setInfo(item.info);
                        setUrl(item.url);
                        setSize(item.size);
                        setType(item.type);
                        convertColor(item.color);
                        setModalVisible(!modalVisible);
                      }}
                      text="Sửa thông tin"
                      style={{backgroundColor:'#ffff',justifyContent:'center', alignItems:'center', height: 35, borderBottomWidth: 0.5}}
                    />
                    <MenuOption
                      style={{backgroundColor:'#ffff',justifyContent:'center', alignItems:'center', height: 35}}
                      onSelect={() => {
                        Alert.alert('Xác nhận', 'Bạn muốn xóa sản phẩm?', [
                          {
                            text: 'Đồng ý',
                            onPress: () => {
                              deleteProducts(item.id, item.url); // xóa bên firbase
                              deleteProduct(item.id); // xóa bên store
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
  );
  return (
    <View style={{width: '100%', height: '100%'}}>
      <View style={{flex:1,}}>
        <View style={{paddingTop: 5, paddingLeft: 10, paddingRight: 10}}>
            <Searchbar
              placeholder="Nhập tên sản phẩm ..."
              onChangeText={text => {
              Search(text);
              setSearchQuery(text);
            }}
            />
        </View>
        <FlatList
          ListFooterComponent={<ListProductScreen/>}
          style={{marginBottom: 50}}
        />

          <Modal
              visible={modalVisible}
              animationType={'slide'}
              transparent={true}
              onRequestClose={() => setModalVisible(!modalVisible)}>
              <TouchableNativeFeedback
                onPress={() => {
                  setSizeMChecked(false);
                  setSizeLChecked(false);
                  setSizeXLChecked(false);
                  setSizeXXLChecked(false);
                  setModalVisible(!modalVisible)}
                }>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#000000AA',
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableNativeFeedback>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        width: '100%',
                        height: '92%',
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
                      {
                        isLoadingUpdate == true ? <LoadingScreen/> : null
                      }
                        <View
                          style={{
                            flex: 0.7,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 5}}>
                            Sửa thông tin sản phẩm
                          </Text>
                        </View>

                        <View style={{flex: 8, marginTop: 10,}}>
                        
                          <View style={{height: '60%'}}>
                            <View
                              style={{
                                flexDirection: 'row',
                                marginTop: 10,
                                height: 37,
                              }}>
                              <View
                                style={{
                                  width: '30%',
                                  justifyContent: 'center',
                                }}>
                                <Text style={{marginLeft: 5}}>Tên sản phẩm:</Text>
                              </View>
                              <View style={{width: '70%', flexDirection:'row'}}>
                                <TextInput
                                  style={{
                                    width: '80%',
                                    height: 37,
                                    borderWidth: 1,
                                  }}
                                  onChangeText={handleChange('name')}
                                  onBlur={handleBlur('name')}
                                  value={values.name}
                                />
                              </View>
                            </View>
                            {errors.name && touched.name && (
                              <View style={{width: '100%', flexDirection:'row'}}>
                                <View style={{width: '30%'}}></View>
                                <View style={{width: '70%'}}>
                                  <Text style={{fontSize: 12, color:'red'}}>{errors.name}</Text> 
                                </View>
                              </View>
                            )} 

                            <View
                              style={{
                                flexDirection: 'row',
                                marginTop: 15,
                                height: 35,
                              }}>
                              <View
                                style={{
                                  width: '30%',
                                  justifyContent: 'center',
                                }}>
                                <Text style={{marginLeft: 5}}>Giá sản phẩm:</Text>
                              </View>
                              <View style={{width: '70%', flexDirection:'row'}}>
                                <TextInput
                                  style={{
                                    width: '80%',
                                    height: 35,
                                    borderWidth: 1,
                                  }}
                                  keyboardType='numeric'
                                  onChangeText={handleChange('price')}
                                  onBlur={handleBlur('price')}
                                  value={values.price}
                                />
                              </View>
                            </View>
                            {errors.price && touched.price && (
                              <View style={{width: '100%', flexDirection:'row'}}>
                                <View style={{width: '30%'}}></View>
                                <View style={{width: '70%'}}>
                                  <Text style={{fontSize: 12, color:'red'}}>{errors.price}</Text> 
                                </View>
                              </View>
                            )}

                            {type == '2' ? (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  marginTop: 15,
                                  height: 35,
                                }}>
                                <View
                                  style={{
                                    width: '30%',
                                    justifyContent: 'center',
                                  }}>
                                  <Text style={{marginLeft: 5}}>Kích cỡ</Text>
                                </View>
                                <View style={{width: '70%', height: 35, flexDirection:'row'}}>
                                  <Checkbox
                                      status={sizeM ? 'checked' : 'unchecked'}
                                      onPress={() => {
                                        setSizeMChecked(!sizeM);
                                      }}
                                      
                                    />
                                    <Text style={styles.checkbox}>M</Text>
                                    <Checkbox
                                      status={sizeL ? 'checked' : 'unchecked'}
                                      onPress={() => {
                                        setSizeLChecked(!sizeL);
                                      }}
                                    />
                                    <Text style={styles.checkbox}>L</Text>
                                    <Checkbox
                                      status={sizeXL ? 'checked' : 'unchecked'}
                                      onPress={() => {
                                        setSizeXLChecked(!sizeXL);
                                      }}
                                    />
                                    <Text style={styles.checkbox}>XL</Text>
                                    <Checkbox
                                      status={sizeXXL ? 'checked' : 'unchecked'}
                                      onPress={() => {
                                        setSizeXXLChecked(!sizeXXL);
                                      }}
                                    />
                                    <Text style={styles.checkbox}>XXL</Text>
                                </View>
                              </View>
                            ) : null}

                            <View
                              style={{
                                flexDirection: 'row',
                                marginTop: 15,
                                height: 37,
                              }}>
                              <View
                                style={{
                                  width: '30%',
                                  justifyContent: 'center',
                                }}>
                                <Text style={{marginLeft: 5}}>Màu sắc:</Text>
                              </View>
                              <View style={{width: '70%', flexDirection:'row'}}>
                                <TextInput
                                  style={{
                                    width: '80%',
                                    height: 37,
                                    borderWidth: 1,
                                  }}
                                  onChangeText={handleChange('color')}
                                  onBlur={handleBlur('color')}
                                  value={values.color}
                                />
                              </View>
                            </View>
                            {errors.color && touched.color && (
                              <View style={{width: '100%', flexDirection:'row'}}>
                                <View style={{width: '30%'}}></View>
                                <View style={{width: '70%'}}>
                                  <Text style={{fontSize: 12, color:'red'}}>{errors.color}</Text> 
                                </View>
                              </View>
                            )}

                            <View style={styles.container}>
                            <Text>Mô tả sản phẩm</Text>
                              <View
                                style={{
                                  width: '100%',
                                  borderWidth: 1,
                                  borderRadius: 10,
                                }}>
                                <Textarea
                                  containerStyle={styles.textareaContainer}
                                  style={styles.textarea}
                                  onChangeText={handleChange('info')}
                                  onBlur={handleBlur('info')}
                                  value={values.info}
                                  maxLength={300}
                                  placeholderTextColor={'#c7c7c7'}
                                  underlineColorAndroid={'transparent'}
                                />
                              </View>
                            {errors.info && touched.info && (
                              <View style={{width: '100%', flexDirection:'row'}}>
                                <View style={{width: '30%'}}></View>
                                <View style={{width: '70%'}}>
                                  <Text style={{fontSize: 12, color:'red'}}>{errors.info}</Text> 
                                </View>
                              </View>
                            )}
                            </View>


                          </View>
                          
                          {/* <View style={{height: '40%', top: -5}}>
                            <Text style={{textAlign: 'center'}}>Ảnh sản phẩm</Text>
                            <ViewPhoto/>
                          </View> */}
                        </View>
                        <View
                          style={{
                            flex: 0.6,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                          }}>
                          <View style={{width: '40%', marginTop: 0}}>
                            <Button
                              title="Hủy"
                              onPress={() => {
                                setSizeMChecked(false);
                                setSizeLChecked(false);
                                setSizeXLChecked(false);
                                setSizeXXLChecked(false);
                                setModalVisible(!modalVisible);
                              }}
                            />
                          </View>
                          <View style={{width: '40%', marginTop: 0}}>
                            <Button title="Lưu" disabled={!isValid} onPress={()=> {

                            if(type === '2' && (sizeM !== false || sizeL !== false || sizeXL !== false || sizeXXL !== false)) {
                              updateProduct(values.name, values.price, values.color, values.info)
                            }
                            else if(type === '2' && sizeM == false && sizeL == false && sizeXL == false && sizeXXL == false)
                            {
                              Alert.alert('Thông báo!', 'Bạn chưa chọn kích cỡ sản phẩm.');
                            }
                            else if(type !== '2')
                            {
                              updateProduct(values.name, values.price, values.color, values.info);
                            }
                              // if(type === '2' && (sizeM !== false || sizeL !== false || sizeXL !== false || sizeXXL !== false))
                              // {
                              //   updateProduct(values.name, values.price, values.color, values.info); 
                              //   setSizeMChecked(false);
                              //   setSizeLChecked(false);
                              //   setSizeXLChecked(false);
                              //   setSizeXXLChecked(false);                              
                              // }
                              // else if(type === '2' && (sizeM == false || sizeL == false || sizeXL == false || sizeXXL == false)){
                              //   ToastAndroid.show("Thông báo!", "Chưa điền đầy đủ thông tin.");
                              // }
                            }
                              }/>
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

      </View>
    </View>
  );
};

export default ListProduct;
