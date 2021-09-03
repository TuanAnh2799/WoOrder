import React, {useContext} from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../Routes/AuthProvider';

export default function ProfileScreen({navigation}) {

  const {logout} = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Avatar.Image source = {{
                        uri: 'https://bloganchoi.com/wp-content/uploads/2020/07/meo-cua-lisa-17.jpg'
                    }} 
                    size = {80} />
                    <View style={{marginLeft: 20}}>
                        <Title style = {[styles.title, {marginTop: 15, marginBottom: 5}]}>
                            Tiểu Anh Anh
                        </Title>
                        <Caption style={styles.caption}>@Phàm nhân</Caption>
                    </View>
                    <Icon name="account-edit-outline" size={25} color="tomato" style={styles.iconEdit} onPress={()=>navigation.navigate("EditProfile")}/>
                </View>
            </View>


            <View style={styles.userInfo}>
                <View style={styles.row}>
                    <Icon name="map-marker-radius" size={20} color="#777777"/>
                    <Text style={{fontSize: 15, marginLeft: 10,}}>Thái Nguyên, Việt Nam</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" size={20} color="#777777"/>
                    <Text style={{fontSize: 15, marginLeft: 10,}}>+84 342918313</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" size={20} color="#777777"/>
                    <Text style={{fontSize: 15, marginLeft: 10,}}>27tuananh99@gmail.com</Text>
                </View>
            </View>


            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox,{
                    borderRightColor:'#dddddd',
                    borderRightWidth: 1,
                }]}>
                    <Title>$200.000 VND</Title>
                    <Caption>Ví tiền</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Title>5</Title>
                    <Caption>Đặt hàng</Caption>
                </View>
            </View>


        <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="cart-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Đơn hàng</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Yêu thích</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Thanh toán</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-question-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Hỗ trợ</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="cog" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Cài đặt</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {
          logout()
        }}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Đăng xuất</Text>
          </View>
        </TouchableRipple>
      </View>

    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
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
      justifyContent:'center',
      fontSize: 30,
      paddingTop: '4%',
      paddingLeft: '20%',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
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
