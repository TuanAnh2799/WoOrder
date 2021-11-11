import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Products from '../../ListProducts/Products';
import ListProduct from './ListProduct';


const listTab = [
    {
      status: 'Tất cả',
      type: 0,
    },
    {
      status: 'Công nghệ',
      type: 1,
    },
    {
      status: 'Thời trang',
      type: 2,
    },
  
    {
      status: 'Đồ chơi',
      type: 3,
    },
  ];

  
const ProductManagerScreen = () => {
    return (
        <View>
            <ListProduct/>
        </View>
    )
}

export default ProductManagerScreen;

const styles = StyleSheet.create({})
