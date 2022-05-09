import React from 'react';
import { Text, View,Image, ScrollView } from 'react-native';
import { styles } from './styles';
import Swiper from 'react-native-swiper';

const images = [
    'https://www.goteso.com/products/assets/images/clone-scripts/saucey/saucey-app-clone-banner.png',
    'https://www.kindpng.com/picc/m/623-6231082_drizly-app-clone-banner-laundry-online-hd-png.png',
    'https://img0.baidu.com/it/u=3035675779,2495350440&fm=26&fmt=auto',
    'https://img0.baidu.com/it/u=1442847403,2881362523&fm=26&fmt=auto'
  ];

  
export default function SlideScreen() {

//   const [imgActive, setImgActive] = useState(0);

//   const onchange = nativeEvent => {
//     if (nativeEvent) {
//       const slide = Math.ceil(
//         nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
//       );
//       if (slide !== imgActive) {
//         setImgActive(slide);
//       }
//     }
// };
  
    return (
        <View style={styles.wrap}>
          <Swiper 
          autoplay
          loop
          showsButtons={true}
          
          >
            {images.map((item,index) => (
              <Image 
              key={index}
              source={{uri:item}}
              style={styles.wrap}
              resizeMode="stretch"
              />
            ))}
          </Swiper>
        </View>
    )
}

