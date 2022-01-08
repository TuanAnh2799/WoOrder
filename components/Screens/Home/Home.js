import React,{useState,useEffect} from 'react';
import { Button, View,Text, SafeAreaView,  Image, LogBox, VirtualizedList } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import HeaderScreen from '../Header/Header';
import ProductsScreen from '../ListProducts/Products';
import SlideScreen from '../Slide/slide';


const HomeScreen = () => {

  useEffect(() => {
    LogBox.ignoreLogs(['If you want to use Reanimated 2']);
  }, [])
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View >
        <HeaderScreen/>
      </View>
      <View style={{flex: 1}}>
          <FlatList 
            ListHeaderComponent={<SlideScreen/>}
            ListFooterComponent={<ProductsScreen />}
          />
      </View>
    </SafeAreaView>
      
  );
}
export default HomeScreen;

