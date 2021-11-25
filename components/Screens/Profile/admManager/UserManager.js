import React, { useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View,TouchableNativeFeedback,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { Searchbar } from 'react-native-paper';
  
const UserManagerScreen = () => {
    const [searchFillter, setSearchFillter] = useState([]);

    const User = [
        {
            id: 1,
            name: 'Tuấn Anh',
            phone: '01236694015',
            avatar: 'https://bloganchoi.com/wp-content/uploads/2020/07/meo-cua-lisa-17.jpg',
            email: 's2luckyboy123@gmail.com'
        },
        {
            id: 2,
            name: 'Anh Hàng Xóm',
            phone: '0342918313',
            avatar: 'https://bloganchoi.com/wp-content/uploads/2020/07/meo-cua-lisa-17.jpg',
            email: 'anhanh99@gmail.com'
        },
        {
            id: 3,
            name: 'Tuấn Anh Sky',
            phone: '012345678910',
            avatar: 'https://bloganchoi.com/wp-content/uploads/2020/07/meo-cua-lisa-17.jpg',
            email: '27tuananh99@gmail.com'
        },
        {
            id: 4,
            name: 'Em Hàng Xóm',
            phone: '01236694015',
            avatar: 'https://bloganchoi.com/wp-content/uploads/2020/07/meo-cua-lisa-17.jpg',
            email: '27tuananh99@gmail.com'
        },
    ];
    const search =(textSearch)=>{
        const fillter = User.filter( e =>
            e.name.toLowerCase().includes(textSearch.toLowerCase()));
            setSearchFillter(fillter);
    }

    const Search =()=>(
        <View style={styles.search}>
            <Searchbar
                placeholder="Nhập tên hoặc ID người dùng..."
                onChangeText={text =>{
                    search(text);
                }}
                />
        </View>
    );
    return (
        <SafeAreaView style={{flex:  1}}>
            <FlatList
              data={searchFillter}
              ListHeaderComponent={Search}
              renderItem={({item, index}) => (
                <TouchableNativeFeedback>
                  <View style={styles.item} key={User.id}>
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
                          
                          <Text style={styles.name}>{item.name}</Text>
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
                        <MenuTrigger text="Sửa" />
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
              keyExtractor={(item, index) => item.id}
            />
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
        height: 130,
        borderRadius: 5,
        marginTop: 1,
        borderColor:'#009387',
        borderWidth: 1,
        marginLeft: '2%',
        flexDirection:'row'
      },
      name: {
        fontSize: 15,
        marginTop: 4,
        marginLeft: 10
      },
      phone: {
        fontSize: 15,
        marginLeft: 10
      },
      wrappIMG: {
        width: '30%',
        height: '100%',
        borderRadius: 500,
        borderColor: '#009387',
        borderWidth: 1,
        
      },
      image: {
        width: '100%',
        height: '100%',
        borderRadius: 500,
      },
      wrappInfo: {
        marginLeft: 3,
        flexDirection:'row'
      },
      wrappEmail: {
        marginLeft: 3,
        marginTop: 5,
        flexDirection:'row'
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
