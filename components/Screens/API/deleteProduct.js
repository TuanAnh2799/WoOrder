import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { ToastAndroid } from 'react-native';

const deleteProduct = (id,urlIMG)=> {
    urlIMG.map(e => {
      let ref = storage().refFromURL(e);
      storage().ref(ref.fullPath).delete().catch(err => console.log(err));
    });
    firestore()
    .collection('Products')
    .doc(id)
    .delete()
    .then(() => {
      ToastAndroid.show('Xóa thành công!.', ToastAndroid.SHORT);
    });

  }
  export default deleteProduct;