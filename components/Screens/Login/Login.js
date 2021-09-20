import React,{useContext} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, Image } from 'react-native'
import Banner from '../../../img/banner.jpg';
import { AuthContext } from '../../Routes/AuthProvider';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginScreen = ({navigation}) => {
    const {login} = useContext(AuthContext);
    //const [email, onChangeEmail] = React.useState("");
    //const [password, onChangePass] = React.useState("");

    const loginValidSchema = Yup.object().shape({
        email: Yup.string().email('Vui lòng nhập địa chỉ email').required('Bạn chưa nhập địa chỉ email.').matches(
            /(?=.*[@gmail.com])/,"Nhập sai định dạng @gmail.com"),
        password: Yup.string().min(6,({ min }) => `Mật khẩu phải lớn hơn ${min-1} ký tự`).max(10,({ max }) => `Mật khẩu tối đa ${max} ký tự` )
        .required('Bạn chưa nhập mật khẩu.').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "Mật khẩu phải lớn hơn 5 ký tự, bao gồm viết hoa, viết thường, chữ số và ký tự."),
      });

    return (
        <SafeAreaView style={{flex: 1, flexDirection: 'row'}}>
            <Formik
                validationSchema={loginValidSchema}
                initialValues={{ email: '', password:'' }}
                validateOnMount={true}
                onSubmit={values => console.log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                    <View style={{flex: 1,height:'100%'}}>
                        <View style={styles.bannerWrapp}>
                            <Image source={Banner} style={styles.banner}/>
                        </View>
                        <View style={styles.Input}>
                            <View style={styles.input1}>
                                <Text style={styles.text}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    placeholder="Nhập địa chỉ email..."
                                    keyboardType="email-address"
                                />
                                {
                                    (errors.email && touched.email) && <Text style={{fontSize: 12, color:'red', marginLeft:'5%'}}>{errors.email}</Text>
                                }
                            </View>
                            <View>
                                <Text style={styles.text}>Mật khẩu</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    placeholder="Nhập mật khẩu..."
                                    secureTextEntry={true}
                                />
                                {
                                    (errors.password && touched.password) && <Text style={{fontSize: 12, color:'red', marginLeft:'5%'}}>{errors.password}</Text>
                                }
                            </View>
                            <View style={styles.wrapButton}>
                                <View style={styles.button}>
                                    <Button title="Đăng nhập"  disabled={!isValid}
                                    onPress={() => login(values.email,values.password)}/>
                                    <Text style={{padding: 15, fontSize: 17, textAlign:'center'}}>Need an account?</Text>
                                    <Button title="Đăng ký" onPress={()=>navigation.navigate('Register')} />
                                </View>
                            </View>
                        </View>
                    </View>
                    )}
            </Formik>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    bannerWrapp: {
        width: '100%',
        flex: 2,
    },
    banner: {
        width: '100%',
        height: '100%',
    },
    Input: {
        width: '100%',
        backgroundColor: 'white',
        flex: 3,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        top: -25,
    },
    wrapButton:{
        flex: 1,
        backgroundColor: 'white',
        top: 30,
    },
    button: {
        width: '90%',
        marginLeft: '5%',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 5,
      },
      input1:{
        paddingTop: 40,
      },
      text: {
          fontSize: 17,
          left: 10,
          marginTop: 3,
      }
});
export default LoginScreen;