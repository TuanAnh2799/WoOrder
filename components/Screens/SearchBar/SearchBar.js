import React,{useState,useEffect} from 'react';
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Avatar, Caption, Searchbar, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function SearchScreen({navigation}) {
    const products = useSelector(state => state.productStore.Product);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFillter, setSearchFillter] = useState([]);
    console.log('List product bên searchBar: ',products);

    const Search =(textSearch)=>{
        if(textSearch !== ''){
            const fillter = products.filter( e =>
            e.name.toLowerCase().includes(textSearch.toLowerCase()));
            setSearchFillter(fillter);
        }  
    }
    
    return (
    <View style={{flex: 1}}>
        <View style={styles.search}>
            <Searchbar 
                placeholder="Nhập tên sản phẩm ..."
                onChangeText={text =>{
                    Search(text);
                    setSearchQuery(text);
                }}/>
        </View>
        <View style={{flexDirection:'column', marginLeft: '4%', flex: 9}}>
            <FlatList
                data={searchQuery !== '' ? searchFillter : products}
                renderItem={({item, index}) => (
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('Details', {
                        product: item,
                        })}>
                        <View style={styles.wrapProduct} key={index.toString()} >
                            <Avatar.Image source = {{
                                uri: item.url[0]
                                }} 
                                size = {60} />
                            <View style={{marginLeft: 20}}>
                                <Title style = {[styles.title, {marginTop: 2, marginBottom: 5}]}>
                                    {item.name}
                                </Title>
                                {item.type ===1 && (
                                    <Caption style={styles.caption}> @Đồ công nghệ</Caption>
                                )}

                                {item.type ===2 && (
                                    <Caption style={styles.caption}> @Thời trang</Caption>
                                )}
                                {
                                    item.type === 3 && <Caption style={styles.caption}> @Đồ chơi</Caption>
                                }
                                        
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
              )}
              keyExtractor={(item, index) => index}
            /> 
        </View>
    </View>

    )
}

const styles = StyleSheet.create({
    search:{
        padding: 15,
        //flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    wrapProduct: {
        flexDirection:'row',
        borderWidth: 0.5,
        borderColor:'#fff',
        //borderBottomColor: "#ffffffff",
        marginTop: 5,
        paddingVertical: 4,
        backgroundColor: "#fff",
        width: '96%',
        borderRadius: 7,
        shadowColor:'black',
        elevation: 4,
    }
})
