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
import { Colors } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART } from '../../Store/reducer';


export default function ProductsScreen() {

  const dispatch = useDispatch();
  const addItemToCart = (item) => dispatch({ type: ADD_TO_CART, payload: item });

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

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

{/**
 const renderItem = ({item, index}) => (
    <View style={styles.item}>
      <View style={styles.wrappIMG}>
        <Image
          source={{uri: item.url}}
          style={styles.image}
          resizeMode={'cover'}
        />
      </View>
      <View style={styles.wrappInfo}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>
      <View style={styles.wrapAvaiable}>
        <View>
          <Text style={styles.price}>Giá: {item.price}</Text>
        </View>
        <View>
          {item.avaiable ? (
            <Text style={styles.textAvaiable}>Có sẵn</Text>
          ) : (
            <Text style={styles.textAvaiable}>Hàng đợi</Text>
          )}
          
        </View>
      </View>
    </View>
  );
*/}
 //format tiền sang VNĐ

function formatCash(str) {
  var money = ''+str;
  return money.split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + '.')) + prev
  })
}

  return (
    <SafeAreaView>
      <View style={styles.listProduct}>
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
                <View>
                  {item.avaiable ? (
                    <Text style={styles.textAvaiable}>Có sẵn</Text>
                  ) : (
                    <Text style={styles.textAvaiable}>Hàng đợi</Text>
                  )}
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
