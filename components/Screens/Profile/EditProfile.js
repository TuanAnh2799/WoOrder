import React,{useContext} from 'react';
import { SafeAreaView, StyleSheet, Text, View,ImageBackground, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EditProfile({navigation}) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <TouchableOpacity onPress={() => {}} style={{flex: 2.4, backgroundColor:'yellow'}}>
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
        backgroundColor:'green',
        alignItems:'center',
        justifyContent:'center',
    },
    wrapInput: {
        flex: 7.1,
        width: '100%',
        backgroundColor:'red',
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
    }
});
