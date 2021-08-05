import React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';

export default function Product(props){

    const { product,onPress } = props;
    return(
        <View style={styles.container}>
        <TouchableOpacity onPress={ onPress }>
            <View>
                { /*<Image style={{width: 250, height: 200}} source={require('../image/kuku.jpg')}/> */}
                <Image
                style={{width: 250, height: 200}}
                source={{
                 uri: 'https://1.bp.blogspot.com/-qaRkLrZ-6o0/Wdc9DKW4_uI/AAAAAAAAJfg/xYqck3qSk54i7YuvinxOA91P7FmXtS-EgCEwYBhgL/s1600/vu-to.jpg',
                }}
                />
                <Text style={{color:'blue', textAlign:'center'}}>Giá: <Text style={{color:'red',fontSize: 22, }} > {product.price}</Text> VNĐ</Text>
                <Text style={{textAlign:'center'}} >Tên:<Text style={{fontSize: 22, fontStyle:'italic'}}> {product.name}</Text> </Text>
            </View>
            <View style={{backgroundColor:'pink', width:150, height: 35, 
            justifyContent:'center', alignItems:'center', marginLeft: 50, borderRadius: 20, marginTop: 10}}>
                <Text style={{textAlign:'center', justifyContent:'center', fontStyle:'italic', fontSize:18}}>Book Now</Text>
            </View>
            
        </TouchableOpacity>
            
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 30,
    },
    item:{
        textAlign: 'center',
        justifyContent:'center',
        alignItems:'center',
    }
});