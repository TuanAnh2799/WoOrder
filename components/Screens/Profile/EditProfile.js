import React, {useContext, useEffect, useState, useRef} from 'react';
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
  Platform,
  Alert,
  Dimensions,
  Modal,
  TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {ActivityIndicator} from 'react-native-paper';
import { useSelector } from 'react-redux';


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const EditProfile = ({navigation, route}) => {
  const info = route.params.info;
  const userid = useSelector(state => state.userState.User);
  const [userInfo, setUserInfo] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [image, setImage] = useState(null);
  const [modalVisble, setmodalVisble] = useState(false);
 console.log("User info: ",info);

  var avatarDefault =
    'https://bloganchoi.com/wp-content/uploads/2020/07/meo-cua-lisa-17.jpg';

  const registerValidSchema = Yup.object().shape({
    fullname: Yup.string()
      .max(25, () => `Tên tối đa 25 ký tự.`)
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
      .doc(userid)
      .onSnapshot(documentSnapshot => {
        //console.log('User data: ', documentSnapshot.data());
        setUserInfo(documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const takePhotoFromCamera = async () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 600,
      compressImageMaxHeight: 600,
      cropping: true,
      //compressImageQuality: 0.7,
      multiple: false,
      mediaType: 'photo',
    })
      .then(image => {
        //console.log(image);
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setmodalVisble(false);
        setImage(imageUri);
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString());
        ToastAndroid.show('Tải ảnh lên thất bại!.', ToastAndroid.SHORT);
        setmodalVisble(false);
      });
  };

  const choosePhotoFromLibrary = async () => {
    ImagePicker.openPicker({
      width: 600,
      height: 600,
      cropping: true,
      //compressImageQuality: 0.7,
      multiple: false,
      mediaType: 'photo',
      includeBase64: true,
      forceJpg:true,
    })
      .then(image => {
        //console.log(image);
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        console.log('link anh: ' + imageUri);
        setmodalVisble(false);
        setImage(imageUri);

        ImagePicker.clean().then(() => {
          console.log('removed all tmp images from tmp directory');
        }).catch(e => {
          
          alert(e);
        });

      })
      .catch(err => {
        console.log('openCamera catch' + err.toString());
        ToastAndroid.show('Tải ảnh lên thất bại!.', ToastAndroid.SHORT);
        setmodalVisble(false);
      });
  };

  const submitImg = async () => {
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);

    firestore()
      .collection('UserAddress')
      .doc(userid)
      .update({
        avatar: imageUrl,
      })
      .then(() => {
        console.log('Image Added!');
        ToastAndroid.show(
          'Đã tải ảnh đại diện lên thành công!.',
          ToastAndroid.SHORT,
        );
      })
      .catch(error => {
        console.log(
          'Something went wrong with added post to firestore.',
          error,
        );
        ToastAndroid.show('Tải ảnh lên thất bại!.', ToastAndroid.SHORT);
      });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`Users/${userid}/${filename}`);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };


  const initValues = {
    fullname: info?.fullname,
    phonenumber: info?.phone.toString(),
    address: info?.address,
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true} // kéo xuống để tắt
      /> */}

      <Modal
        visible={modalVisble}
        animationType={'fade'}
        transparent={true}
        onRequestClose={()=>setmodalVisble(!modalVisble)}>
        <TouchableNativeFeedback
          onPress={() => {
            setmodalVisble(false);
          }}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#000000AA',
                justifyContent: 'flex-end',
              }}>
              <TouchableNativeFeedback>
                <View
                  style={{
                    backgroundColor: '#fff',
                    width: '100%',
                    height: deviceHeight * 0.36,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                  }}>
                    <View style={styles.panel}>
                      <View style={{alignItems: 'center'}}>
                        <Text style={styles.panelTitle}>Tải ảnh lên</Text>
                        <Text style={styles.panelSubtitle}>Chọn ảnh đại diện của bạn</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.panelButton}
                        onPress={takePhotoFromCamera}>
                        <Text style={styles.panelButtonTitle}>Chụp từ máy ảnh</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.panelButton}
                        onPress={choosePhotoFromLibrary}>
                        <Text style={styles.panelButtonTitle}>Chọn từ thư viện ảnh</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.panelButton}
                        onPress={() => setmodalVisble(false)}>
                        <Text style={styles.panelButtonTitle}>Hủy</Text>
                      </TouchableOpacity>
                    </View>
                </View>
              </TouchableNativeFeedback>
              
            </View>
          </TouchableNativeFeedback>
        
      </Modal>

      <Formik
        validationSchema={registerValidSchema}
        initialValues={initValues}
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
              onPress={() => {
                navigation.navigate('ViewPhoto', {
                  avatar: image !== null ? image : userInfo.avatar,
                });
              }}
              style={{flex: 2.5, backgroundColor: '#fff'}}>
              <View style={styles.wrapPhoto}>
                <ImageBackground
                  source={{
                    uri: image == null ? userInfo.avatar : image,
                  }}
                  style={styles.AvatarUser}
                  imageStyle={{borderRadius: 100, borderColor:'green', borderWidth: 1, resizeMode:'cover'}}>
                  <View style={styles.wrappIcon}>
                    <Icon
                      name="camera"
                      size={30}
                      color="white"
                      style={styles.iconCamera}
                      onPress={() => setmodalVisble(true)}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <View style={styles.wrapName}>
              <Text style={styles.txtName}>{userInfo.fullname}</Text>
            </View>
            {image !== null ? (
              <View
                style={{
                  width: '100%',
                  height: 30,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity onPress={submitImg}>
                  <View style={{ height: 30, flexDirection:'row', justifyContent:'center', alignItems:'center', borderWidth: 0.7, borderColor:'black', borderRadius: 5}}>
                    <Text style={{fontSize: 15}}>Tải lên</Text> 
                    <Icon
                    name="upload"
                    size={25}
                    color="tomato"
                  />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setImage(null)}>
                <View style={{height: 30, flexDirection:'row', justifyContent:'center', alignItems:'center', borderWidth: 0.7, borderColor:'black', borderRadius: 5}}>
                    <Text style={{fontSize: 15}}>Hủy bỏ</Text> 
                    <Icon
                    name="close"
                    size={25}
                    color="tomato"
                    //style={styles.iconEdit}
                    onPress={() => navigation.navigate('EditProfile')}
                  />
                  </View>
                  </TouchableOpacity>
                  </View>
            ) : (null)}
            <View style={styles.wrapInput}>
              <View style={styles.wrapTitle}>
                <Text style={styles.textTitle}>Cập nhật thông tin</Text>
              </View>
              {uploading ? (
                <View
                  style={{
                    justifyContent: 'center',
                    position: 'absolute',
                    alignItems: 'center',
                    marginTop: 100,
                    marginLeft: '30%',
                  }}>
                  <Text>Tải lên {transferred} %</Text>
                  <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    style={{marginTop: 5}}
                  />
                </View>
              ) : null}
              <View style={{marginTop: 10}}>
                <View style={styles.Input}>
                  <Text style={styles.text}>Họ và tên</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('fullname')}
                    onBlur={handleBlur('fullname')}
                    value={values.fullname}
                    placeholder="Nhập họ tên ..."
                  />
                  {errors.fullname && touched.fullname && (
                    <Text style={styles.textErr}>{errors.fullname}</Text>
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
                  {errors.address && touched.address && (
                    <Text style={styles.textErr}>{errors.address}</Text>
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
                  {errors.phonenumber && touched.phonenumber && (
                    <Text style={styles.textErr}>{errors.phonenumber}</Text>
                  )}
                </View>
              </View>

              <View style={styles.wrappButton}>
                <Button
                  title="Cập nhật"
                  disabled={values.fullname === initValues.fullname && values.address === initValues.address && values.phonenumber === initValues.phonenumber ? true : !isValid}
                  onPress={() => {
                    try {
                      firestore()
                        .collection('UserAddress')
                        .doc(userid)
                        .update({
                          fullname: values.fullname,
                          phone: values.phonenumber,
                          address: values.address,
                        })
                        .then(() => {
                          ToastAndroid.show(
                            'Cập nhật thành công.',
                            ToastAndroid.SHORT,
                          );
                        });
                    } catch {
                      ToastAndroid.show(
                        'Cập nhật thất bại.',
                        ToastAndroid.SHORT,
                      );
                    }
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapPhoto: {
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
  },
  AvatarUser: {
    marginTop: 0,
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
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    marginTop: 115,
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
    marginTop: '5%',
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
    paddingTop: 10,
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
    marginBottom: 2,
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
    marginVertical: 5,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  panel: {
    padding: 20,
    paddingTop: 5,
  },
});

export default EditProfile;
