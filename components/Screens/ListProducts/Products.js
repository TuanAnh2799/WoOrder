import React, { Component,useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';
import {styles} from './styles';
import {AddCart,AddToFavorite} from '../../Store/action';
import firestore from '@react-native-firebase/firestore';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, TouchableRipple } from 'react-native-paper';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import Share from 'react-native-share';


function ProductScreen({AddToFavorite}) {

  const navigation = useNavigation();

  const [products,setProducts] = useState([]);
  const [flag,setFlag] = useState(false);
  const [heart,setHeart] = useState('heart-outline');

  useEffect(() => {
    const subscriber = firestore()
      .collection('Products')
      .onSnapshot(querySnapshot => {
        const productss = [];

        querySnapshot.forEach(documentSnapshot => {
          productss.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setProducts(productss);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [])

    function formatCash(str) {
      var money = ''+str;
      return money.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + '.')) + prev
      })
    }
    const customShare = async(url)=> {
      const shareOptions = {
        message:'Tải ngay app để order nhé!',
        url: url,
        link: 'http://youtube.com/',
      }
      try {
        const shareRespone =await Share.open(shareOptions);
      } catch (error) {
        console.log(error);
      }
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
              <TouchableNativeFeedback onPress={()=> navigation.navigate('Details',
              { 
                product: item,  
              })}>
              <View style={styles.item} key={index}>
                <View style={styles.wrappIMG}>
                  <Image
                    source={{uri: item.url[0]}}
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
                <View style={styles.wrappIcon}>
                  <View style={{bottom: 2}}>
                    <Icon name={heart} size={25} style={{color:'red',marginRight: 10,}} onPress={()=> {
                      AddToFavorite(item)
                      setHeart('cards-heart')
                      Alert.alert('Thông báo',
                      'Đã thêm vào mục yêu thích.');
                      }}/>
                  </View>
                  <View>
                    <Icon name="share-variant" size={25} style={styles.cartIcon} color= {Colors.red400} onPress={()=>customShare(item.url[0])}/>
                  </View>
                  
                </View>
                
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
const mapDispatchToProps = dispatch => ({
    AddToFavorite: item => dispatch(AddToFavorite(item))
})

export default connect(mapDispatchToProps,{AddToFavorite})(ProductScreen)

