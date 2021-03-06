import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';

export default function FavoritesScreen({navigation}) {
  const [data, setData] = useState([]);
  const Favorites = useSelector(state => state.favourites.favoriteProduct);
  const products = useSelector(state => state.productStore.Product);
  let listFav =()=>{
    let list = [];
    for(let i = 0; i < products.length; i++)
    {
      for(let j = 0; j < Favorites.length; j++)
      {
        if(products[i].id == Favorites[j])
        {
          list.push(products[i]);
        }
      }
    }
    
    return list;
  } 

  // for(let j = 0; j < Favorites.length; j++)
  //     {
  //       console.log('tt: ',Favorites[j]);
  //     }
let datas = listFav();
console.log("List Fav sau khi lọc:",datas);
//console.log("Log info:",products[1].id);

  return (
    <SafeAreaView>
      {Favorites.length !== 0 ? (
        <FlatList
          data={datas}
          renderItem={({item, index}) => (
            <TouchableNativeFeedback
              onPress={() =>
                navigation.navigate('Details', {
                  product: item,
                })
              }>
              <View style={styles.item} key={index}>
                <View style={styles.wrappIMG}>
                  <Image
                    source={{uri: item?.url[0]}}
                    style={styles.image}
                    resizeMode={'stretch'}
                  />
                </View>
                <View style={styles.wrappInfo}>
                  <View style={styles.wrappName}>
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                  <View style={styles.wrappTitle}>
                    <Text style={styles.title}>Xem ngay -></Text>
                  </View>
                </View>
              </View>
            </TouchableNativeFeedback>
          )}
          keyExtractor={(item, index) => index}
        />
      ) : (
        
        <View style={styles.emptyFavContainer}>
          <Text style={styles.emptyFavMessage}>
            Bạn chưa yêu thích sản phẩm nào :'(
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#ffffff',
    padding: 5,
    marginVertical: 2,
    marginHorizontal: '2%',
    width: '96%',
    height: 140,
    borderRadius: 5,
    marginTop: 7,
    flexDirection: 'row',
  },
  name: {
    fontSize: 17,
    marginTop: 4,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 15,
  },
  wrappIMG: {
    width: '40%',
    height: '96%',
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  wrappInfo: {
    flexDirection: 'column',
    marginLeft: 20,
    width: '100%',
    justifyContent: 'space-around',
  },
  textTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  wrappName: {
    width: '100%',
    marginBottom: '15%',
  },
  wrappTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    right: 40,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
    textDecorationLine: 'underline',
  },

  emptyFavContainer: {
    width: '100%',
    height:'100%',
    justifyContent:'center'
  },
  emptyFavMessage: {
    textAlign: 'center',
    fontSize: 18,
  },
});
