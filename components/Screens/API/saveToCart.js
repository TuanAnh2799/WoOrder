import AsyncStorage from '@react-native-async-storage/async-storage';

const saveCart = async (cartArray) => {

    //const jsonValue = JSON.stringify(cartArray);
    await AsyncStorage.setItem('@cart', JSON.stringify(cartArray));
    console.log('save data:',JSON.stringify(cartArray));
};

export default saveCart;