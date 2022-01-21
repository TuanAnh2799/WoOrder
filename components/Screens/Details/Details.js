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
import {AddCart, setFavorite, AddToFavorite} from '../../Store/action';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import formatCash from '../API/ConvertPrice';
import firestore from '@react-native-firebase/firestore';
import Comment from './Comment';
import Share from 'react-native-share';


const deviceWitdh = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

LogBox.ignoreLogs(["Can't perform a React state update on an unmounted component."]);

function DetailsScreen({route, navigation, AddCart, setFavorite,AddToFavorite}) {

  const userid = useSelector(state => state.userState.User);
  const isAdmin = useSelector(state => state.userState.isAdmin);
  const listFavorites = useSelector(state => state.favourites.favoriteProduct);
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
  const [colors, setColor] = useState('black');

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

  const customShare = async url => {
      const shareOptions = {
        message: 'Tải ngay app để order nhé!',
        url: url,
      };
      try {
        const shareRespone = await Share.open(shareOptions);
      } catch (error) {
        console.log(error);
      }
    };


  const Fav =()=> {
    if(listFavorites.includes(id) == true)
    {
      setColor('red');
    }
    else {
      setColor('black');
    }
  }

  const dataLike =()=> {
    try {
      firestore()
        .collection('Users')
        .doc(userid)
        .update({
          favorites: listFavorites
          
        })
        .then(() => {
          console.log('Data khi like to firebase: ',listFavorites);
        })
        .catch(error => {
          console.log(
            'Something went wrong with added post to firestore.',
            error,
          );
        });
    } catch (error) {
      console.log(error);
    }
  }
  const dataUnLike =()=> {
    let x = listFavorites.filter(e => {
      return e !== id;
    })
    try {
      firestore()
        .collection('Users')
        .doc(userid)
        .update({
          favorites: x
          
        })
        .then(() => {
          console.log('Data khi UnLike to firebase: ',x);
        })
        .catch(error => {
          console.log(
            'Something went wrong with added post to firestore.',
            error,
          );
        });
    } catch (error) {
      console.log(error);
    }
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
      Fav();
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
        console.log('Comment deleted!',id);
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
      
    <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.wrapInfo}>
          <View style={styles.wrapDetail}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 17}}> </Text>
              <Text style={{fontSize: 22, fontWeight: 'bold', marginLeft: 2}}>
                {name}
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Icon name="cart-outline" size={25} color="red"/>
              <Text style={{marginLeft: '2%', fontSize: 18, textShadowColor: 'black', textShadowRadius: 1}}>
                {formatCash(price)}
              </Text>
              <Text style={{color:'green', fontWeight:'700', marginLeft: 5}}>VNĐ</Text>
            </View>

          </View>

          <View style={{marginLeft: 20, marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, marginTop: 3}}>Màu sắc: </Text>
              <View style={{width:'70%', flexWrap:'wrap', flexDirection:'row', marginLeft: 15}}>
                  {color.map((e, index) => (
                  <View style={{marginTop:1,  height: 25, backgroundColor:'#f1f1f1', marginLeft: 5, borderRadius: 10, shadowColor:'black', elevation:5}} key={index}>
                    <Text key={index} style={{marginLeft: 7, fontSize: 15, marginRight: 7}}>{e}</Text>
                  </View>
                  
                ))}
              </View>
              
            </View>

            <View>
              {size.length > 1 ? (
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <View>
                    <Text style={{fontSize: 16}}>Kích thước:</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    {size.map((e, index) => (
                      <View style={{width: 45, height: 25, justifyContent:'center', alignItems:'center',backgroundColor:'#f1f1f1', marginLeft: 10, borderRadius: 10, shadowColor:'black', elevation:5}} key={index}>
                        <Text key={index} style={{fontSize: 15}}>{e}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ) : (
                <View></View>
              )}
            </View>

            {/**Chi tieest inffo */}
            <View style={{marginTop: 10, width:'100%'}}>
              <View style={{width: '98%'}}>
                <View style={{width: '20%'}}>
                  <Text style={{fontSize: 16}}>Chi tiết:</Text>
                </View>
                
              </View>

              <View style={{width: '90%', borderWidth: 0.5, marginLeft: '2%', backgroundColor:'#f1f1f1',marginTop: 5, borderRadius: 20, padding:18, shadowColor:'black', elevation: 5}}>
                  {splitInfo.map((e, index) => (
                    <Text key={index} style={{fontSize: 16, textAlign: 'left'}}>
                      {e}
                    </Text>
                  ))}
                </View>

            </View>

            <View style={{marginTop: 30, height: 100}}>
              <View style={{width: '60%', marginLeft: '20%'}}>
              {
                isAdmin == true? (
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
        
        <View style={{width: '100%', marginTop: 120}}></View>
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

              <View style={{flex: 7, marginTop: 20}}>
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                  <View style={{marginTop: 15, marginLeft: 30}}>
                    <Text>Chọn màu sắc:</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 35,
                      borderWidth: 1,
                      borderColor: 'black',
                      justifyContent:'center', alignItems:'center'
                    }}>
                    <Picker
                      style={{height: 30, width: 120, padding: 1}}
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
                          justifyContent:'center',
                        }}>
                        <Picker
                          style={{height: 45, width: 120}}
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

      {/*Icon #000000AA */}
      <View style={{
        width: 40, height: 150,position:'absolute', 
        justifyContent:'center', alignItems:'center', marginTop:deviceHeight * 0.4,
        marginLeft:deviceWitdh * 0.88}}>
        <View >
          <Icon name="cards-heart" size={35} color={colors} onPress={()=> {
            if(colors == 'red'){
              setColor('black');
              AddToFavorite(id);
              dataUnLike();
            }

            if(colors == 'black'){
              setColor('red');
              AddToFavorite(id);
              dataLike();
            }

          }}/>
        </View>
        <View style={{marginTop: 15}}>
          <Icon name="chat-processing-outline" size={35} color="red" onPress={()=>{
          setModalCMT(true)}}/>
        </View>
        <Text style={{textAlign:'center', fontSize: 13}}>{fillterProduct?.length}</Text>
        <View style={{marginTop: 12}}>
          <Icon name="share" size={35} color="#023556" onPress={()=> customShare(url[0])}/>
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
                    <View style={{width:'82%',justifyContent:'center', alignItems:'center', marginLeft:'10%'}}>
                      {fillterProduct?.length > 0 ? 
                      (<Text style={{fontSize: 14}}>{fillterProduct.length} bình luận</Text>)
                      : (<Text style={{fontSize: 17}}>Bình luận</Text>)}
                    </View>
                    <View style={{width:'8%',justifyContent:'center', marginRight: 5}}>
                      <TouchableWithoutFeedback onPress={()=>setModalCMT(!modalCMT)}>
                        <Text style={{fontSize: 17}}>X</Text>
                        {/* <Image source={deleteIcon} style={{width: 25, height: 25}}/> */}
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
                      <Icon name="send" size={35} color={newComment.length >0 ? "orange" : "black"}  onPress={()=>{
                        if(newComment !== '' )
                        {
                          addComment();
                        }
                        else if(newComment.length > 100) {
                          ToastAndroid.show('Chỉ nhập tối đa 100 ký tự!', ToastAndroid.SHORT);
                        }
                        else if(newComment == '')
                        {
                          ToastAndroid.show('Chưa nhập bình luận.', ToastAndroid.SHORT);
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
    setFavorite: data => dispatch(setFavorite(data)),
    AddToFavorite: id => dispatch(AddToFavorite(id)),
  };
}


export default connect(mapDispatchToProps, {AddCart,setFavorite, AddToFavorite})(DetailsScreen);
