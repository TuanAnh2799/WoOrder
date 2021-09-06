import React,{useState} from 'react';
import { Button, View,Text, SafeAreaView, ScrollView, Image } from 'react-native';
import HeaderScreen from '../Header/Header';
import Header from '../Header/Header';
import ProductsScreen from '../ListProducts/Products';
import SlideScreen from '../Slide/slide';

const HomeScreen = () => {

  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView>
        <View>
          <HeaderScreen/>
        </View>
        <View>
          <SlideScreen/>
        </View>
        <View>
          <ProductsScreen/>
        </View>
        


    </ScrollView>
    

    </SafeAreaView>
      
  );
}
export default HomeScreen;