import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen({route,navigation}) {
    const id = route.params.id;
    const name = route.params.name;
    const color = route.params.color;
    return (
        <View>
            <Text>Deatil screen</Text>
            <Text>ID: {id}</Text>
            <Text>Name: {name}</Text>
            <Text>Color: {color}</Text>
        </View>
    )
}

const styles = StyleSheet.create({});
