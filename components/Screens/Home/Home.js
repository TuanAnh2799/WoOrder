import React,{useState,useEffect} from 'react';
import { View,SafeAreaView} from 'react-native';
import { FlatList} from 'react-native-gesture-handler';
import HeaderScreen from '../Header/Header';
import ProductsScreen from '../ListProducts/Products';
import SlideScreen from '../Slide/slide';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { setFavorite,setAdmin } from '../../Store/action';
import {connect} from 'react-redux';



const HomeScreen = ({setFavorite,setAdmin}) => {

  const userid = useSelector(state => state.userState.User);
  useEffect(() => {
    

    const subscriber = firestore()
      .collection('Users')
      .doc(userid)
      .onSnapshot(documentSnapshot => {
        let x =documentSnapshot.data();
        setFavorite(x.favorites);
      });

      firestore()
      .collection('UserAddress')
      .doc(userid)
      .onSnapshot(documentSnapshot => {
        //console.log('User data: ', documentSnapshot.data());
        let temp = documentSnapshot.data();
        setAdmin(temp.isAdmin);
      });
    

    return () => subscriber();
  }, [])

  //console.log("Home nhận fav: ",User.favorites);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View >
        <HeaderScreen/>
      </View>
      <View style={{flex: 1}}>
          <FlatList 
            ListHeaderComponent={<SlideScreen/>}
            ListFooterComponent={<ProductsScreen />}
            ListFooterComponentStyle={{marginBottom: 50}}
          />
      </View>
    </SafeAreaView>
      
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setFavorite: data => dispatch(setFavorite(data)),
    setAdmin: data => dispatch(setAdmin(data)),
  };
}

export default connect(mapDispatchToProps, {setFavorite,setAdmin})(HomeScreen);


