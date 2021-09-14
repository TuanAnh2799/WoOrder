import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  TouchableNativeFeedback,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART } from '../../Store/reducer';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';


export default function ProductsScreen() {

  const dispatch = useDispatch();
  const addItemToCart = (item) => dispatch({ type: ADD_TO_CART, payload: item });

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [congnghe,setCongnghe] = useState([]);

  const navigation = useNavigation();
  
  useEffect(() => {
    const subscriber = firestore()
      .collection('Products')
      .onSnapshot(querySnapshot => {
        const products = [];

        querySnapshot.forEach(documentSnapshot => {
          products.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setProducts(products);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }


function formatCash(str) {
  var money = ''+str;
  return money.split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + '.')) + prev
  })
}

  return (
    <SafeAreaView>
      <View style={styles.listProduct}>
        <Text style={{textAlign:'center', fontSize: 22, fontWeight:'bold'}}>Sản phẩm</Text>
        <View style={{height: 10, width:'100%' , marginTop: 15, borderTopWidth: 0.5, borderRightWidth: 0.5, borderLeftWidth:0.5,borderLeftColor:'red', borderTopColor:'black',borderTopLeftRadius: 30, borderTopRightRadius: 30}}>

        </View>
          <View style={{flexDirection:'row', height: 30, width:'93%' , marginTop: 1, marginLeft:'3%'}}>
            <View style={{width: '25%',backgroundColor:'green',alignItems:'center', justifyContent:'center',borderRadius: 5,}}>
              <TouchableRipple onPress={()=>console.log("Bạn chọn Tất cả sản phẩm")}>
                <Text>Tất cả</Text>
              </TouchableRipple>
            </View>            
            <View style={{width: '25%',backgroundColor:'blue' ,alignItems:'center', justifyContent:'center' ,borderRadius: 5, marginHorizontal: 2}}>
              <TouchableRipple onPress={()=>console.log("Bạn chọn Công nghệ")}> 
                <Text>Công nghệ</Text>
              </TouchableRipple>
            </View>
            <View style={{width: '25%',backgroundColor:'orange' ,alignItems:'center', justifyContent:'center' ,borderRadius: 5 ,marginHorizontal: 2}}>
              <TouchableRipple onPress={()=>console.log("Bạn chọn Thời trang")}>
                <Text>Thời trang</Text>
              </TouchableRipple>
            </View>
            <View style={{width: '25%',backgroundColor:'red' ,alignItems:'center', justifyContent:'center' ,borderRadius: 5}}>
              <TouchableRipple onPress={()=>console.log("Bạn chọn Tieu dùng")}>
                <Text>Tiêu dùng</Text>
              </TouchableRipple>
            </View>
          </View>
          <FlatList
            data={products}
            renderItem={({item, index}) => (
              <TouchableNativeFeedback onPress={()=>navigation.navigate('Details',
              { id: item.id,
                name: item.name,
                color: item.color,
                url: item.url,
                price: item.price,
                avaiable: item.avaiable,
                info: item.info
              })}>
              <View style={styles.item} key={index}>
                <View style={styles.wrappIMG}>
                  <Image
                    source={{uri: item.url[1]}}
                    style={styles.image}
                    resizeMode={'stretch'}
                  />
                </View>
                <View style={styles.wrappInfo}>
                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                </View>
                <View style={styles.wrapAvaiable}>
                  <View>
                    <Text style={styles.price}>Giá: {formatCash(item.price)} VNĐ</Text>
                  </View>
                 
                </View>
                <Icon name="cart" size={25} color= {Colors.red400} onPress={ () => addItemToCart(item)}/>
              </View>
              </TouchableNativeFeedback>
          )}
          keyExtractor={(item, index) => index}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}
