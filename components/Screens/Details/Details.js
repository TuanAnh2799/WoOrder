import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  Button,
  Dimensions,
  Modal,
  Alert,
  TouchableNativeFeedback,
  TextInput,
  TouchableWithoutFeedback,
  ToastAndroid,
  LogBox,
} from 'react-native';
import {connect} from 'react-redux';
import {AddCart} from '../../Store/action';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import formatCash from '../API/ConvertPrice';
import { FlatList } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import Comment from './Comment';
import FormComment from './CommentForm';


const deviceWitdh = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

LogBox.ignoreLogs(["Can't perform a React state update on an unmounted component."]);

function DetailsScreen({route, navigation, AddCart}) {

  const userid = useSelector(state => state.userState.User);
  const id = route.params.product.id;
  const name = route.params.product.name;
  const color = route.params.product.color;
  const url = route.params.product.url;
  const price = route.params.product.price;
  const info = route.params.product.info;
  const type = route.params.product.type;
  const size = route.params.product.size;
  const items = route.params.product;

  const [modalOpen, setOpenModal] = useState(false);
  const [imgActive, setImgActive] = useState(0);
  const [modalCMT, setModalCMT] = useState(false);
  const [selectedColor, setSelectedColor] = useState(color[0]);
  const [selectedSize, setSelectedSize] = useState(size[0]);
  const [userInfo, setUserInfo] = useState([]);
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [activeComment, setActiveComment] = useState(null)

  const fillterProduct =comments?.filter(e => {
      return e.idSP == id;
    })

  const rootComment = fillterProduct?.filter(fillterProduct => {
      return fillterProduct.parentRoot == '';
    });

  const listReplyComment = fillterProduct?.filter(fillterProduct => {
      return fillterProduct.parentRoot !== '';
    });

  const getReplies =(idComment)=>{
      return  listReplyComment?.filter(listReplyComment => listReplyComment.parentRoot === idComment)
      .sort(
        (a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
      );
    } 

  useEffect(async () => {
    const subscriber = await firestore()
      .collection('Comments')
      .onSnapshot(querySnapshot => {
        const cmt = [];

        querySnapshot.forEach(documentSnapshot => {
          cmt.push({
            ...documentSnapshot.data(),
            //key: documentSnapshot.id,
          });
        });
        setComments(cmt);
      });
      getUserInfo();
    return () => subscriber();
  }, []);

  
  const getUserInfo =()=> {
    firestore()
      .collection('UserAddress')
      .doc(userid)
      .onSnapshot(documentSnapshot => {
        
        setUserInfo(documentSnapshot.data());
      });
  }

  var ID = function () {
    return 'TA_' + Math.random().toString(36).substr(2, 5);
  };
  

const addComment =()=> {
  
  const IdChat = ID();
  const datetime = new Date();
  console.log("Data insert: "+IdChat,id,userInfo.fullname,userInfo.avatar,datetime,newComment,userid);
  try {
    firestore()
      .collection('Comments')
      .doc(IdChat)
      .set({
        idComment: IdChat,
        idSP:id,
        name: userInfo.fullname,
        parentRoot: '',
        avatar: userInfo.avatar,
        createAt: datetime,
        comment: newComment,
        idUser: userid,
        
      })
      .then(() => {
        setNewComment('');
        console.log('Comment Added!');
        ToastAndroid.show(
          'Thành công!.',
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
  } catch (error) {
    console.log(error);
  }
}

const getChild = (idParent)=> {
  let data = listReplyComment.filter(rep => {
    return rep.parentRoot == idParent;
  })
  return data;
}
const onDelete =async(id) => {

  const child = getChild(id);
  console.log("List child comment: ",child);
  if(child.length == 0)
  {
    try {
      firestore()
      .collection('Comments')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Comment deleted!');
        ToastAndroid.show('Xóa thành công!.', ToastAndroid.SHORT);
      });
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Xóa thất bại!.', ToastAndroid.SHORT);
    }
  }
  else {
    let i = 0;
    try {
      firestore()
      .collection('Comments')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Comment deleted!');
        ToastAndroid.show('Xóa thành công!.', ToastAndroid.SHORT);
      });

      try {
        while (i <= child.length)
        {
          firestore()
          .collection('Comments')
          .doc(child[i].idComment)
          .delete()
          .then(() => {
            console.log('Child comment deleted!');
            //ToastAndroid.show('Xóa thành công!.', ToastAndroid.SHORT);
          });
          i++;
        }
      } catch (error) {
        
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Xóa thất bại!.', ToastAndroid.SHORT);
    }
  }
  
  
}


const addReply =(text,idRoot)=>{
  console.log("comment:",text," id gốc: ",idRoot);
  const IdChat = ID();
  const datetime = new Date();
  console.log("add reply data: "+"idComment: ",IdChat," id sản phẩm: ",id,userInfo.fullname,userInfo.avatar,datetime,text,userid, " parentRoot: ",idRoot);
  try {
    firestore()
      .collection('Comments')
      .doc(IdChat)
      .set({
        idComment: IdChat,
        idSP:id,
        name: userInfo.fullname,
        parentRoot: idRoot,
        avatar: userInfo.avatar,
        createAt: datetime,
        comment: text,
        idUser: userid,
        
      })
      .then(() => {
        setNewComment('');
        console.log('Reply Added!');
        ToastAndroid.show(
          'Thành công!.',
          ToastAndroid.SHORT,
        );
      })
      .catch(error => {
        console.log(
          'Something went wrong with added post to firestore.',
          error,
        );
        ToastAndroid.show('Thất bại!.', ToastAndroid.SHORT);
      });
  } catch (error) {
    console.log(error);
  }
}

const editComment =(text,id)=>{
  console.log('ID chỉnh sửa:',id, ' Nội dung: ',text);
  try {
    firestore()
      .collection('Comments')
      .doc(id)
      .update({
        comment: text,
      })
      .then(() => {
        console.log('Edit success!');
        ToastAndroid.show('Sửa thành công!.', ToastAndroid.SHORT);
      });
  } catch (error) {
    console.log('Edit thất bại!');
    ToastAndroid.show('Thất bại!.', ToastAndroid.SHORT);
  }
}

  const splitInfo = info.split('.');

  const closeModal = () => {
    setOpenModal(false);
  };

  const openModal = () => {
    setOpenModal(true);
  };
  
  const onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide !== imgActive) {
        setImgActive(slide);
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({nativeEvent}) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}>
          {url.map((e, index) => (
            <Image
              key={index}
              resizeMode="contain"
              style={styles.wrap}
              source={{uri: e}}
            />
          ))}
        </ScrollView>
        <View style={styles.wrapDot}>
          {url.map((e, index) => (
            <Text
              key={e}
              style={
                imgActive === index ? styles.isActive : styles.isNotActive
              }>
              ●
            </Text>
          ))}
        </View>
      </View>

      {/**Thong tin sản phẩm */}
      <ScrollView>
        <View style={styles.wrapInfo}>
          <View style={styles.wrapDetail}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 17}}>Sản phẩm: </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 2}}>
                {name}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={{fontSize: 17}}>Giá:</Text>
              <Text style={{marginLeft: '13%', fontSize: 16}}>
                {formatCash(price)} VNĐ
              </Text>
            </View>
          </View>
          <View style={{marginLeft: 20, marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 17}}>Màu sắc: </Text>
              {color.map((e, index) => (
                <Text key={index} style={{marginLeft: 7, fontSize: 16}}>
                  {e}
                </Text>
              ))}
            </View>

            <View>
              {size.length > 1 ? (
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <View>
                    <Text style={{fontSize: 17}}>Size:</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    {size.map((e, index) => (
                      <Text
                        key={index}
                        style={{
                          marginHorizontal: 5,
                          fontSize: 16,
                          marginLeft: 45,
                        }}>
                        {e}
                      </Text>
                    ))}
                  </View>
                </View>
              ) : (
                <View></View>
              )}
            </View>

            {/**Chi tieest inffo */}
            <View style={{marginTop: 10}}>
              <View style={{width: '98%', flexDirection: 'row'}}>
                <View style={{width: '20%'}}>
                  <Text style={{fontSize: 17}}>Chi tiết:</Text>
                </View>
                
              </View>

              <View style={{width: '90%', backgroundColor:'green'}}>
                  {splitInfo.map((e, index) => (
                    <Text key={index} style={{fontSize: 16, textAlign: 'left'}}>
                      {e}
                    </Text>
                  ))}
                </View>

            </View>

            <View style={{marginTop: 30}}>
              <View style={{width: '60%', marginLeft: '20%'}}>
              {
                userid == '6d1OQZfciSaMqv3azVASuPtQnaV2'? (
                  <View></View>) : (
                    <Button
                    title="Mua ngay"
                    onPress={() => {
                      openModal();
                    }}
                  />
                  )
              }
                
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/**Modal pickup */}

      <Modal
        visible={modalOpen}
        animationType={'fade'}
        transparent={true}
        onRequestClose={closeModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000AA',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: deviceHeight * 0.5,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}>
            <View style={{flex: 2}}>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  Mua sản phẩm
                </Text>
              </View>

              <View style={{flex: 7, marginTop: 30}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginTop: 15, marginLeft: 30}}>
                    <Text>Chọn màu sắc:</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 35,
                      borderWidth: 1,
                      borderColor: 'black',
                    }}>
                    <Picker
                      style={{height: 45, width: 150, padding: 5}}
                      selectedValue={selectedColor}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedColor(itemValue)
                      }>
                      {color.map((e, index) => (
                        <Picker.Item label={e} value={e} key={index} />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View style={{marginTop: 20}}>
                  {size.length > 1 ? (
                    <View style={{flexDirection: 'row'}}>
                      <View style={{marginTop: 15, marginLeft: 30}}>
                        <Text>Chọn kích cỡ:</Text>
                      </View>
                      <View
                        style={{
                          marginLeft: 45,
                          borderWidth: 1,
                          borderColor: 'black',
                          alignItems: 'center',
                        }}>
                        <Picker
                          style={{height: 40, width: 150}}
                          selectedValue={selectedSize}
                          onValueChange={(itemValue, itemIndex) =>
                            setSelectedSize(itemValue)
                          }>
                          {size.map((e, index) => (
                            <Picker.Item label={e} value={e} key={index} />
                          ))}
                        </Picker>
                      </View>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>

                <View
                  style={{width: '90%', marginLeft: '5%', marginTop: '15%'}}>
                  <Text>
                    Lưu ý: Sau khi bấm "Đặt mua" bạn không thể thay đổi kích
                    thước và màu sắc.
                  </Text>
                </View>
              </View>
              <View style={styles.modalWrappButton}>
                <View style={{width: '40%', marginTop: 5}}>
                  <Button title="Hủy" onPress={() => closeModal()} />
                </View>
                <View style={{width: '40%', marginTop: 5}}>
                  <Button
                    title="Đặt mua"
                    onPress={() => {
                      if (type === 2) {
                        let _item = {
                          id: id,
                          //quantity:1,
                          name: name,
                          url: url,
                          price: price,
                          type: type,
                          color: selectedColor,
                          size: selectedSize,
                          //info: info,
                        };
                        AddCart(_item);
                        //console.log('Thong tin hàng mua: ',_item);
                        navigation.navigate('Đặt hàng');
                      } else {
                        let _item1 = {
                          id: id,
                          //quantity:1,
                          name: name,
                          url: url,
                          price: price,
                          type: type,
                          color: selectedColor,
                          size: '',
                          //info: info,
                        };
                        AddCart(_item1);
                        //console.log('Thong tin hàng mua loại 1 3: ',_item1);
                        navigation.navigate('Đặt hàng');
                      }
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/*Icon */}
      <View style={{
        width: 40, height: 150,position:'absolute', 
        justifyContent:'center', alignItems:'center', marginTop:deviceHeight * 0.4,
        marginLeft:deviceWitdh * 0.88}}>
        <View >
        <Icon name="heart" size={35} color="#000000AA" />
        </View>
        <View style={{marginTop: 15}}>
        <Icon name="comment" size={35} color="red" onPress={()=>{
          setModalCMT(true)}}/>
        </View>
        <Text style={{textAlign:'center', fontSize: 13}}>{fillterProduct?.length}</Text>
        <View style={{marginTop: 12}}>
        <Icon name="share" size={35} color="red" />
        </View>
      </View>

        {/**Modal chat */}
      <Modal
        visible={modalCMT}
        animationType={'fade'}
        transparent={true}
        onRequestClose={!modalCMT}>
        <TouchableNativeFeedback onPress={()=>setModalCMT(!openModal)}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000AA',
              justifyContent: 'flex-end',
            }}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  height: deviceHeight * 0.65,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                }}>
                <View style={{flex: 1}}>

                  <View style={{flex: 0.5, justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                    <View style={{width:'85%',justifyContent:'center', alignItems:'center', marginLeft:'7%'}}>
                      {fillterProduct?.length > 0 ? 
                      (<Text style={{fontSize: 14}}>{fillterProduct.length} bình luận</Text>)
                      : (<Text style={{fontSize: 17}}>Bình luận</Text>)}
                    </View>
                    <View style={{width:'8%',justifyContent:'center'}}>
                      <TouchableWithoutFeedback onPress={()=>setModalCMT(!modalCMT)}>
                        <Text style={{textAlign:'left', fontSize: 17, color:'red'}}>X</Text>
                      </TouchableWithoutFeedback>
                      
                    </View>
                  </View>

                  <View style={{flex: 8.5}}>
                  {fillterProduct?.length <= 0 ? 
                  (<View style={{flex: 1,justifyContent:'center', alignItems:'center'}}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                      <Text>Chưa có bình luận nào</Text>
                      <Text>Hãy là người đầu tiên bình luận cho sản phẩm này</Text>
                    </View>
                  </View>)
                  : 
                  (<View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {
                        rootComment.map((rootComment) => (
                            <Comment key={rootComment.idComment} 
                            onDelete={onDelete} 
                            userid={userid} 
                            comment={rootComment} 
                            activeComment={activeComment}
                            setActiveComment={setActiveComment}
                            addReply={addReply}
                            editComment={editComment}
                            isAdmin={userInfo.isAdmin}
                            replies={getReplies(rootComment.idComment)}/>
                        ))
                      }
                    </ScrollView>
                    
                  </View>)}
                  </View>

                  <View style={{flex: 1.2,flexDirection:'row',alignItems:'center'}}>
                    <View style={{width: '83%', height:'70%', borderColor:'black', borderWidth: 0.5, marginLeft:'2%', borderRadius: 20, alignContent:'center'}}>
                      <View>
                        <TextInput placeholder='Hãy để lại bình luận của bạn...'
                          value={newComment}
                          onChangeText={(text) => setNewComment(text)}
                        />
                      </View>
                    </View>
                    <View style={{width: '15%', height:'90%',justifyContent:'center', alignItems:'center'}}>
                      <Icon name="send" size={35} color="blue"  onPress={()=>{
                        if(newComment !== '' && newComment.length <= 100)
                        {
                          addComment();
                        }
                        else {
                          ToastAndroid.show('Chỉ nhập tối đa 100 ký tự!.', ToastAndroid.SHORT);
                        }
                      }}/>
                    </View>
                  </View>

                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableNativeFeedback>
      </Modal>
      {/** End Modal chat */}

    </SafeAreaView>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    AddCart: item => dispatch(AddCart(item)),
  };
}

export default connect(mapDispatchToProps, {AddCart})(DetailsScreen);
