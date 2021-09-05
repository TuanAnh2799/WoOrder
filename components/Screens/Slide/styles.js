import { StyleSheet,Dimensions} from 'react-native';

const WITDH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    wrap: {
        width:WITDH,
        height: HEIGHT * 0.25 // 25% window
      },
      wrapDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
      },
      isActive: {
        margin: 3,
        color: 'black',
      },
      isNotActive: {
        margin: 3,
        color: 'white',
      },
    
});
