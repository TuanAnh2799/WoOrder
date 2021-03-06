import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import {AddCart, AddToFavorite, setProduct} from '../../Store/action';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, TouchableRipple, ActivityIndicator} from 'react-native-paper';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import Share from 'react-native-share';
import {useDispatch, useSelector} from 'react-redux';
import formatCash from '../API/ConvertPrice';


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

function ProductScreen({AddToFavorite, setProduct}) {
  
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusType, setStatusType] = useState(0);

  const Favorites = useSelector(state => state.favourites.favoriteProduct);
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
          setProduct(productss); // truyền data cho store
        });

        setIsLoading(false);
        setProducts(productss);
        setDataList(productss);
        
      });
    
    return () => subscriber();
  }, []);

  
  //console.log('data:', products);

  
  const setStatusFillter = getType => {
    if (getType === 0) {
      setDataList(products);
    } else {
      setDataList([...products.filter(e => e.type === getType)]);
    }
    setStatusType(getType);
  };

  return (
    <SafeAreaView>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={Colors.blue500} />
        </View>
      ) : (
        <View style={styles.listProduct}>
          <Text style={{textAlign: 'center', fontSize: 22, fontWeight: 'bold'}}>
            Sản phẩm
          </Text>
          <View
            style={{
              height: 10,
              width: '100%',
              marginTop: 15,
              borderTopWidth: 0.5,
              borderRightWidth: 0.5,
              borderLeftWidth: 0.5,
              borderLeftColor: 'red',
              borderTopColor: 'black',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}></View>
          <View
            style={{
              flexDirection: 'row',
              height: 30,
              width: '93%',
              marginTop: 1,
              marginLeft: '3%',
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

          <View style={{marginTop: 10}}>
            <FlatList
              data={dataList}
              renderItem={({item, index}) => (
                <TouchableNativeFeedback
                  onPress={() =>
                    navigation.navigate('Details', {
                      product: item,
                      name: item.name,
                    })
                  }>
                  <View style={styles.item} key={index}>
                    <View style={styles.wrappIMG}>
                      <Image
                        source={{uri: item.url[0]}}
                        style={styles.image}
                        resizeMode={'cover'}
                      />
                    </View>
                    <View style={styles.wrappInfo}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                          height: 28,
                          flexDirection:'row', flexWrap:'wrap-reverse'
                        }}>
                        <Text style={styles.name}>{item.name}</Text>
                      </View>
                    </View>
                    <View style={styles.wrapAvaiable}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                        }}>
                        <Text style={styles.price}>
                          Giá: {formatCash(item.price)} VNĐ
                        </Text>
                      </View>
                    </View>
                    
                  </View>
                </TouchableNativeFeedback>
              )}
              keyExtractor={(item, index) => index}
              numColumns={2}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
const mapDispatchToProps = dispatch => ({
  AddToFavorite: item => dispatch(AddToFavorite(item)),
  setProduct: item => dispatch(setProduct(item)),
});

export default connect(mapDispatchToProps, {AddToFavorite, setProduct})(ProductScreen);
