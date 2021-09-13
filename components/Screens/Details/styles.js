import { StyleSheet,Dimensions} from 'react-native';

const WITDH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    wrap: {
        width:WITDH ,
        height: HEIGHT * 0.35, // 35% màn hình
        marginTop: 2,
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
      wrapInfo: {
        width: '100%',
        height: 400,
        backgroundColor: '#fff',
        borderTopColor:'#a9a9a9',
        marginTop: 10,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRightColor:'#a9a9a9',
        borderLeftColor:'#a9a9a9',

      }
    
});