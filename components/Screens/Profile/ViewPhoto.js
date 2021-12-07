import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'

const ViewPhotoScreen = ({route,navigation}) => {
    const url = route.params.avatar;
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Image source={{uri: url}} style={{width: '100%', height:'100%', resizeMode:'contain'}}/>
            </View>
        </SafeAreaView>
    )
}

export default ViewPhotoScreen;

const styles = StyleSheet.create({})
