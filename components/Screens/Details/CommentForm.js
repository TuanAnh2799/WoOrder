import React, {useState} from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'

const CommentForm = ({ handleSubmit, submitLabel,setActiveComment,initialText, holder }) => {

    const [text, setText] = useState(initialText);
    const isDisabled = text.length === 0;

    return (
        <View style={{width:'100%', marginTop: 5}}>
            <View style={{width:'100%', height: 40, borderColor:'black', borderWidth:0.5, borderRadius:10}}>
            <TextInput placeholder={holder}
                value={text}
                onChangeText={(text) => setText(text)}
                />
            </View>
            <View style={{flexDirection:'row', width:'100%', justifyContent:'space-around', marginTop: 12, height: 35}}>
                <View style={{width:'35%', height: '100%'}}>
                    <Button title={submitLabel} disabled={isDisabled} onPress={() => {
                        if(text !== ''){
                            setActiveComment(null);
                            handleSubmit(text);
                        }
                    }}/>
                </View>
                <View style={{ width:'25%', height: '100%'}}>
                    <Button title='Hủy' onPress={()=>setActiveComment(null)}/>
                </View>
            </View>
        </View>
    )
}

export default CommentForm

const styles = StyleSheet.create({})
