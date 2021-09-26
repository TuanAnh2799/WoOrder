import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  TouchableNativeFeedback,
} from 'react-native';
import {Avatar, Title, Caption, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../Routes/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import {resetStore, ClearFavorite} from '../../Store/action';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

function ProfileScreen({ resetStore, ClearFavorite}) {

  const navigation = useNavigation();
  const {logout, user} = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([]);
  const [myOrder, setMyOrder] = useState(0);
  const [checkOrder, setCheckOrder] = useState([]);

  console.log(user.uid);
  /*
  useEffect(() => {
    const getData = async() => {
      const data = await firestore()
      .collection('Users')
      .doc(user.uid)
      .get();
      setUserInfo(data);
      console.log('logdata: ',data);
    } 
    getData();
  }, [])
  */

  useEffect(() => {
    const subscriber = firestore()
      .collection('UserAddress')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        //console.log('User data: ', documentSnapshot.data());
        setUserInfo(documentSnapshot.data());
      });

    getData();

    if (user.uid == '6d1OQZfciSaMqv3azVASuPtQnaV2') {
      return adminGetData();
    }
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const getData = async () => {
    const subscriber = await firestore()
      .collection('Orders')
      // Filter results
      .where('orderBy', '==', `${user.uid}`)
      .get()
      .then(querySnapshot => {
        const myorder = [];

        querySnapshot.forEach(documentSnapshot => {
          myorder.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setMyOrder(myorder);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  };

  const adminGetData = async () => {
    const subscriber = await firestore()
      .collection('Orders')
      .onSnapshot(querySnapshot => {
        const orders = [];

        querySnapshot.forEach(documentSnapshot => {
          orders.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setCheckOrder(orders);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  };
  console.log('User Inffo: ', userInfo);

  const getCount = checkOrder => {
    let x = 0;
    checkOrder.map((e, index) => {
      if (e.orderStatus == 'Đang chờ xử lý') {
        x++;
      }
    });
    console.log('Số hàng chờ duyệt: ', x);
    return x;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image
            source={{
              uri: 'https://bloganchoi.com/wp-content/uploads/2020/07/meo-cua-lisa-17.jpg',
            }}
            size={85}
          />
          <View style={{marginLeft: 20, width: '63%'}}>
            <Title style={[styles.title, {marginTop: 15, marginBottom: 5}]}>
              {userInfo.fullname}
            </Title>
            {user.uid == '6d1OQZfciSaMqv3azVASuPtQnaV2' ? (
              <Caption style={styles.caption}>@Admin</Caption>
            ) : (
              <Caption style={styles.caption}>@Người dùng</Caption>
            )}
          </View>
          <Icon
            name="account-edit-outline"
            size={25}
            color="tomato"
            style={styles.iconEdit}
            onPress={() => navigation.navigate('EditProfile')}
          />
        </View>
      </View>

      <View style={styles.userInfo}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" size={20} color="#777777" />
          {userInfo.address == '' ? (
            <Text style={{fontSize: 15, marginLeft: 10}}>Việt Nam</Text>
          ) : (
            <Text style={{fontSize: 15, marginLeft: 10}}>
              {userInfo.address}
            </Text>
          )}
        </View>
        <View style={styles.row}>
          <Icon name="phone" size={20} color="#777777" />
          <Text style={{fontSize: 15, marginLeft: 10}}>{userInfo.phone}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" size={20} color="#777777" />
          <Text style={{fontSize: 15, marginLeft: 10}}>{userInfo.email}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: '#dddddd',
              borderRightWidth: 1,
            },
          ]}>
          <Title>0 VND</Title>
          <Caption style={{fontSize: 17}}>Ví tiền</Caption>
        </View>

        {user.uid == '6d1OQZfciSaMqv3azVASuPtQnaV2' ? (
          <TouchableNativeFeedback onPress={()=> navigation.navigate('CheckOrder')}>
            <View style={styles.infoBox}>
              {checkOrder.length > 0 ? (
                <Title style={{color: 'red'}}>{getCount(checkOrder).toString()} *</Title>
              ) : (
                <Title>0</Title>
              )}
              <Caption style={{fontSize: 17}}>Đơn hàng chờ duyệt</Caption>
            </View>
          </TouchableNativeFeedback>
        ) : (
          <TouchableNativeFeedback
            onPress={() => navigation.navigate('MyOrder')}>
            <View style={styles.infoBox}>
              {myOrder.length > 1 ? (
                <Title style={{color: 'red'}}>{myOrder.length} *</Title>
              ) : (
                <Title>0</Title>
              )}
              <Caption style={{fontSize: 17}}>Đơn hàng</Caption>
            </View>
          </TouchableNativeFeedback>
        )}
      </View>

      <View style={styles.menuWrapper}>

      {/*
      {user.uid == '6d1OQZfciSaMqv3azVASuPtQnaV2' ? (
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="cart-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Kiểm tra đơn hàng</Text>
            </View>
          </TouchableRipple>
        ) : (
          <View></View>
        )}
       */}
        
        {/*
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="cart-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Đơn hàng</Text>
          </View>
        </TouchableRipple>
         */}

        <TouchableRipple onPress={() => navigation.navigate('Favorites')}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Yêu thích</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Thanh toán</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-question-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Hỗ trợ</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="cog" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Cài đặt</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            Alert.alert('Thông báo', 'Bạn muốn đăng xuất?', [
              {
                text: 'Đồng ý',
                onPress: () => {
                  logout();
                  resetStore();
                  ClearFavorite();
                },
              },
              {
                text: 'Hủy',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ]);
          }}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Đăng xuất</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    resetStore: () => dispatch(resetStore()),
    ClearFavorite: () => dispatch(ClearFavorite()),
  };
};

export default connect(mapDispatchToProps, {resetStore, ClearFavorite})(
  ProfileScreen,
);

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  userInfoSection: {
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  iconEdit: {
    justifyContent: 'center',
    fontSize: 30,
    paddingTop: '4%',
    // paddingLeft: '20%',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
