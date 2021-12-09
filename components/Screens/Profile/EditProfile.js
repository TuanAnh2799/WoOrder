import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Button,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../Routes/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';



const EditProfile =({navigation})=> {

  const {user} = useContext(AuthContext);
  const [userInfo,setUserInfo] = useState([]);

  const [avatar,setAvatar] = useState('https://bloganchoi.com/wp-content/uploads/2020/07/meo-cua-lisa-17.jpg');

  const registerValidSchema = Yup.object().shape({
    fullname: Yup.string().max(25, ()=>`Tên tối đa 25 ký tự.`)
      .matches(/(\w.+\s).+/, 'Vui lòng nhập họ và tên')
      .required('Bạn chưa nhập họ tên.'),
    phonenumber: Yup.string()
      .matches(/^(0)(\d)(?=.{8,})(?=.*[0-9])/, 'Số điện thoại không hợp lệ.')
      .required('Bạn chưa nhập số điện thoại'),
    address: Yup.string()
      .matches(/(\w.+\s).+/, 'Vui lòng nhập địa chỉ.')
      .required('Bạn chưa nhập địa chỉ.'),
  });
  
  useEffect(() => {
    const subscriber = firestore()
      .collection('UserAddress')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        //console.log('User data: ', documentSnapshot.data());
        setUserInfo(documentSnapshot.data())
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 400,
      compressImageMaxHeight: 400,
      cropping: true,
      compressImageQuality: 1,
      multiple: false,
      mediaType: 'photo'
    }).then(image => {
      console.log(image);
      bs.current.snapTo(1);
      setAvatar(image.path);
      
    }).catch((err) => { console.log("openCamera catch" + err.toString()) });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      compressImageQuality: 1,
      multiple: false,
      mediaType: 'photo',
      includeBase64: true,
    }).then(image => {
      console.log(image);
      bs.current.snapTo(1);
      setAvatar(image.path);
      
    }).catch((err) => { console.log("openCamera catch" + err.toString()) });
  }

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Tải ảnh lên</Text>
        <Text style={styles.panelSubtitle}>Chọn ảnh đại diện của bạn</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Chụp từ máy ảnh</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Chọn từ thư viện ảnh</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Hủy</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
  <View style={styles.header}>
    <View style={styles.panelHeader}>
      <View style={styles.panelHandle}>

      </View>
    </View>
  </View>
  );

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <SafeAreaView style={{flex: 1}}>

    <BottomSheet 
      ref={bs}
      snapPoints={[330, 0]}
      renderContent = {renderInner}
      renderHeader = {renderHeader}
      initialSnap={1}
      callbackNode = {fall}
      enabledGestureInteraction = {true} // kéo xuống để tắt
    />
    
      <Formik
        validationSchema={registerValidSchema}
        initialValues={{
          fullname: '',
          address: '',
          phonenumber: '',
        }}
        validateOnMount={true}
        onSubmit={values => console.log(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => {navigation.navigate("ViewPhoto", {
                avatar: avatar
              })}}
              style={{flex: 2.1, backgroundColor: '#fff'}}>
              <View style={styles.wrapPhoto}>
                <ImageBackground
                  source={{
                    uri: avatar,
                  }}
                  style={styles.AvatarUser}
                  imageStyle={{borderRadius: 100}}>
                  <View style={styles.wrappIcon}>
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={styles.iconCamera}
                      onPress={()=> bs.current.snapTo(0)}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <View style={styles.wrapName}>
              <Text style={styles.txtName}>{userInfo.fullname}</Text>
            </View>
            <View style={styles.wrapInput}>
              <View style={styles.wrapTitle}>
                <Text style={styles.textTitle}>Cập nhật thông tin</Text>
              </View>

              <View style={{marginTop: 25}}>
                <View style={styles.Input}>
                  <Text style={styles.text}>Họ và tên</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('fullname')}
                    onBlur={handleBlur('fullname')}
                    value={values.fullname}
                    placeholder="Nhập họ tên ..."
                  />
                  { errors.fullname && touched.fullname && (
                      <Text
                        style={styles.textErr}>
                        {errors.fullname}
                      </Text>
                    )}
                </View>

                <View style={styles.Input}>
                  <Text style={styles.text}>Địa chỉ</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
                    placeholder="Nhập địa chỉ ..."
                  />
                  { errors.address && touched.address && (
                      <Text
                        style={styles.textErr}>
                        {errors.address}
                      </Text>
                    )}
                </View>

                <View style={styles.Input}>
                  <Text style={styles.text}>Số điện thoại</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('phonenumber')}
                    onBlur={handleBlur('phonenumber')}
                    value={values.phonenumber}
                    placeholder="Nhập số điện thoại..."
                    keyboardType="phone-pad"
                  />
                  { errors.phonenumber && touched.phonenumber && (
                      <Text
                        style={styles.textErr}>
                        {errors.phonenumber}
                      </Text>
                    )}
                </View>
              </View>

              <View style={styles.wrappButton}>
                <Button title="Cập nhật" disabled={!isValid} onPress={()=> {
                  try{
                    firestore()
                    .collection('UserAddress')
                    .doc(user.uid)
                    .update({
                      fullname: values.fullname,
                      phone: values.phonenumber,
                      address: values.address,
                    })
                    .then(() => {
                      ToastAndroid.show('Cập nhật thành công.',ToastAndroid.SHORT);
                    });
                  }catch{
                    ToastAndroid.show('Cập nhật thất bại.',ToastAndroid.SHORT);
                  }
                  }}/>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapPhoto: {
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
  },
  AvatarUser: {
    marginTop: 5,
    width: 150,
    height: 150,
  },
  wrapName: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  wrapInput: {
    flex: 7.1,
    width: '100%',
    backgroundColor: '#fff',
  },
  wrappIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCamera: {
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    marginTop: 110,
    padding: 3,
  },
  txtName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
  },
  wrapTextInput: {
    width: '96%',
    height: 40,
    marginLeft: '2%',
  },
  text: {
    fontSize: 16,
    left: 12,
    marginTop: 6,
  },
  input: {
    height: 42,
    margin: 10,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 5,
    width: '94%',
    marginLeft: '3%',
  },
  wrapTitle: {
    alignItems: 'center',
    marginTop: 20,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    borderTopColor: 'orange',
    borderRightColor: 'orange',
    borderLeftColor: 'orange',
  },
  textTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
  },
  wrappButton: {
    width: '90%',
    marginLeft: '5%',
    marginTop: '10%',
  },
  textErr: {
    fontSize: 12,
    color: 'red',
    marginLeft: '4%',
  },
  header: {
    backgroundColor: '#ffffff',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
});

export default EditProfile;