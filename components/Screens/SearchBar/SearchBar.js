import React,{useState,useEffect} from 'react';
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, Caption, Searchbar, Title } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';


export default function SearchScreen({navigation}) {

    const [products, setProducts] = useState([]);
    const [searchFillter, setSearchFillter] = useState([]);

    const Search =(textSearch)=>{
        const fillter = products.filter( e =>
            e.name.toLowerCase().includes(textSearch.toLowerCase()));
            setSearchFillter(fillter);
    }

  useEffect(() => {
    const subscriber = firestore()
      .collection('Products')
      .onSnapshot(querySnapshot => {
        const products = [];

        querySnapshot.forEach(documentSnapshot => {
          products.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setProducts(products);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
    
    return (
    <View>
        <View style={styles.search}>
            <Searchbar 
                placeholder="Bạn muốn tìm gì?"
                onChangeText={text =>{
                    Search(text);
                }}/>
        </View>
        <View style={{flexDirection:'column', marginLeft: '4%'}}>
            {searchFillter.map((item, index) => (
                <ScrollView>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate('Details', {
                        id: item.id,
                        name: item.name,
                        color: item.color
                    })}>
                        <View style={styles.wrapProduct} key={index}>
                            <Avatar.Image source = {{
                                    uri: item.url[1]
                                }} 
                                size = {60} />
                                <View style={{marginLeft: 20}}>
                                    <Title style = {[styles.title, {marginTop: 2, marginBottom: 5}]}>
                                        {item.name}
                                    </Title>
                                    {item.type ===1 ? (
                                        <Caption style={styles.caption}> @Đồ công nghệ</Caption>
                                    ):(
                                        <Caption style={styles.caption}> @Thời trang</Caption>
                                    )}
                                    
                                </View>
                        </View>
                    </TouchableWithoutFeedback>
                    
                </ScrollView>
            ))}
        </View>
    </View>

    )
}

const styles = StyleSheet.create({
    search:{
        padding: 15,
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
        borderBottomWidth: 1,
        borderBottomColor: "#ffffffff",
        marginTop: 4,
        paddingVertical: 4,
        backgroundColor: "#fff",
        width: '96%',
    }
})
