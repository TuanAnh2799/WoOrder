import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Button,
} from 'react-native';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore';

export default function MyOrderScreen({navigation}) {
  {
    /*
        {
      id: 'the-nho-256',
      name: 'Thẻ nhớ 256 GB',
      url: 'https://tuanphong.vn/pictures/thumb/2017/10/1508154361-618-the-nho-256gb-microsdxc-sandisk-ultra-a1-2017-420x420.jpg',
      price: 100000,
      made: 'Trung Quốc',
      avaiable: false,
      color: {},
      type: 'Điện tử',
    },
    {
      id: 'xiao-mi-note-10-pro',
      name: 'XiaoMi Note 10',
      url: 'https://cdn.tgdd.vn/Products/Images/42/222758/xiaomi-redmi-note-10-xanh-duong-1-org.jpg',
      price: 8000000,
      made: 'Trung Quốc',
      avaiable: false,
      color: ['Đỏ, Xanh, Vàng'],
      type: 'Điện tử',
    },
        */
  }
  const product = [
    {
      id: 'guong-giay',
      name: 'Gương giấy',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIoW865-QRwsmk2KmQL1Y0whX80_43qfodkkBCQDypRzNoJcURJE2aUX4_uM&usqp=CAc',
      price: 80000,
      made: 'Trung Quốc',
      avaiable: false,
      color: ['Trắng', 'Đen', 'Vàng'],
      type: 'Tiêu dùng',
    },
    {
        id: 'xiao-mi-note-10-pro',
        name: 'XiaoMi Note 10',
        url: 'https://cdn.tgdd.vn/Products/Images/42/222758/xiaomi-redmi-note-10-xanh-duong-1-org.jpg',
        price: 8000000,
        made: 'Trung Quốc',
        avaiable: false,
        color: ['Đỏ, Xanh, Vàng'],
        type: 'Điện tử',
      },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.wrap}>
        <View style={styles.wrappHeaderTitle}>
            <View style={styles.wrappImg}>
                <Image
                style={styles.img}
                source={{
                    uri: 'https://shop.thuviencokhi.com/wp-content/uploads/2018/06/icon-van-chuyen.png',
                }}
                />
            </View>
            <View style={styles.wrapTitle}>
                <Text style={{textAlign: 'center', fontSize: 17}}>Đơn hàng: abcxyz3955</Text>
            </View>
        </View>

        {/*List order */}
        <View style={{marginTop: 5}}>
          <FlatList
            data={product}
            renderItem={({item, index}) => (
              <View style={styles.item} key={index}>
                <View style={styles.wrappIMG}>
                  <Image
                    source={{uri: item.url}}
                    style={styles.image}
                    resizeMode={'stretch'}
                  />
                </View>
                <View style={styles.wrappInfo}>
                  <View style={styles.wrappName}>
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>

        <View style={styles.WrapOrderDetail}>
          <View style={{marginLeft: 7, marginTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                marginLeft: '1%',
                marginTop: 5,
              }}>
              <Text style={{fontSize: 17}}>Tổng sản phẩm: </Text>
              <Text style={{fontSize: 17}}>69696969 VNĐ</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                marginLeft: '1%',
                marginTop: 5,
              }}>
              <Text style={{fontSize: 17}}>Trạng thái đơn hàng:</Text>
              <Text style={{fontSize: 17}}>Chờ xác nhận</Text>
            </View>
          </View>
        </View>

        <View style={styles.WrapButton}>
          <View
            style={{width: '40%', alignItems: 'flex-end', marginLeft: '55%'}}>
            <Button title="Hủy đơn hàng" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
