import React, {useEffect, useState} from 'react'
import { LogBox, ScrollView, StyleSheet, Text, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import formatCash from '../../API/ConvertPrice';


const statisticalScreen = () => {

const [listOrder,setListOrder] = useState(null);
const [type1, setType1] = useState(0); //do cong nghe
const [type2, setType2] = useState(0); //do thơi trang
const [type3, setType3] = useState(0); //do do chơi

const [typeY1, setTypeY1] = useState(0); //do cong nghe theo năm
const [typeY2, setTypeY2] = useState(0); //do thơi trang theo năm
const [typeY3, setTypeY3] = useState(0); //do do chơi theo năm

const [countMonth,setCountMonth] = useState(0);
const [countYear,setCountYear] = useState(0);


const d = new Date();
let month = (d.getMonth() +1)+'';
let year = d.getFullYear();

const [selectedMonth, setSelectedMonth] = useState(month);
const [selectedYear, setSelectedYear] = useState(year);

let a = selectedMonth < 10 ? "0" +selectedMonth : selectedMonth;
let thisMon = ''+d.getFullYear()+'-'+ a;

 const getYYDD = (data)=> {
    const event = new Date(data);
    return event.toISOString().slice(0,7)
 }

 const getDay = (data)=> {
    const event = new Date(data);
    return event.toISOString().slice(0,9)
 }

 const getYear = (data)=> {
    const event = new Date(data);
    return event.toISOString().slice(0,4)
 }

 let thisDay =()=> {
    let day = [];
    
    if(listOrder != null){
        for(let i = 0; i < listOrder.length; i++)
    {
        if(getDay(listOrder[i].dateTime.toDate().toISOString()) == selectedYear && listOrder[i].orderStatus !== 'Đã hủy đơn hàng' && listOrder[i].orderStatus !== 'Giao hàng thất bại')
        {
            day.push(listOrder[i]);
        }
    }
    }
    return day;
}

let day = thisDay();

let thisMonth =()=> {
    if(listOrder != null){
    let count = 0;
    let congnghe = 0;
    let thoitrang = 0;
    let dochoi = 0;

    for(let i = 0; i < listOrder.length; i++)
    {
        if(getYYDD(listOrder[i].dateTime.toDate().toISOString()) == thisMon && listOrder[i].orderStatus !== 'Đã hủy đơn hàng' && listOrder[i].orderStatus !== 'Giao hàng thất bại')
        {
            count++;
            listOrder[i].order.map( e => {
                if(e.type == 1){
                    congnghe += e.price * e.quantity;
                }
                if(e.type == 2){
                    thoitrang += e.price * e.quantity;
                }
                if(e.type == 3){
                    dochoi += e.price * e.quantity;
                }
            });
        }
    }
    setType1(congnghe);
    setType2(thoitrang);
    setType3(dochoi);
    setCountMonth(count);
   }  
}

const thisYear =()=> {
    if(listOrder != null)
    {
        let count = 0;
        let congnghe = 0;
        let thoitrang = 0;
        let dochoi = 0;
        for(let i = 0; i < listOrder.length; i++)
        {
            if(getYear(listOrder[i].dateTime.toDate().toISOString()) == selectedYear && listOrder[i].orderStatus !== 'Đã hủy đơn hàng' && listOrder[i].orderStatus !== 'Giao hàng thất bại')
            {
                count++;
                listOrder[i].order.map( e => {
                    if(e.type == 1){
                        congnghe += e.price * e.quantity;
                    }
                    if(e.type == 2){
                        thoitrang += e.price * e.quantity;
                    }
                    if(e.type == 3){
                        dochoi += e.price * e.quantity;
                    }
                });
            }
        }
        setTypeY1(congnghe);
        setTypeY2(thoitrang);
        setTypeY3(dochoi);
        setCountYear(count);
    }
    
}

useEffect(async () => {
    const subscriber = await firestore()
      .collection('Orders')
      .onSnapshot(querySnapshot => {
        const order = [];

        querySnapshot.forEach(documentSnapshot => {
            order.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setListOrder(order);
         
      });
        LogBox.ignoreLogs([
      "Can't perform a React state update on an unmounted component.",
    ]);

    
    return () => subscriber();
    
  }, []);

  useEffect(async () => {

    if(listOrder != null)
        {
            thisMonth();
            thisYear();
        }   
    
  }, [thisMon,selectedYear,listOrder]);

    const listMonth = [];
        for (let i = 1; i <= d.getMonth()+1; i++) {
            listMonth.push(<Picker.Item key={i} value={i.toString()} label={i.toString()} />);}
    
    const listYear = [];
        for (let i = d.getFullYear(); i >= 2021; i--) {
            listYear.push(<Picker.Item key={i} value={i.toString()} label={i.toString()} />);}

    return (
        <View style={{width: '100%', height: '100%'}}>
            <ScrollView style={{flex: 1}}>
                <View style={{flex:1.2}}>
                    <View style={{width: '80%', justifyContent:'center', alignItems:'center', marginLeft:'10%',height: 40,marginTop:10, borderColor:'#fff', backgroundColor:'#fff',borderWidth: 0.5, borderRadius: 10, shadowColor:'black', elevation: 5 }}>
                        <Text style={{fontSize: 18, marginBottom: 10, marginTop: 5}}>Trong ngày</Text>
                    </View>

                    <View style={{width: '100%', flexDirection:'row', justifyContent:'space-around', marginTop: 10}}>
                        <LinearGradient colors={['#ffff', 'yellow', '#fff']} style={{width: '40%',height: 100,justifyContent:'center', alignItems:'center', borderRadius: 10}}>
                            <Text style={{fontSize: 30}}>15</Text>
                            <Text style={{fontSize: 15}}>Đơn hàng</Text>
                        </LinearGradient>

                        <LinearGradient colors={['red', 'white', 'green']} style={{width: '40%', height: 100,justifyContent:'center', alignItems:'center', borderRadius: 10}}>
                            <Text style={{fontSize: 18, marginTop: 15}}>14.000.000 VNĐ</Text>
                            <Text style={{fontSize: 15, marginTop: 5}}>Tổng tiền</Text>
                        </LinearGradient>

                    </View>

                </View>

                <View style={{flex:2,}}>
                    <View style={{width: '80%', justifyContent:'center', alignItems:'center', backgroundColor:'#fff',marginLeft:'10%', borderWidth: 0.5, borderColor:'#fff',borderRadius: 10, shadowColor:'black', elevation: 5}}>
                        <Text style={{fontSize: 18, marginBottom: 10, marginTop: 5}}>Tháng</Text>
                    </View>

                    <View style={{flexDirection:'row', alignItems:'center', marginLeft:'50%', marginTop: 20, marginBottom: 10}}>
                        <View>
                            <Text style={{fontSize: 17, }}>Tháng: </Text>
                        </View>
                        <View style={{width: 100, borderWidth: 0.5, height: 35, justifyContent:'center', borderRadius: 10}}>
                            <Picker
                                style={{height: 35, width: 100, padding: 5}}
                                selectedValue={selectedMonth}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedMonth(itemValue)
                                }>
                                {listMonth}
                            </Picker>
                        </View>
                    </View>

                    <View style={{width: '100%', flexDirection:'row', justifyContent:'space-around'}}>
                        <LinearGradient colors={['#ffff', 'yellow', '#fff']} style={{width: '40%',height: 100,justifyContent:'center', alignItems:'center', borderRadius: 10}}>
                            <Text style={{fontSize: 30}}>{countMonth}</Text>
                            <Text style={{fontSize: 15}}>Đơn hàng</Text>
                        </LinearGradient>

                        <LinearGradient colors={['red', 'white', 'green']} style={{width: '40%', height: 100,justifyContent:'center', alignItems:'center', borderRadius: 10}}>
                            <Text style={{fontSize: 18, marginTop: 15}}>{formatCash(type1 + type2 +type3)} VNĐ</Text>
                            <Text style={{fontSize: 15, marginTop: 5}}>Tổng tiền</Text>
                        </LinearGradient>

                    </View>
                </View>

                <View style={{flex:2,}}>
                    <View style={{width: '80%', justifyContent:'center', alignItems:'center', backgroundColor:'#fff',marginLeft:'10%', borderWidth: 0.5, borderColor:'#fff',borderRadius: 10, shadowColor:'black', elevation: 5}}>
                        <Text style={{fontSize: 18, marginBottom: 10, marginTop: 5}}>Năm</Text>
                    </View>

                    <View style={{flexDirection:'row', alignItems:'center', marginLeft:'50%', marginTop: 20, marginBottom: 10}}>
                        <View>
                            <Text style={{fontSize: 17, }}>Năm: </Text>
                        </View>
                        <View style={{width: 120, borderWidth: 0.5, height: 35, justifyContent:'center', borderRadius: 10}}>
                            <Picker
                                style={{height: 35, width: 120, padding: 5}}
                                selectedValue={selectedYear}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedYear(itemValue)
                                }>
                                {listYear}
                            </Picker>
                        </View>
                    </View>

                    <View style={{width: '100%', flexDirection:'row', justifyContent:'space-around'}}>
                        <LinearGradient colors={['#ffff', 'yellow', '#fff']} style={{width: '40%',height: 100,justifyContent:'center', alignItems:'center', borderRadius: 10}}>
                            <Text style={{fontSize: 30}}>{countYear}</Text>
                            <Text style={{fontSize: 15}}>Đơn hàng</Text>
                        </LinearGradient>

                        <LinearGradient colors={['red', 'white', 'green']} style={{width: '40%', height: 100,justifyContent:'center', alignItems:'center', borderRadius: 10}}>
                            <Text style={{fontSize: 18, marginTop: 15}}>{formatCash(typeY1 + typeY2 + typeY3)} VNĐ</Text>
                            <Text style={{fontSize: 15, marginTop: 5}}>Tổng tiền</Text>
                        </LinearGradient>

                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default statisticalScreen

const styles = StyleSheet.create({})
