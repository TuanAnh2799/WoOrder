import { StyleSheet,Dimensions} from 'react-native';

const WITDH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    wrap: {
        width:'96%',
        backgroundColor: '#f0f0f0',
        marginLeft: '2%',
        padding: 5,
        borderWidth: 0.5, 
        marginTop: 7,
        borderRadius: 7,
      },
      wrappHeaderTitle: {
        flexDirection:'row',
        borderWidth: 0.5,
        height: 45, 
        paddingLeft: 10,
        backgroundColor:'#ffffff'
      },
      wrappImg: {
        width: '12%',
        height: 42,
      },
      img: {
       width: '100%',
       height: '100%'
      },
      item: {
        backgroundColor: '#ffffff',
        padding: 5,
        marginVertical: 2,
        marginHorizontal: '2.5%',
        width: '95%',
        height: 130,
        borderRadius: 5,
        marginTop: 7,
        flexDirection: 'row',
      },
      wrapTitle: {
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center',
      },
      wrappIMG: {
        width: '35%',
        height: '96%',
        borderRadius: 20,
      },
      image: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
      },
      wrappInfo: {
        flexDirection: 'column',
        marginLeft: 20,
        width: '100%',
        //justifyContent: 'space-around',
      },
      textTitle: {
        fontSize: 20,
        textAlign: 'center',
      },
      wrappName: {
        width: '100%',
        marginTop: 10
      },
      wrappTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        right: 40,
      },
      title: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '400',
        textDecorationLine: 'underline',
      },
      WrapOrderDetail: {
          //width: WITDH,
          height: 185,
      },
      WrapButton: {
        height: 40,
    }, 
    name: {
      fontSize: 17,
      fontWeight:'bold'
    }

    
});
