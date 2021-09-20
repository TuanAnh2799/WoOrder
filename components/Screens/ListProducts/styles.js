import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 5,
        width: '47%',
        height: 270,
        borderRadius: 5,
        marginTop: 7
      },
      name: {
        fontSize: 16,
        marginTop: 4,
      },
      price:{
        fontSize: 15,
        
      },
      wrappIMG:{
        width:'100%',
        height: '70%',
        borderRadius:20,
      },
      image: {
          width: '100%',
          height: '100%',
          borderRadius: 5,
      },
      wrappInfo:{
        flexDirection: 'row',
        marginLeft: 3,
      },
      wrapAvaiable: {
        alignItems:'flex-end',
        flexDirection: 'row',
        marginLeft: 3,
      },
      textAvaiable: {
        fontSize:13,
      },
      wrapChooseProduct: {
        height: 200,
        width: '100%',
        borderWidth: 1,
        padding: 5,
        //flex: 3,
      },
      textTitle:{
        fontSize: 20,
        textAlign: 'center',
      },
      wrapChooseItem: {
        width: 150,
        height: '100%',
        marginLeft: 5,
        backgroundColor:'#ffffff',
        borderWidth: 0.5,
        borderRadius: 5,
      },
      imgChoose: {
        width: '96%',
        height: '80%',
      },
      imageChoose: {
        width: '100%',
        height: '100%',
    },
    nameChoose: {
      textAlign: 'center',
      fontSize: 16,
    },
    flatListChoose:{
      padding: 5,
    },


    //list product
    listProduct: {
      //flex: 8,
    },
    cartIcon: {
      alignItems:'flex-start',
      marginRight: 4,
    },
    wrappIcon: {
      justifyContent:'flex-end',
      alignItems:'flex-end',
      flexDirection:'row',
      marginTop: 1
    }
});
