import React,{useContext, useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View,ImageBackground, TouchableOpacity ,TextInput, Button} from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EditProfile({navigation}) {

    const [fullname, onChangeFullName] = useState("");
    const [phone, onChangePhone] = useState("");
    const [address, onChangeAdress] = useState("");

    return (
        <SafeAreaView style={{flex: 1}}>
            <TouchableOpacity onPress={() => {}} style={{flex: 2.1, backgroundColor:'#fff'}}>
                <View style={styles.wrapPhoto}>
                    <ImageBackground source = {{
                            uri: 'https://bloganchoi.com/wp-content/uploads/2020/07/meo-cua-lisa-17.jpg'
                        }} 
                        style={styles.AvatarUser} imageStyle={{borderRadius: 100,}}>
                        <View style={styles.wrappIcon}>
                            <Icon name="camera" size={35} color="#fff" style={styles.iconCamera}/>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
            <View style={styles.wrapName}>
                <Text style={styles.txtName}>Tiểu Anh Anh</Text>
            </View>
            <View style={styles.wrapInput}>

                <View style={styles.wrapTitle}>
                    <Text style={styles.textTitle}>Cập nhật thông tin</Text>
                </View>

                <View style={{marginTop: 25}}>
                    <View style={styles.Input}>
                        <Text style={styles.text}>Họ và tên</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text)=> onChangeFullName(text)}
                                value={fullname}
                                placeholder="Nhập họ và tên ..."
                            />
                    </View>

                    <View style={styles.Input}>
                        <Text style={styles.text}>Địa chỉ</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text)=> onChangeAdress(text)}
                                value={address}
                                placeholder="Nhập địa chỉ ..."
                            />
                    </View>

                    <View style={styles.Input}>
                        <Text style={styles.text}>Số điện thoại</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text)=> onChangePhone(text)}
                                value={phone}
                                placeholder="Nhập số điện thoại ..."
                            />
                    </View>

                </View>
                    
                <View style={styles.wrappButton}>
                    <Button title="Cập nhật"/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapPhoto: {
        width: '100%',
        alignItems: 'center',
        alignContent:'center',
    },
    AvatarUser: {
        marginTop: 5,
        width: 150,
        height:150,
    },
    wrapName: {
        flex: 0.5,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    wrapInput: {
        flex: 7.1,
        width: '100%',
        backgroundColor:'#fff',
    },
    wrappIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCamera: {
        opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        marginTop: 110,
        padding: 3,
    },
    txtName: {
        fontSize: 18,
        fontWeight:'bold',
        marginTop: 2,
    },
    wrapTextInput: {
        width: '96%',
        height: 40,
        marginLeft: '2%',
    },
    text: {
        fontSize: 16,
        left: 12,
        marginTop: 6,
    },
    input: {
        height: 42,
        margin: 10,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 5,
        width: '94%',
        marginLeft: '3%',
    },
    wrapTitle: {
        alignItems:'center', 
        marginTop: 20,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        borderTopColor: 'orange',
        borderRightColor:'orange',
        borderLeftColor:'orange'
    },
    textTitle: {
        fontSize: 25,
        fontWeight:'bold',
        marginTop: 15
    },
    wrappButton: {
        width: '90%',
        marginLeft: '5%',
        marginTop: '10%',
    }
});
