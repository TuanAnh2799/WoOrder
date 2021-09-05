import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen({route,navigation}) {
    const id = route.params.id;
    return (
        <View>
            <Text>Deatil screen</Text>
            <Text>ID: {id}</Text>
        </View>
    )
}

const styles = StyleSheet.create({});
