import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 5,
    marginVertical: 7,
    marginHorizontal: 5,
    width: '96%',
    height: 150,
    borderRadius: 5,
    marginTop: 1,
    borderColor:'#009387',
    borderWidth: 1,
    marginLeft: '2%',
    flexDirection:'row'
  },
  name: {
    fontSize: 16,
    marginTop: 4,
    marginLeft: 10
  },
  price: {
    fontSize: 15,
    marginLeft: 10
  },
  wrappIMG: {
    width: '40%',
    height: '100%',
    borderRadius: 0,
    borderRightColor: '#009387',
    borderRightWidth: 1,
  },
  wrappImgEDIT: {
    width: '30%',
    height: '49%',
    borderRadius: 10,
    borderColor: '#009387',
    borderWidth: 1,
    marginTop: 2,
    marginLeft: 10,
    padding: 1
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  wrappInfo: {
    marginLeft: 3,
  },
  wrapPrice: {
    marginLeft: 3,
    marginTop: 5,
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
    flex: 1,
    marginTop: 5,
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
  },
  container: {
    width: '100%',
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textareaContainer: {
    height: 155,
    padding: 5,
    borderRadius: 10,
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: '100%',
    fontSize: 14,
    color: '#333',
  },
  checkbox: {
    fontSize: 17,
    marginTop: 7,
  },
  editProductButton: {
    backgroundColor:'#ffff',
    justifyContent:'center',
    alignItems:'center',
    height: 35,
    borderBottomWidth: 0.5,
  },
  deleteProductButton: {
    backgroundColor:'#ffff',
    justifyContent:'center',
    alignItems:'center',
    height: 35,
  },
});
