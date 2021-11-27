import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {styles} from './styles';
import {AddCart, AddToFavorite} from '../../../Store/action';
import firestore, {firebase} from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, TouchableRipple, ActivityIndicator} from 'react-native-paper';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import Share from 'react-native-share';
import {useDispatch, useSelector} from 'react-redux';
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

function ListProduct({AddToFavorite}) {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  //const [heart, setHeart] = useState('heart-outline');
  const [isLoading, setIsLoading] = useState(true);
  const [statusType, setStatusType] = useState(0);

  const Favorites = useSelector(state => state.favourites.favoriteProduct);
  //console.log('yêu thích:', Favorites.length);
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
  //console.log('data:', products);

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
    <View style={{paddingTop: 5,paddingLeft: 10, paddingRight:10}}>
      <Searchbar
        placeholder="Nhập tên sản phẩm ..."
        onChangeText={text => {
          search(text);
        }}
      />
    </View>
  );

  const headerFillter = () => {
    return(
      <View style={{height: 10,
        width: '100%',
        height: 40,
        marginTop: 2,
        borderTopWidth: 0.5,
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5,
        borderLeftColor: '#009387',
        borderTopColor: '#009387',
        borderRightColor:'#009387',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginVertical: 10,
        marginBottom: 10}}>
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
      
    )
  }

  return (
    <SafeAreaView >
      {isLoading ? (
        <View style={{flex:1,justifyContent:'center', marginTop:'90%'}}>
          <ActivityIndicator size="large" color={Colors.blue500} />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.listProduct}>
            <Search />
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
                              onSelect={() => alert(`Save`)}
                              text="Save"
                            />
                            <MenuOption onSelect={() => alert(`Delete`)}>
                              <Text style={{color: 'red'}}>Delete</Text>
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
