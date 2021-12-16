import React from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {RadioButton, Checkbox, TouchableRipple} from 'react-native-paper';
import deleteIcon from '../../../../img/Delete.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { TouchableOpacity } from 'react-native-gesture-handler';



const AddProduct = () => {
  const [checked, setChecked] = React.useState('1'); //type
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [sizeM, setSizeMChecked] = React.useState(false);
  const [sizeL, setSizeLChecked] = React.useState(false);
  const [sizeXL, setSizeXLChecked] = React.useState(false);
  const [sizeXXL, setSizeXXLChecked] = React.useState(false);
  const [info, setInfo] = React.useState('');
  const [color, setColor] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [idSP,setIdSP] = React.useState('');

    //console.log(listIMG);
  images?.length > 6 && setImages([]);
  let listIMG = [];
  images?.map(e =>listIMG.push(e));

  let uploadUri = listIMG;
    //let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    let filename = [];
    uploadUri.map(e => {
      filename.push(e.substring(e.lastIndexOf('/') + 1));
      
    })

    {
      /*
      // Add timestamp to File Name
    let extension = [];
    //const extension = filename.split('.').pop();
    filename.map(e => extension.push(e.split('.').pop()));
    //const name = filename.split('.').slice(0, -1).join('.');
    let name = [];
    filename.map(ex => name.push(ex.split('.').slice(0, -1).join('.')));

    //filename = name + Date.now() + '.' + extension;
      */
    }
    



console.log("list file name:"+filename);

  const choosePhotoFromLibrary = async () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      maxFiles: 6, //ios only :(
      compressImageQuality: 0.8,
      mediaType: 'photo',
      includeBase64: true,
    })
      .then(image => {
        let x = [];
        image.map(e => {
          x.push(e.path);
        })
        setImages(x);
        listIMG.push(x);
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString());
        ToastAndroid.show('Tải ảnh lên thất bại!.', ToastAndroid.SHORT);
      });
  };

  const submitImg = async () => {
    let imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);

    firestore()
      .collection('Products')
      .doc(idSP)
      .set({
        id: idSP,
        url: imageUrl,

      })
      .then(() => {
        console.log('Product Added!');
        ToastAndroid.show(
          'Thêm sản phẩm thành công!.',
          ToastAndroid.SHORT,
        );
      })
      .catch(error => {
        console.log(
          'Something went wrong with added post to firestore.',
          error,
        );
        ToastAndroid.show('Thêm thất bại!.', ToastAndroid.SHORT);
      });
  };

  var ID = function () {
    return 'SP_' + Math.random().toString(36).substr(2, 5);
  };
  

  const uploadImage = async () => {
    if (listIMG == null) {
      return null;
    }
    let Id = await ID();  //tạo id cho sản phẩm
    setIdSP(Id);

    let uploadUri = listIMG;
    
    //let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    let filename = [];
    uploadUri.map(e => {
      filename.push(e.substring(e.lastIndexOf('/') + 1));
    })

    {
      /*
      // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
       */
    }
    

    //setUploading(true);
    //setTransferred(0);

    {
      /*
      const storageRef = storage().ref(`Products/${idSP}/${filename}`);
    let task;
    let url = [];
    uploadUri.map(e =>{
     task = storageRef.putFile(e);
      try {
        //await task;
        url.push(storageRef.getDownloadURL());
        //const url = await storageRef.getDownloadURL();
  
        
      } catch (e) {
        console.log(e);
        return null;
      }
    });
    return url;
      */
    }
    let url = [];
    let i = 1;
    {
      /*
      filename.map(e => {
      let storageRef = storage().ref(`Products/${idSP}/${e}`);
      storageRef.putFile(uploadUri[i]);
      i++;
      try {
        let x = storageRef.getDownloadURL()
        url.push(x);
      }catch(e){
        console.log(''+e);
      }
    })
    return url;

    //const task = storageRef.putFile(uploadUri);
    
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
        
        setTransferred(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
          );
        });
        
        //setUploading(false);

        uploadUri.map(e =>{
      let storageRef = storage().ref(`Products/${idSP}/${filename[i]}`);
      i++;
      storageRef.putFile(e);
      url.push(storageRef.getDownloadURL());
    })
      */

    }
    let storageRef = storage().ref(`Products/${idSP}/${filename[0]}`);
      let task = storageRef.putFile(uploadUri[0]);
      try{
        await task;
        let link = await storageRef.getDownloadURL();
        url.push(link);
      }
      catch(e){

      }

    console.log('list url:'+url);
    return url;
  };


