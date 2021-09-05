import React,{useState} from 'react';
import { Button, View,Text, SafeAreaView, ScrollView, Image } from 'react-native';
import Header from '../Header/Header';
import ProductsScreen from '../ListProducts/Products';
import SlideScreen from '../Slide/slide';

const HomeScreen = () => {

  return (
    <SafeAreaView style={{flex: 1}}>
    <View>
        <View>
          <SlideScreen/>
        </View>
        <View>
          <ProductsScreen/>
        </View>
    </View>

    </SafeAreaView>
      
  );
}
export default HomeScreen;