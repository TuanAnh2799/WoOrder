import React from 'react';
import {Text, View, Image, StyleSheet, Alert} from 'react-native';
import CommentForm from './CommentForm';
import convertDate from '../API/convertDate';
import getDay from '../API/getDay';


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
    <View style={styles.wrapCMT} key={comment.idComment}>
      <View style={styles.wrapAvatar}>
        <Image style={styles.avatar} source={{uri: comment.avatar}} />
      </View>
      <View style={{width: '85%'}}>
        <View
          style={styles.wrapRow1}>
          <View style={{width: '70%'}}>
            <Text style={{fontSize: 15, fontWeight: '700'}}>
              {comment.name}
            </Text>
          </View>

          <View style={{width: '30%'}}>
            <Text style={{fontSize: 12, textAlign: 'right'}}>
              {convertDate(getDay(comment.createAt.toDate().toISOString()))}
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
            submitLabel="C???p nh???t"/>
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
              }} style={{fontSize: 14,}}>Tr??? l???i</Text>
            }
          </View>
          <View>
            {
              canEdit && <Text onPress={()=> {
                setActiveComment({id: comment.idComment, type: "editing"})
              }} style={{fontSize: 14, }}>S???a</Text>
            }
          </View>
          <View>
            {
              canDelete && <Text onPress={()=>{
                Alert.alert(
                  "X??c nh???n",
                  "B???n mu???n x??a?",
                  [
                    {
                      text: "?????ng ??",
                      onPress: () => onDelete(comment.idComment),
                      style: "cancel"
                    },
                    { text: "H???Y", onPress: () => console.log("OK Pressed") }
                  ]
                );
                
              }} style={{fontSize: 14, }}>X??a</Text>
            }
          </View>

        </View>

        {
            isReplying && (
              <CommentForm 
              handleSubmit={(text) => addReply(text,replyId)}
              setActiveComment={setActiveComment}
              initialText=''
              holder = 'Tr??? l???i b??nh lu???n ...'
              submitLabel="Tr??? l???i"/>
            )
          }
          {/* {
            isEditing && (
              <CommentForm 
              setActiveComment={setActiveComment}
              holder = 'Ch???nh s???a ...'
              initialText={comment.comment}
              handleSubmit={(text) => editComment(text,comment.idComment)}
              submitLabel="C???p nh???t"/>
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

const styles = StyleSheet.create({
  wrapCMT: {
    flexDirection: 'row',
    width: '94%',
    marginLeft: '3%',
    marginTop: 10,
  },
  wrapAvatar: {
    width: '15%',
    height: 50,
    borderRadius: 100,
    marginTop: 5
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100
  },
  wrapRow1: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
