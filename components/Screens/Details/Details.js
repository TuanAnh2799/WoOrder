import React, { useState } from 'react';
import {Text, View,ScrollView,Image , SafeAreaView} from 'react-native';
import { styles } from './styles';

export default function DetailsScreen({route,navigation}) {

    const images = route.params.url;
   //console.log(images);
    //setImage(route.params.url);

    const [imgActive, setImgActive] = useState(0);

    const onchange = nativeEvent => {
      if (nativeEvent) {
        const slide = Math.ceil(
          nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
        );
        if (slide !== imgActive) {
          setImgActive(slide);
        }
      }
    };
    
    return (
        <SafeAreaView>
            <View style={styles.wrap}>
                <ScrollView
                onScroll={({ nativeEvent })=>onchange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={styles.wrap}
                >
                {
                    images.map((e, index) =>
                    <Image
                        key={e}
                        resizeMode="stretch"
                        style={styles.wrap}
                        source={{ uri: e }}
                    />
                    )
                }
                </ScrollView>
                <View style={styles.wrapDot}>
                {images.map((e, index) => (
                    <Text
                    key={e}
                    style={
                        imgActive === index ? styles.isActive : styles.isNotActive
                    }>
                    ●
                    </Text>
                ))}
                </View>
            </View>

            <View style={styles.wrapInfo}>

            </View>
        </SafeAreaView>
      
    )
}

