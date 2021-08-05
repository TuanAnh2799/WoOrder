import React from 'react';
import { Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Logout from '../../../img/logout.png';

const Home = ({navigation}) => {
    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.wraptitle}>
                <Text style={styles.title}>Dash Board</Text>
            </View>
            <View style={styles.wrapInfo}>
                <View style={styles.wrapName}>
                    <Text style={styles.text1}>User Name:</Text>
                    <Text style={styles.text2}>Tuấn Anh</Text>
                </View>
                <View style={styles.wrapPhone}>
                    <Text style={styles.text1}>Phone Number:</Text>
                    <Text style={styles.text2}>01236969xxx</Text>
                </View>
                <View style={styles.logout}>
                    <TouchableOpacity style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 16}}>Logout</Text>
                        <Image source={Logout} style={{width: 20, height: 20, marginLeft: 6}}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.wrapTask}>
                <View style={styles.taskCss}>
                    <TouchableOpacity>
                        <View style={styles.task}>
                            <View style={styles.taskInfo}>
                                <Text style={styles.textTaskTitle}>Task</Text>
                                <Text>10</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>navigation.navigate('Complete')}>
                        <View style={styles.task}>
                            <View style={styles.completeInfo}>
                                <Text style={styles.textTaskTitle}>Complete</Text>
                                <Text>15</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('Remaining')}>
                    <View style={styles.Remaining}>
                        <Text style={styles.textTaskTitle}>Remaining</Text>
                        <Text>55</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
            
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    wraptitle: {
        flex: 0.3,
        backgroundColor: 'white',
        borderBottomWidth: 1,
    },
    title: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 25,
        fontStyle: 'italic',
    },
    wrapInfo:{
        flex: 1,
        top: 10,
        borderWidth: 0.5,
        borderRadius: 10,
        width: '96%',
        marginLeft: '2%',
    },
    wrapName: {
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    wrapPhone: {
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    wrapTask: {
        width: '96%',
        marginLeft: '2%',
        flex: 5,
        paddingTop: 10,
        marginTop: 20,
        borderWidth: 0.5,
        borderRadius: 10,
        
    },

    taskCss: {
        flexDirection: 'row',
        alignItems:'flex-start',
        justifyContent:'space-around',
    },
    logout:{
        flexDirection: 'row',
        justifyContent:'flex-end',
        width: 85,
        right: 10,
        borderRadius: 5,
        justifyContent: 'center',
        height: 27,
        alignSelf: 'flex-end',
        backgroundColor: 'green',
        top: 5,
    },
    text1: {
        marginTop: 12,
        fontSize: 17,
        width: '35%',
        marginLeft: '5%',

    },
    text2: {
        marginTop: 12,
        fontSize: 17,
        marginLeft: '5%',
        width: '60%',

    },
    taskInfo:{
        borderRadius: 5,
        borderWidth: 0.5,
        width: Dimensions.get('window').width / 2.5,
        height: 120,
        top: 10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'pink',
    },
    completeInfo:{
        borderRadius: 5,
        borderWidth: 0.5,
        width: Dimensions.get('window').width / 2.5,
        height: 120,
        top: 10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'green'
    },
    Remaining:{
        borderRadius: 5,
        borderWidth: 0.5,
        width: Dimensions.get('window').width / 2.5,
        height: 120,
        top: 30,
        left: '4%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'gray',
    },
    textTaskTitle: {
        fontSize: 20,
    },
});
export default Home


