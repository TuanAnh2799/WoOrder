import React,{useState} from 'react';
import { Button, View,Text, SafeAreaView, ScrollView, Image } from 'react-native';
import HeaderScreen from '../Header/Header';
import Header from '../Header/Header';
import ProductsScreen from '../ListProducts/Products';
import SlideScreen from '../Slide/slide';

const HomeScreen = () => {

  return (
    <SafeAreaView style={{flex: 1}}>
      <View >
        <HeaderScreen/>
      </View>
    <ScrollView>
        <View style={{marginTop: 5}}>
          <SlideScreen/>
        </View>
        <View style={{marginTop: 5}}>
          <ProductsScreen/>
        </View>
        


    </ScrollView>
    

    </SafeAreaView>
      
  );
}
export default HomeScreen;