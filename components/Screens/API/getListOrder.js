import firestore from '@react-native-firebase/firestore';
import React, { useState }from 'react';


export const [myOrder, setMyOrder] = useState([]);

export const getListOrder = async () => {
    const subscriber = await firestore()
      .collection('Orders')
      // Filter results
      .where('orderStatus', '==', 'Đang chờ xử lý')
      .get()
      .then(querySnapshot => {
        const myorder = [];

        querySnapshot.forEach(documentSnapshot => {
          myorder.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setLoading(false);
        setMyOrder(myorder);

      });

      //UserAddress();

    return () => subscriber();
  };
