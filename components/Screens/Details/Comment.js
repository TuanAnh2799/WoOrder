import React from 'react';
import {Text, View, Image, StyleSheet, Alert} from 'react-native';
import CommentForm from './CommentForm';


const Comment = ({comment, replies, onDelete, addReply,editComment, userid, activeComment, setActiveComment,isAdmin, parentId = null}) => {
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createAt) > fiveMinutes;
  const canReply = Boolean(userid);
  const canEdit = userid === comment.idUser && !timePassed;
  const canDelete = userid === comment.idUser && !timePassed  || isAdmin == true;
  const createAt = comment.createAt.toDate().toLocaleDateString('en-GB').replace(/(\d{2})[-/](\d{2})[-/](\d+)/, '$2/$1/$3');
  const isReplying = activeComment && activeComment.type ==="replying" && activeComment.id === comment.idComment;
  const isEditing = activeComment && activeComment.type ==="editing" && activeComment.id === comment.idComment;
  const replyId = parentId ? parentId : comment.idComment;
  
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '94%',
        marginLeft: '3%',
        marginTop: 10,
      }}
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
            <Text style={{fontSize: 15, fontWeight: '700'}}>
              {comment.name}
            </Text>
          </View>

          <View style={{width: '25%'}}>
            <Text style={{fontSize: 12, textAlign: 'right'}}>
              {createAt}
            </Text>
          </View>
        </View>
        <View style={{marginLeft: 10, width: '95%'}}>
          {
            !isEditing && 
            <Text style={{flexWrap: 'wrap-reverse', fontSize: 15}}>
              {comment.comment}
            </Text>
          }
          {
            isEditing && <CommentForm
            initialText = {comment.comment}
            handleSubmit={(text) => editComment(text,comment.idComment)}
            setActiveComment={setActiveComment}
            submitLabel="Cập nhật"/>
          }
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 5,
            width: '50%',
          }}>
          <View>
            {
              canReply && <Text onPress={()=> {
                setActiveComment({id: comment.idComment, type: "replying"})
              }} style={{fontSize: 14,}}>Trả lời</Text>
            }
          </View>
          <View>
            {
              canEdit && <Text onPress={()=> {
                setActiveComment({id: comment.idComment, type: "editing"})
              }} style={{fontSize: 14, }}>Sửa</Text>
            }
          </View>
          <View>
            {
              canDelete && <Text onPress={()=>{
                Alert.alert(
                  "Xác nhận",
                  "Bạn muốn xóa?",
                  [
                    {
                      text: "Đồng ý",
                      onPress: () => onDelete(comment.idComment),
                      style: "cancel"
                    },
                    { text: "HỦY", onPress: () => console.log("OK Pressed") }
                  ]
                );
                
              }} style={{fontSize: 14, }}>Xóa</Text>
            }
          </View>

        </View>

        {
            isReplying && (
              <CommentForm 
              handleSubmit={(text) => addReply(text,replyId)}
              setActiveComment={setActiveComment}
              initialText=''
              holder = 'Trả lời bình luận ...'
              submitLabel="Trả lời"/>
            )
          }
          {/* {
            isEditing && (
              <CommentForm 
              setActiveComment={setActiveComment}
              holder = 'Chỉnh sửa ...'
              initialText={comment.comment}
              handleSubmit={(text) => editComment(text,comment.idComment)}
              submitLabel="Cập nhật"/>
            )
          } */}
          
        {replies.length > 0 && (
          <View>
            {replies.map(reply => (
              <Comment 
              comment={reply} 
              userid={userid} 
              key={reply.idComment} 
              addReply={addReply}
              editComment={editComment}
              onDelete={onDelete}
              parentId={comment.idComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              isAdmin={isAdmin}
              replies={[]} />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({});
