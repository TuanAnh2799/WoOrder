import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  TouchableNativeFeedback,
  ToastAndroid,
} from 'react-native';
import {Avatar, Title, Caption, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore, { firebase } from '@react-native-firebase/firestore';
import {setUserLogout,resetStore,clearFavorite,setAdmin} from '../../Store/action';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';


function ProfileScreen({setUserLogout,resetStore,clearFavorite,setAdmin}) {

  const userid = useSelector(state => state.userState.User);
  const isAdmin = useSelector(state => state.userState.isAdmin);
  console.log('profile - userid:',userid);
  const navigation = useNavigation();
  //const {logout, user} = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([]);
  const [myOrder, setMyOrder] = useState(0);
  const [myOrder2, setMyOrder2] = useState(0);
  const [checkOrder, setCheckOrder] = useState([]);

 

  useEffect(() => {
    const subscriber = firestore()
      .collection('UserAddress')
      .doc(userid)
      .onSnapshot(documentSnapshot => {
        //console.log('User data: ', documentSnapshot.data());
        setUserInfo(documentSnapshot.data());
      });

      firestore()
      .collection('UserAddress')
      .doc(userid)
      .onSnapshot(documentSnapshot => {
        //console.log('User data: ', documentSnapshot.data());
        let temp = documentSnapshot.data();
        setAdmin(temp.isAdmin);
      });


    getData();
    getDataDaDuyet();
    adminGetData();
    
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);



  const getData = async () => {
    const subscriber = await firestore()
      .collection('Orders')
      // Filter results
      .where('orderBy', '==', `${userid}`)
      .where('orderStatus', '==', '??ang ch??? x??? l??')
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
  const getDataDaDuyet = async () => {
    const subscriber = await firestore()
      .collection('Orders')
      // Filter results
      .where('orderBy', '==', `${userid}`)
      .where('orderStatus', '==','???? duy???t')
      .get()
      .then(querySnapshot => {
        const myorder = [];

        querySnapshot.forEach(documentSnapshot => {
          myorder.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setMyOrder2(myorder);
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

  const getCount = checkOrder => {
    let x = 0;
    checkOrder.map((e, index) => {
      if (e.orderStatus == '??ang ch??? x??? l??') {
        x++;
      }
    });
    console.log('S??? h??ng ch??? duy???t: ', x);
    return x;
  };

  return (
    <SafeAreaView style={styles.container}>
    
      {userInfo == undefined ? (
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
          <View>
            <Text>M???ng k??m</Text>
          </View>
        </View>
      ) : (
        <ScrollView>
        <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image
            source={{
              uri: userInfo?.avatar,
            }}
            size={85}
          />
          <View style={{marginLeft: 20, width: '63%'}}>
            <Title style={[styles.title, {marginTop: 15, marginBottom: 5}]}>
              {userInfo?.fullname}
            </Title>
            {isAdmin == true ? (
              <Caption style={styles.caption}>@Admin</Caption>
            ) : (
              <Caption style={styles.caption}>@Ng?????i d??ng</Caption>
            )}
          </View>
          <Icon
            name="account-edit-outline"
            size={25}
            color="tomato"
            style={styles.iconEdit}
            onPress={() => navigation.navigate('EditProfile',{
              info: userInfo,
            })}
          />
        </View>
      </View>
      <View style={styles.userInfo}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" size={20} color="#777777" />
          {userInfo?.address == '' ? (
            <Text style={{fontSize: 15, marginLeft: 10}}>Vi???t Nam</Text>
          ) : (
            <Text style={{fontSize: 15, marginLeft: 10}}>
              {userInfo?.address}
            </Text>
          )}
        </View>
        <View style={styles.row}>
          <Icon name="phone" size={20} color="#777777" />
          <Text style={{fontSize: 15, marginLeft: 10}}>{userInfo?.phone}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" size={20} color="#777777" />
          <Text style={{fontSize: 15, marginLeft: 10}}>{userInfo?.email}</Text>
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
          <Caption style={{fontSize: 17}}>V?? ti???n</Caption>
        </View>

        {isAdmin == true ? (
          <TouchableNativeFeedback onPress={()=> navigation.navigate('CheckOrder')}>
            <View style={styles.infoBox}>
              {checkOrder.length > 0 ? (
                <Title style={{color: 'red'}}>{getCount(checkOrder).toString()} ch??? duy???t</Title>
              ) : (
                <Title>0</Title>
              )}
              <Caption style={{fontSize: 17}}>Qu???n l?? ????n h??ng</Caption>
            </View>
          </TouchableNativeFeedback>
        ) : (
          <TouchableNativeFeedback
            onPress={() => navigation.navigate('MyOrder')}>
            <View style={styles.infoBox}>
              {myOrder.length > 0 || myOrder2.length > 0 ? (
                <Title style={{color: 'red'}}>{myOrder.length + myOrder2.length} *</Title>
              ) : (
                <Title>0</Title>
              )}
              <Caption style={{fontSize: 17}}>????n h??ng</Caption>
            </View>
          </TouchableNativeFeedback>
        )}
      </View>

      <View style={styles.menuWrapper}>
      
      {isAdmin == true && (
          <TouchableRipple onPress={() => navigation.navigate("ProductManager")}>
            <View style={styles.menuItem}>
              <Icon name="database-plus" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Qu???n l?? s???n ph???m</Text>
            </View>
          </TouchableRipple>
        )
      }

      {isAdmin == true && (
          <TouchableRipple onPress={() => navigation.navigate("UserManager")}>
            <View style={styles.menuItem}>
              <Icon name="account-details" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Qu???n l?? ng?????i d??ng</Text>
            </View>
          </TouchableRipple>
        )
      }

      {isAdmin == true && (
          <TouchableRipple onPress={()=> navigation.navigate('Chart')}>
            <View style={styles.menuItem}>
              <Icon name="chart-bar" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Qu???n l?? th???ng k??</Text>
            </View>
          </TouchableRipple>
        )
      }

        {/*
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="cart-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>????n h??ng</Text>
          </View>
        </TouchableRipple>
         */}

        <TouchableRipple onPress={() => navigation.navigate('Favorites')}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Y??u th??ch</Text>
          </View>
        </TouchableRipple>
        {/* <TouchableRipple onPress={() => {ToastAndroid.show("Ch???c n??ng s??? c???p nh???t trong th???i gian t???i.", ToastAndroid.SHORT)}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Thanh to??n</Text>
          </View>
        </TouchableRipple> */}
        <TouchableRipple onPress={() => navigation.navigate('Help')}>
          <View style={styles.menuItem}>
            <Icon name="account-question-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>H??? tr???</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => navigation.navigate('ChangePass')}>
          <View style={styles.menuItem}>
            <Icon name="lock" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>?????i m???t kh???u</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple
          onPress={() => {
            Alert.alert('Th??ng b??o', 'B???n mu???n ????ng xu???t?', [
              {
                text: '?????ng ??',
                onPress: () => {
                  resetStore();
                  clearFavorite();
                  setUserLogout();
                },
              },
              {
                text: 'H???y',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ]);
          }}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>????ng xu???t</Text>
          </View>
        </TouchableRipple>
        <View style={{width:'100%', height: 50}}></View>
        
        {/* <TouchableRipple onPress={() => {ToastAndroid.show("Ch???c n??ng s??? c???p nh???t trong th???i gian t???i.", ToastAndroid.SHORT)}}>
          <View style={styles.menuItem}>
            <Icon name="cog" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>C??i ?????t</Text>
          </View>
        </TouchableRipple> */}
        
        
      </View></ScrollView>
        )}
      
    </SafeAreaView>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setUserLogout: () => dispatch(setUserLogout()),
    resetStore: () => dispatch(resetStore()),
    clearFavorite: () => dispatch(clearFavorite()),
    setAdmin: data => dispatch(setAdmin(data)),
  };
}

export default connect(mapDispatchToProps, {setUserLogout,resetStore,clearFavorite,setAdmin})(ProfileScreen);


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
    //borderBottomWidth: 1,
    //borderBottomColor: '#dddddd'
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});