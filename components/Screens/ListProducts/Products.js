import React,{useState,useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View,Image,FlatList,TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';


    const productss = [
    {
        id: 'guong-giay',
        name: 'Gương giấy',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIoW865-QRwsmk2KmQL1Y0whX80_43qfodkkBCQDypRzNoJcURJE2aUX4_uM&usqp=CAc',
        price: 80000,
        made: 'Trung Quốc',
        avaiable: false,
        color: ['Trắng',
            'Đen',
            'Vàng']
            ,
        type: 'Tiêu dùng'
    },
    {
        id: 'the-nho-256',
        name: 'Thẻ nhớ 256 GB',
        url: 'https://tuanphong.vn/pictures/thumb/2017/10/1508154361-618-the-nho-256gb-microsdxc-sandisk-ultra-a1-2017-420x420.jpg',
        price: 100000,
        made: 'Trung Quốc',
        avaiable: false,
        color: {
        },
        type: 'Điện tử'
    },
    {
        id: 'xiao-mi-note-10-pro',
        name: 'XiaoMi Note 10',
        url: 'https://cdn.tgdd.vn/Products/Images/42/222758/xiaomi-redmi-note-10-xanh-duong-1-org.jpg',
        price: 8000000,
        made: 'Trung Quốc',
        avaiable: false,
        color: ['Đỏ, Xanh, Vàng'],
        type: 'Điện tử'
    },
    
];



export default function ProductsScreen() {

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
          console.log(products)
          setProducts(products);
          setLoading(false);
        });
    
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }, []);

      if (loading) {
        return <ActivityIndicator size={24}/>;
      }

    return (
        <SafeAreaView style={{flex: 1}}>
                <View style={styles.listProduct}> 
                <FlatList
                  data={productss}
                  renderItem={({item}) => (
                  <TouchableNativeFeedback onPress={ ()=> navigation.navigate("Details",{
                    id: item.id,
                    })}>
                    <View style={styles.item}>
                      <View style={styles.wrappIMG}>
                          <Image source={{uri: item.url}} style={styles.image} resizeMode={'stretch'} />
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
                                    {item.avaiable ?
                                        (<Text style={styles.textAvaiable}>Có sẵn</Text>):
                                        (<Text style={styles.textAvaiable}>Hàng đợi</Text>)} 
                                    </View>                 
                                </View>
                                 
                            </View>
                        </TouchableNativeFeedback> 
                        )}
                        keyExtractor={(item) => item}
                        numColumns={2}
                    />
                </View>
        </SafeAreaView>
    )
}

