import firestore from '@react-native-firebase/firestore';
import React, { useContext, useState }from 'react';
import { AuthContext } from '../../Routes/AuthProvider';


export const [myOrder, setMyOrder] = useState([]);

const {user} = useContext(AuthContext);

export const addToFav = async (array) => {
    const x = await firestore()
    .collection('Favorites')
    .doc(user.uid)
    .set({
      id: user.uid,
      listFav: array,
      
    })
  };
