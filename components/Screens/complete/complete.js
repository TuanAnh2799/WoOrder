import React,{useState, useEffect} from 'react';
;import { SafeAreaView, StyleSheet, Text, View,FlatList,Image, ActivityIndicator, TouchableNativeFeedback } from 'react-native';

export default function Complete({navigation}) {
    
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getData();
        return () => {};
      }, []);
    
      const getData = () => {
        const apiUrl = 'https://jsonplaceholder.typicode.com/photos';
        fetch(apiUrl)
          .then(respone => respone.json())
          .then(resJson => {
            setLoading(true);
            setData(resJson);
          })
          .catch(err => console.log(err + ''))
          .finally(() => setLoading(false));
      };
      
    return (
        <SafeAreaView style={styles.wrapScreen}>
            <View style={styles.header}>
                <Text style={{fontSize: 18, textAlign: 'center', borderBottomWidth: 0.5, padding: 5, fontStyle: 'italic'}}>Complete</Text>
            </View>
            {
            isLoading ? (<ActivityIndicator size="small" color="#0000ff" />) : 
            (
                <View style={styles.wrapItem}>
                    <FlatList
                        data={data}
                        renderItem={({item}) => (
                        <View
                            style={{
                            flex: 1,
                            flexDirection: 'column',
                            margin: 1,
                            padding: 2,
                            }}>
                            <TouchableNativeFeedback onPress={()=>navigation.navigate('DetaiComplete')}>
                                <Image
                                style={styles.imageThumbnail}
                                source={{uri: item.url}}
                                />
                            </TouchableNativeFeedback>
                            
                    </View>
                    )}
                    //Setting the number of column
                    numColumns={3}
                    keyExtractor={(item, index) => index}
                />
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapScreen:{
        flex: 1,
    },
    header: {
        flex: 0.5,
    },
    wrapItem: {
        flex: 11,
        top: 10,
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
      },
})
