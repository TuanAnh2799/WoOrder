import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

const Comment = ({comment,replies}) => {
  return (
    <View
      style={{flexDirection: 'row', width: '94%', marginLeft: '3%', marginTop: 10}}
      key={comment.idComment}>
      <View style={{width: '15%', height: 50, borderRadius: 100, marginTop: 5}}>
        <Image
          style={{width: '100%', height: '100%', borderRadius: 100}}
          source={{uri: comment.avatar}}
        />
      </View>
      <View style={{width: '85%'}}>
        <View
          style={{
            marginLeft: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '75%'}}>
            <Text style={{fontSize: 15, fontWeight: '700'}}>{comment.name}</Text>
          </View>

          <View style={{width: '25%'}}>
            <Text style={{fontSize: 12, textAlign:'right'}}>{comment.createAt.toDate().toLocaleDateString('en-GB').replace( /(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3")}</Text>
          </View>
        </View>
        <View style={{marginLeft: 10, width: '95%'}}>
          <Text style={{flexWrap: 'wrap-reverse', fontSize: 15}}>
            {comment.comment}
          </Text>
        </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 5,
              width: '55%',
            }}>
            <View>
              <Text style={{fontSize: 14, fontStyle: 'italic'}}>Trả lời</Text>
            </View>
            <View>
              <Text style={{fontSize: 14, fontStyle: 'italic'}}>Sửa</Text>
            </View>
            <View>
              <Text style={{fontSize: 14, fontStyle: 'italic'}}>Xóa</Text>
            </View>
          </View>

            {
              replies.length > 0 && (
                <View>
                  {
                    replies.map( reply => (
                      <Comment comment={reply} key={reply.idComment} replies={[]}/>
                    ))
                  }
                </View>
              )
            }
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({});
{/* {
                                listReply?.map(rep => (
                                  {
                                    rep.parentRoot == e.idComment ? (
                                      <View>
                                        <View style={{flexDirection:'row', width: '94%', marginLeft:'3%'}} key={rep.idComment}>
                                          <View style={{width: '20%', height: 70, borderRadius: 100, marginTop: 5}}>
                                            <Image style={{width: '100%', height:'100%', borderRadius:100}}
                                            source={{uri:rep.avatar}}/>
                                          </View>
                                          <View style={{width: '80%'}}>

                                            <View style={{marginLeft: 10, flexDirection:'row', justifyContent:'space-between'}}>
                                              <View style={{width: '70%'}}>
                                                <Text style={{fontSize: 15, fontWeight: '700'}}>{rep.name}</Text>
                                              </View>
                                              
                                              <View style={{width: '30%'}}>
                                                <Text>7/01/2022</Text>
                                              </View>
                                            </View>
                                            <View style={{marginLeft: 10, width: '95%',}}>
                                              <Text style={{flexWrap:'wrap-reverse', fontSize: 15}}>{rep.comment}</Text>
                                            </View>

                                              <View style={{flexDirection:'row', justifyContent:'space-around', marginTop: 5,width: '55%'}}>
                                                <View>
                                                  <Text style={{fontSize:14, fontStyle:'italic'}}>Trả lời</Text>
                                                </View>
                                                <View>
                                                  <Text style={{fontSize:14, fontStyle:'italic'}}>Sửa</Text>
                                                </View>
                                                <View>
                                                  <Text style={{fontSize:14, fontStyle:'italic'}}>Xóa</Text>
                                                </View>
                                              
                                              </View>

                                          </View>
                                        </View>
                                      </View>
                                    ) : null
                                  }
                                ))
                              } */}