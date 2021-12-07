import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  Button,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {AddCart} from '../../Store/action';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';
import { AuthContext } from '../../Routes/AuthProvider';

const deviceWitdh = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

function DetailsScreen({route, navigation, AddCart}) {

  const {user} = useContext(AuthContext);

  const id = route.params.product.id;
  const name = route.params.product.name;
  const color = route.params.product.color;
  const url = route.params.product.url;
  const price = route.params.product.price;
  const info = route.params.product.info;
  const type = route.params.product.type;
  const size = route.params.product.size;
  const items = route.params.product;

  const [modalOpen, setOpenModal] = useState(false);
  const [imgActive, setImgActive] = useState(0);

  const [selectedColor, setSelectedColor] = useState(color[0]);
  const [selectedSize, setSelectedSize] = useState(size[0]);

  //console.log('chọn màu:',selectedColor);
  //console.log('chọn size',selectedSize);
  const splitInfo = info.split('.');

  const closeModal = () => {
    setOpenModal(false);
  };

  const openModal = () => {
    setOpenModal(true);
  };
  
  const onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide !== imgActive) {
        setImgActive(slide);
      }
    }
  };

  function formatCash(str) {
    var money = '' + str;
    return money
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + '.') + prev;
      });
  }

  return (
    <SafeAreaView>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({nativeEvent}) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}>
          {url.map((e, index) => (
            <Image
              key={index}
              resizeMode="stretch"
              style={styles.wrap}
              source={{uri: e}}
            />
          ))}
        </ScrollView>
        <View style={styles.wrapDot}>
          {url.map((e, index) => (
            <Text
              key={e}
              style={
                imgActive === index ? styles.isActive : styles.isNotActive
              }>
              ●
            </Text>
          ))}
        </View>
      </View>

      {/**Thong tin sản phẩm */}
      <ScrollView>
        <View style={styles.wrapInfo}>
          <View style={styles.wrapDetail}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 17}}>Sản phẩm: </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 2}}>
                {name}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={{fontSize: 17}}>Giá:</Text>
              <Text style={{marginLeft: '13%', fontSize: 16}}>
                {formatCash(price)} VNĐ
              </Text>
            </View>
          </View>
          <View style={{marginLeft: 20, marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 17}}>Màu sắc: </Text>
              {color.map((e, index) => (
                <Text key={index} style={{marginLeft: 7, fontSize: 16}}>
                  {e}
                </Text>
              ))}
            </View>

            <View>
              {size.length > 1 ? (
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <View>
                    <Text style={{fontSize: 17}}>Size:</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    {size.map((e, index) => (
                      <Text
                        key={index}
                        style={{
                          marginHorizontal: 5,
                          fontSize: 16,
                          marginLeft: 45,
                        }}>
                        {e}
                      </Text>
                    ))}
                  </View>
                </View>
              ) : (
                <View></View>
              )}
            </View>

            {/**Chi tieest inffo */}
            <View style={{marginTop: 10}}>
              <View style={{width: '98%', flexDirection: 'row'}}>
                <View style={{width: '20%'}}>
                  <Text style={{fontSize: 17}}>Chi tiết:</Text>
                </View>
                <View style={{width: '80%'}}>
                  {splitInfo.map((e, index) => (
                    <Text key={index} style={{fontSize: 16, textAlign: 'left'}}>
                      {e}
                    </Text>
                  ))}
                </View>
              </View>
            </View>

            <View style={{marginTop: 30}}>
              <View style={{width: '60%', marginLeft: '20%'}}>
              {
                user.uid == '6d1OQZfciSaMqv3azVASuPtQnaV2'? (
                  <View></View>) : (
                    <Button
                    title="Mua ngay"
                    onPress={() => {
                      openModal();
                    }}
                  />
                  )
              }
                
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/**Modal pickup */}

      <Modal
        visible={modalOpen}
        animationType={'fade'}
        transparent={true}
        onRequestClose={closeModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000AA',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: deviceHeight * 0.5,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}>
            <View style={{flex: 2}}>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  Mua sản phẩm
                </Text>
              </View>

              <View style={{flex: 7, marginTop: 30}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginTop: 15, marginLeft: 30}}>
                    <Text>Chọn màu sắc:</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 35,
                      borderWidth: 1,
                      borderColor: 'black',
                    }}>
                    <Picker
                      style={{height: 45, width: 150, padding: 5}}
                      selectedValue={selectedColor}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedColor(itemValue)
                      }>
                      {color.map((e, index) => (
                        <Picker.Item label={e} value={e} key={index} />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View style={{marginTop: 20}}>
                  {size.length > 1 ? (
                    <View style={{flexDirection: 'row'}}>
                      <View style={{marginTop: 15, marginLeft: 30}}>
                        <Text>Chọn kích cỡ:</Text>
                      </View>
                      <View
                        style={{
                          marginLeft: 45,
                          borderWidth: 1,
                          borderColor: 'black',
                          alignItems: 'center',
                        }}>
                        <Picker
                          style={{height: 40, width: 150}}
                          selectedValue={selectedSize}
                          onValueChange={(itemValue, itemIndex) =>
                            setSelectedSize(itemValue)
                          }>
                          {size.map((e, index) => (
                            <Picker.Item label={e} value={e} key={index} />
                          ))}
                        </Picker>
                      </View>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>

                <View
                  style={{width: '90%', marginLeft: '5%', marginTop: '15%'}}>
                  <Text>
                    Lưu ý: Sau khi bấm "Đặt mua" bạn không thể thay đổi kích
                    thước và màu sắc.
                  </Text>
                </View>
              </View>
              <View style={styles.modalWrappButton}>
                <View style={{width: '40%', marginTop: 5}}>
                  <Button title="Hủy" onPress={() => closeModal()} />
                </View>
                <View style={{width: '40%', marginTop: 5}}>
                  <Button
                    title="Đặt mua"
                    onPress={() => {
                      if (type === 2) {
                        let _item = {
                          id: id,
                          //quantity:1,
                          name: name,
                          url: url,
                          price: price,
                          type: type,
                          color: selectedColor,
                          size: selectedSize,
                          //info: info,
                        };
                        AddCart(_item);
                        //console.log('Thong tin hàng mua: ',_item);
                        navigation.navigate('Đặt hàng');
                      } else {
                        let _item1 = {
                          id: id,
                          //quantity:1,
                          name: name,
                          url: url,
                          price: price,
                          type: type,
                          color: selectedColor,
                          size: '',
                          //info: info,
                        };
                        AddCart(_item1);
                        //console.log('Thong tin hàng mua loại 1 3: ',_item1);
                        navigation.navigate('Đặt hàng');
                      }
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    AddCart: item => dispatch(AddCart(item)),
  };
}

export default connect(mapDispatchToProps, {AddCart})(DetailsScreen);
