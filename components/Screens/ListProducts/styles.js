import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 5,
    width: '47%',
    height: 250,
    borderRadius: 5,
    marginTop: 5,
    borderColor:'#009387',
    borderWidth: 1
  },
  name: {
    fontSize: 17,
    marginTop: 4,
    fontWeight:'700',
    textAlign:'center',
  },
  price: {
    fontSize: 15,
  },
  wrappIMG: {
    width: '100%',
    height: '80%',
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  wrappInfo: {
    flexDirection: 'row',
    marginLeft: 3,
  },
  wrapAvaiable: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginLeft: 3,
  },
  textAvaiable: {
    fontSize: 13,
  },
  wrapChooseProduct: {
    height: 200,
    width: '100%',
    borderWidth: 1,
    padding: 5,
    //flex: 3,
  },
  textTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  wrapChooseItem: {
    width: 150,
    height: '100%',
    marginLeft: 5,
    backgroundColor: '#ffffff',
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
  flatListChoose: {
    padding: 5,
  },

  //list product
  listProduct: {
    //flex: 8,
  },
  cartIcon: {
    alignItems: 'flex-start',
    marginRight: 4,
  },
  wrappIcon: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginTop: 1,
  },
  styleBtnTab: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginLeft: 3,
    right: 6,
    borderWidth: 0.5, 
    borderColor: 'green'
  },
  btnTabActive: {
    backgroundColor: '#009387', 
  },
  textTab: {
    fontSize: 16,
    color: 'black'
  },
  textTabActive: {
    color:'#fff',
  }
});
