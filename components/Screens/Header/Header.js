import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton, Colors, Title } from 'react-native-paper';

export default function Header({navigation}) {
    return (
        <View style={styles.wrappHeader}>
            <View>
                <IconButton
                    icon="camera"
                    color={Colors.red500}
                    size={25}
                    onPress={() => console.log('Pressed')}
                />
            </View>
            <View>
                <Title style={{fontSize: 20, fontWeight: '500'}}>Trang chủ</Title>
            </View>
            <View style={{marginBottom: 20,}}>
                <IconButton
                    icon="cart"
                    color={Colors.red300}
                    size={25}
                    onPress={() => console.log('Pressed')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrappHeader: {
        flexDirection:'row',
        height: 40,
        justifyContent:'space-between',
        backgroundColor:'#fff'
    }
})
