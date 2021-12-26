import React,{useState,useEffect} from 'react';
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, Caption, Searchbar, Title } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';


export default function SearchScreen({navigation}) {

    const [products, setProducts] = useState([]);
    const [searchFillter, setSearchFillter] = useState([]);

    const Search =(textSearch)=>{
        if(textSearch !== ''){
            const fillter = products.filter( e =>
            e.name.toLowerCase().includes(textSearch.toLowerCase()));
            setSearchFillter(fillter);
        }  
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
    <View style={{flex: 1}}>
        <View style={styles.search}>
            <Searchbar 
                placeholder="Bạn muốn tìm gì?"
                onChangeText={text =>{
                    Search(text);
                }}/>
        </View>
        <View style={{flexDirection:'column', marginLeft: '4%', flex: 9}}>
            {
                searchFillter.length === 0 ? (
                    <View style={{alignContent:'center', alignItems:'center',flex:1, justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontSize:17, fontStyle:'italic', fontWeight:'300'}}>Chưa có kết quả hiển thị </Text>
                    </View>
                ) : (
                    <View>
                    {searchFillter.map((item, index) => (
                    //<ScrollView>
                        <TouchableWithoutFeedback onPress={()=>navigation.navigate('Details', {
                            product:item
                        })} key={index.toString()}>
                            <View style={styles.wrapProduct} key={index.toString()} >
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
                                        {
                                            item.type === 3 && <Caption style={styles.caption}> @Đồ chơi</Caption>
                                        }
                                        
                                    </View>
                            </View>
                        </TouchableWithoutFeedback>
                        
                    //</ScrollView>
                ))} 
                </View>
                )
            }
            
        </View>
    </View>

    )
}

const styles = StyleSheet.create({
    search:{
        padding: 15,
        flex: 1,
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
