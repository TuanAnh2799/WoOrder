import React, {useState} from 'react';
import { Text, View,Image, ScrollView } from 'react-native';
import { styles } from './styles';

const images = [
    'https://fandom.vn/wp-content/uploads/2019/06/mcu-bruce-banner-the-hulk-1.jpg',
    'https://www.w88pro.org/wp-content/uploads/2020/05/anh-nude-gai-xinh-5-min.jpg',
    'https://menback.com/wp-content/uploads/2020/02/t%E1%BA%A1i-sao-g%C3%A1i-h%C6%B0-l%E1%BA%A1i-h%E1%BA%A5p-d%E1%BA%ABn.jpg',
    'https://nhathuoc115.vn/UserFiles/image/anh-khoa-than-gai-xinh-viet-nam-nude-100_anh-khoa-than-gai-xinh-1.jpg'
  ];

  
export default function SlideScreen() {

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
    )
}

