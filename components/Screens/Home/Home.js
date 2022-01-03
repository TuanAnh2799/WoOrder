import React,{useState,useEffect} from 'react';
import { Button, View,Text, SafeAreaView,  Image, LogBox, VirtualizedList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderScreen from '../Header/Header';
import Header from '../Header/Header';
import ProductsScreen from '../ListProducts/Products';
import SlideScreen from '../Slide/slide';


const HomeScreen = () => {

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['If you want to use Reanimated 2']);
    
    
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View >
        <HeaderScreen/>
      </View>
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={{marginTop: 5}}>
            <SlideScreen/>
          </View>
          <View style={{marginTop: 5}}>
            <ProductsScreen />
          </View>
          </ScrollView>
        </View>
    </SafeAreaView>
      
  );
}
export default HomeScreen;