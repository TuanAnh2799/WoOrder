import auth from '@react-native-firebase/auth';

const forgotPassword = async(email)=> {
    try {
        auth().sendPasswordResetEmail(email).then(()=>console.log('Done'));
    } catch (error) {
        console.log(error);
        
    }
    
}

export default forgotPassword;