const deletePhoto =(urlPhoto)=> {
  listIMG.filter((e,index)=> {
    return e !== urlPhoto;
  })
  return setImages(listIMG);
}

const onDelete = (value) => {
  const data = listIMG.filter(
    (item) => item !== value
  );
  setImages(data);
};
 
  return (
    <SafeAreaView style={{flex: 1}}>

      <View style={{flex: 9.4}}>
        <View style={{height:'100%'}}>

          <View style={styles.wrappItem}>
            <View style={{width: '30%'}}>
              <Text style={styles.label}>Tên sản phẩm</Text>
            </View>
            <View style={{width: '70%', height: 35}}>
              <TextInput style={{width: 250, borderWidth: 1, borderRadius: 10}} />
            </View>
          </View>

          {/*Loại sản phẩm */}

          <View style={styles.wrappItem}>
            <View style={{width: '20%'}}>
              <Text style={styles.label}>Loại:</Text>
            </View>
            <View>
              <View style={{width: '80%', height: 35, flexDirection: 'row'}}>
                <RadioButton
                  value="1"
                  status={checked === '1' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('1')}
                />
                <Text style={styles.labelRadioBtn}>Công nghệ</Text>

                <RadioButton
                  value="2"
                  status={checked === '2' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('2')}
                />
                <Text style={styles.labelRadioBtn}>Thời trang</Text>

                <RadioButton
                  value="3"
                  status={checked === '3' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('3')}
                />
                <Text style={styles.labelRadioBtn}>Đồ chơi</Text>
              </View>
            </View>
          </View>

          <View style={styles.wrappItem}>
            <View style={{width: '30%'}}>
              <Text style={styles.label}>Giá sản phẩm</Text>
            </View>
            <View style={{width: '70%', height: 35}}>
              <TextInput style={{width: 250, borderWidth: 1, borderRadius: 10}} />
            </View>
          </View>

          <View style={styles.wrappItem}>
            <View style={{width: '30%'}}>
              <Text style={styles.label}>Màu sắc</Text>
            </View>
            <View style={{width: '70%', height: 35}}>
              <TextInput style={{width: 250, borderWidth: 1, borderRadius: 10}} />
            </View>
          </View>

          <View style={styles.wrappItem}>
            <View style={{width: '30%'}}>
              <Text style={styles.label}>Thông tin</Text>
            </View>
            <View style={{width: '70%', height: 35}}>
              <TextInput style={{width: 250, borderWidth: 1, borderRadius: 10}} />
            </View>
          </View>

          {/*Size */}
          {checked == '2' ? (
            <View style={styles.wrappItem}>
              <View style={{width: '30%'}}>
                <Text style={styles.label}>Kích cỡ</Text>
              </View>

              <View style={{width: '70%', height: 35, flexDirection:'row'}}>
                <Checkbox
                    status={sizeM ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setSizeMChecked(!sizeM);
                    }}
                  />
                  <Text style={styles.checkbox}>M</Text>
                  <Checkbox
                    status={sizeL ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setSizeLChecked(!sizeL);
                    }}
                  />
                  <Text style={styles.checkbox}>L</Text>
                  <Checkbox
                    status={sizeXL ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setSizeXLChecked(!sizeXL);
                    }}
                  />
                  <Text style={styles.checkbox}>XL</Text>
                  <Checkbox
                    status={sizeXXL ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setSizeXXLChecked(!sizeXXL);
                    }}
                  />
                  <Text style={styles.checkbox}>XXL</Text>
              </View>
            </View>
          ) : null}

          {/*Màu sắc */}

          <View style={styles.wrappItem}>
            <View style={{width: '30%'}}>
              <Text style={styles.label}>Màu sắc</Text>
            </View>
            <View style={{width: '70%', height: 35}}>
              <TextInput style={{width: 250, borderWidth: 1, borderRadius: 10}} />
            </View>
          </View>

          {/*Ảnh sản phẩm*/}

          <View style={styles.wrappUpload}>
            <Text style={{textAlign: 'center', fontSize: 17, fontWeight: '700', marginTop: 10}}>Ảnh sản phẩm </Text>
            <Text style={{fontSize: 14, fontStyle:'italic', textDecorationLine:'underline', textAlign:'center'}}>(Tối đa 6 ảnh)</Text>
              <View style={{marginTop: 10,}}>
                {/** <ViewPhoto/>*/}
              {  (listIMG.length === 0) &&
                <TouchableNativeFeedback onPress={choosePhotoFromLibrary}>
                  <View
                    style={{
                      width: '25%',
                      height: 95,
                      marginLeft: 20,
                      marginTop: 10,
                      borderWidth: 1,
                      borderColor: '#000000AA',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 20,
                      backgroundColor: '#ffff'
                    }}>
                    <Icon name='camera' size={28} color='black'/>
                  </View>
                </TouchableNativeFeedback>
                }

              {  (listIMG.length >= 1 && listIMG.length <= 5) &&
              <View
                style={{
                  flexDirection: 'row',
                  height: '90%',
                  flexWrap: 'wrap',
                }}>
                {listIMG.map((e, index) => (
                  <View
                    style={styles.wrappIMG} key={index}>
                    <Image
                      source={{uri: e}}
                      style={{width:'100%', height: '100%', resizeMode: 'cover'}}
                      key={index}
                    />
                    <TouchableNativeFeedback onPress={()=>onDelete(e)}>
                    <Image
                      style={{
                        position: 'absolute',
                        width: 20,
                        height: 25,
                        marginLeft: '78%',
                        marginTop: 5,
                      }}
                      source={deleteIcon}
                    /></TouchableNativeFeedback>
                  </View>
                ))}
                <TouchableNativeFeedback onPress={choosePhotoFromLibrary}>
                  <View
                  style={{
                    width: '25%',
                    height: 95,
                    marginLeft: 15,
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: '#000000AA',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    backgroundColor: '#ffff'
                  }}>
                  <Icon name='camera' size={28} color='black'/>
                </View>
              </TouchableNativeFeedback>
              </View>
              }

            {  (listIMG.length == 6)&&
              <View
                style={{
                  flexDirection: 'row',
                  height: '90%',
                  flexWrap: 'wrap',
                }}>
                {listIMG.map((e, index) => (
                  <View
                    style={styles.wrappIMG} key={e}>
                    <Image
                      source={{uri: e}}
                      style={{width:'100%', height: '100%', resizeMode: 'cover'}}
                      key={index}
                    />
                    <TouchableNativeFeedback onPress={()=>onDelete(e)}>
                    <Image
                      style={{
                        position: 'absolute',
                        width: 20,
                        height: 25,
                        marginLeft: '78%',
                        marginTop: 5,
                      }}
                      source={deleteIcon}
                    /></TouchableNativeFeedback>
                  </View>
                ))}
              </View>
            }

            { (listIMG.length > 6) && (Alert.alert('Thông báo!','Chỉ chọn tối đa 6 ảnh.'))}

            </View>
          </View>

          {/*Màu sắc */}

        </View>
      </View>

      <View style={{flex: 0.6}}>
        <View style={styles.wrappButton}>
          <View style={{width: '50%', height: 35, alignItems: 'center'}}>
            <View style={{width: '90%'}}>
              <Button title="Nhập mới" />
            </View>
          </View>

          <View style={{width: '50%', height: 35, alignItems: 'center'}}>
            <View style={{width: '90%'}}>
              <Button title="Lưu" onPress={submitImg}/>
            </View>
          </View>
        </View>
      </View>

    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  wrappItem: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 7,
  },
  wrappUpload: {
    width: '100%',
  },
  wrappButton: {
    flexDirection: 'row',
    //backgroundColor:'green'
  },
  label: {
    fontSize: 15,
    marginLeft: 5,
    textAlign: 'left',
    fontWeight: '700',
  },
  wrappListIMG: {
    top: 2,
  },
  imageThumbnail: {
    height: '100%',
    width: '100%',
  },
  wrappIMG: {
    //flex: 1,
    backgroundColor: '#fff',
    padding: 2,
    marginVertical: 2,
    marginHorizontal: 5,
    width: '31.2%',
    height: 105,
    borderRadius: 5,
    borderColor:'#009387',
    borderWidth: 1,
    marginLeft: '0.8%',
    //position:'relative'
  },
  labelRadioBtn: {
    justifyContent:'center',
    marginTop: 7
  },
  checkbox: {
    fontSize: 17,
    marginTop: 7,
  },
});
