import React, { useState,useEffect } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View,TouchableNativeFeedback,Image, LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { Searchbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
  
const UserManagerScreen = () => {
    const [searchFillter, setSearchFillter] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading,setIsLoading] = useState(true);

    useEffect(async () => {
      const subscriber = await firestore()
        .collection('UserAddress')
        .onSnapshot(querySnapshot => {
          const user = [];
  
          querySnapshot.forEach(documentSnapshot => {
            user.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
  
          setIsLoading(false);
          setListUser(user);
        });
      LogBox.ignoreLogs(["Can't perform a React state update on an unmounted component."]);
      return () => subscriber();
    }, []);

  const search =(text)=>{
    if(text !== ''){
        const fillter = listUser.filter( e =>
        e.fullname.toLowerCase().includes(text.toLowerCase()));
        setSearchFillter(fillter);
    }  
  }

  const deleteUser =(id)=> {
    
  }

    return (
        <SafeAreaView style={{flex:  1}}>
           <View style={{paddingTop: 5, paddingLeft: 10, paddingRight: 10, marginBottom: 7,}}>
            <Searchbar
              placeholder="Nhập tên người dùng ..."
              onChangeText={text => {
                search(text);
                setSearchQuery(text);
                }}
            />
          </View>
          <ScrollView>
            <FlatList
              data={searchQuery !== '' ? searchFillter : listUser}
              style={{marginTop: 2}}
              //ListHeaderComponent={Search}
              renderItem={({item, index}) => (
                <TouchableNativeFeedback>
                  <View style={styles.item} key={item.key}>
                    <View style={styles.wrappIMG}>
                        <Image
                            source={{uri: item.avatar}}
                            style={styles.image}
                            resizeMode={'stretch'}
                        />
                    </View>

                    <View style={{width: '60%'}}>
                      <View style={styles.wrappInfo}>
                        <View style={{marginTop: 5}}>
                            <Icon name="account" size={18} />
                        </View>
                        <View
                          style={{
                            //justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            width: '100%',
                          }}>
                          
                          <Text style={styles.name}>{item.fullname}</Text>
                        </View>
                      </View>

                      <View style={styles.wrappEmail}>
                        <View style={{marginTop: 6,width:'10%'}}>
                            <Icon name="email" size={17} />
                        </View>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            width: '85%',
                            overflow:'hidden',
                          }}>
                          
                          <Text style={styles.name}>{item.email}</Text> 
                        </View>
                      </View>

                      <View style={styles.wrapPhone}>
                        <View
                          style={{
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            width: '100%',
                            flexDirection:'row'
                          }}>
                          <Icon name="phone" size={17} style={{marginTop: 4}}/>
                          <Text style={styles.phone}>
                            {item.phone}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={{width: '10%', justifyContent: 'center'}}>
                      <Menu>
                        <MenuTrigger text="Q.lý" />
                        <MenuOptions>
                          <MenuOption
                            onSelect={() => alert(`Save`)}
                            text="Sửa thông tin"
                          />
                          <MenuOption onSelect={() => alert(`Delete`)}>
                            <Text style={{color: 'red'}}>Xóa tài khoản</Text>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
                    </View>
                  </View>
                </TouchableNativeFeedback>
              )}
              keyExtractor={(item, index) => index}
            />
            </ScrollView>
        </SafeAreaView>
    )
}

export default UserManagerScreen;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 5,
        marginVertical: 7,
        marginHorizontal: 5,
        width: '96%',
        height: 100,
        borderRadius: 5,
        marginTop: 1,
        borderColor:'#009387',
        borderWidth: 1,
        marginLeft: '2%',
        flexDirection:'row',
        shadowColor:'black',
        elevation: 2,
      },
      name: {
        fontSize: 14,
        marginTop: 4,
        marginLeft: 10
      },
      phone: {
        fontSize: 14,
        marginLeft: 10,
        marginTop: 5,
      },
      wrappIMG: {
        width: '24%',
        height: '100%',
        borderRadius: 100,
        borderColor: '#009387',
        borderWidth: 1,
        
      },
      image: {
        width: '100%',
        height: '100%',
        borderRadius: 520,
      },
      wrappInfo: {
        marginLeft: 3,
        flexDirection:'row'
      },
      wrappEmail: {
        marginLeft: 3,
        marginTop: 5,
        flexDirection:'row',
        
      },
      wrapPhone:{
        marginLeft: 3,
        marginTop: 5,
      },
      textAvaiable: {
        fontSize: 13,
      },
      wrapChooseProduct: {
        height: 200,
        width: '100%',
        borderWidth: 1,
        padding: 5,
        //flex: 3,
      },
      textTitle: {
        fontSize: 20,
        textAlign: 'center',
      },
      wrapChooseItem: {
        width: 150,
        height: '100%',
        marginLeft: 5,
        backgroundColor: '#ffffff',
        borderWidth: 0.5,
        borderRadius: 5,
      },
      imgChoose: {
        width: '96%',
        height: '80%',
      },
      imageChoose: {
        width: '100%',
        height: '100%',
      },
      nameChoose: {
        textAlign: 'center',
        fontSize: 16,
      },
      flatListChoose: {
        padding: 5,
      },
    
      //list product
      listProduct: {
        marginTop: 5,
      },
      cartIcon: {
        alignItems: 'flex-start',
        marginRight: 4,
      },
      wrappIcon: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginTop: 1,
      },
      styleBtnTab: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: 3,
        right: 6,
        borderWidth: 0.5, 
        borderColor: 'green'
      },
      btnTabActive: {
        backgroundColor: '#009387', 
      },
      textTab: {
        fontSize: 16,
        color: 'black'
      },
      textTabActive: {
        color:'#fff',
      },
      search:{
        padding: 10,
        flex: 1,
    },
})
