import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 10,
        width: '45%',
        height: 250,
        borderRadius: 5,
      },
      name: {
        fontSize: 17,
      },
      price:{
        fontSize: 16,
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
      },
      wrapAvaiable: {
        alignItems:'flex-end',
        flexDirection: 'row',
      },
      textAvaiable: {
        fontSize:13,
      },
      wrapChooseProduct: {
        height: 200,
        width: '100%',
        borderWidth: 1,
        padding: 5,
        flex: 3,
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
      flex: 8,
    },
});