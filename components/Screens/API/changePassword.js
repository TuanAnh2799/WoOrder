import auth, { firebase } from '@react-native-firebase/auth';
import { Alert } from 'react-native';

reauthenticate = (password) => {
    var user = auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
    return user.reauthenticateWithCredential(cred);
}

const onChangePasswordPress = (password,newpassword) => {
    this.reauthenticate(password).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(newpassword).then(() => {
        Alert.alert("Đổi mật khẩu thành công!");
      }).catch((error) => { console.log(error.message); Alert.alert("Thất bại! Vui lòng kiểm tra lại.");});
    }).catch((error) => {Alert.alert("Mật khẩu cũ không chính xác."); console.log(error.message) });
  }

export default onChangePasswordPress