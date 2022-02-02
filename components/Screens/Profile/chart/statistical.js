import React, {useEffect, useState} from 'react'
import { LogBox, StyleSheet, Text, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import formatCash from '../../API/ConvertPrice';


const statisticalScreen = () => {

const [listOrder,setListOrder] = useState([]);
const [listOrderMonth,setListOrderMonth] = useState([]);
const [listOrderYear,setListOrderYear] = useState([]);
const [countMonth,setCountMonth] = useState(0);
const [countYear,setCountYear] = useState(0);
const [cashMonth,setMonthCash]= useState(0);
const [cashYear,setCashYear]= useState(0);


const d = new Date();
let month = (d.getMonth() +1)+'';
let year = d.getFullYear();

const [selectedMonth, setSelectedMonth] = useState(month);
const [selectedYear, setSelectedYear] = useState(year);

let a = selectedMonth < 10 ? "0" +selectedMonth : selectedMonth;
let thisMon = ''+d.getFullYear()+'-'+ a;
console.log("Năm hiện tại: ",selectedYear);
console.log("Picker lựa chọn tháng: ",selectedMonth);

 const getYYDD = (data)=> {
    const event = new Date(data);
    //console.log(event.toString());
    //console.log("convert IOS",event.toISOString().slice(0,7));
    return event.toISOString().slice(0,7)
 }

 const getDay = (data)=> {
    const event = new Date(data);
    //console.log(event.toString());
    //console.log("convert day",event.toISOString().slice(0,10));
    return event.toISOString().slice(0,9)
 }

 const getYear = (data)=> {
    const event = new Date(data);
    //console.log(event.toString());
    //console.log("convert Year",event.toISOString().slice(0,4));
    return event.toISOString().slice(0,4)
 }

 let thisDay =()=> {
    let day = [];
    
    for(let i = 0; i < listOrder.length; i++)
    {
        if(getDay(listOrder[i].dateTime.toDate().toISOString()) == selectedYear && listOrder[i].orderStatus !== 'Đã hủy đơn hàng' && listOrder[i].orderStatus !== 'Giao hàng thất bại')
        {
            //console.log("Data:",getYYDD(listOrder[i].dateTime.toDate().toISOString())); 
            day.push(listOrder[i]);
        }
    }
    return day;
}

let day = thisDay();

//  let thisYear =()=> {
//     let Year = [];
    
//     for(let i = 0; i < listOrder.length; i++)
//     {
//         if(getYear(listOrder[i].dateTime.toDate().toISOString()) == selectedYear && listOrder[i].orderStatus !== 'Đã hủy đơn hàng' && listOrder[i].orderStatus !== 'Giao hàng thất bại')
//         {
//             //console.log("Data:",getYYDD(listOrder[i].dateTime.toDate().toISOString())); 
//             Year.push(listOrder[i]);
//         }
//     }
//     return Year;
// }

// let inYear = thisYear();
// console.log("Đơn trong năm:",inYear.length);
// let inYearCash = 0;
// inYear.map((e,index)=> inYearCash += e.total);

let thisMonth =()=> {
    console.log('chạy hàm lọc tháng.')
    let Month = [];
    let fillter = [];
    let count = 0;
    let cash = 0;
    for(let i = 0; i < listOrder.length; i++)
    {
        if(getYYDD(listOrder[i].dateTime.toDate().toISOString()) == thisMon && listOrder[i].orderStatus !== 'Đã hủy đơn hàng' && listOrder[i].orderStatus !== 'Giao hàng thất bại')
        {
            //console.log("Data:",getYYDD(listOrder[i].dateTime.toDate().toISOString())); 
            count++;
            fillter.push(listOrder[i].order)
            cash += listOrder[i].total;
        }
    }
    setListOrderMonth(fillter);
    setCountMonth(count);
    setMonthCash(cash);
    console.log("số đơn trong tháng ",count);
}

let thisYear =()=> {
    console.log('chạy hàm lọc năm.')
    let fillter = [];
    let count = 0;
    let cash = 0;
    for(let i = 0; i < listOrder.length; i++)
    {
        if(getYear(listOrder[i].dateTime.toDate().toISOString()) == selectedYear && listOrder[i].orderStatus !== 'Đã hủy đơn hàng' && listOrder[i].orderStatus !== 'Giao hàng thất bại')
        {
            //console.log("Data:",getYYDD(listOrder[i].dateTime.toDate().toISOString())); 
            count++;
            fillter.push(listOrder[i].order)
            cash += listOrder[i].total;
        }
    }
    setListOrderYear(fillter);
    setCountYear(count);
    setCashYear(cash);
    console.log("số đơn trong năm ",count);
}

// const filterByProduct =()=>{
//     let listOrder = [];
//     inMonth.map(order => listOrder.push(order.order))
//     return listOrder;
// }

// let order = filterByProduct();

// console.log(order);

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

      thisMonth();
      thisYear();
    LogBox.ignoreLogs([
      "Can't perform a React state update on an unmounted component.",
    ]);
    return () => subscriber();
  }, [thisMon,selectedYear]);


    const listMonth = [];
        for (let i = 1; i <= d.getMonth()+1; i++) {
            listMonth.push(<Picker.Item key={i} value={i.toString()} label={i.toString()} />);}
    
    const listYear = [];
        for (let i = d.getFullYear(); i >= 2021; i--) {
            listYear.push(<Picker.Item key={i} value={i.toString()} label={i.toString()} />);}

    return (
        <View style={{flex:1}}>
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
                        <Text style={{fontSize: 18, marginTop: 15}}>{formatCash(cashMonth)} VNĐ</Text>
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
                        <Text style={{fontSize: 18, marginTop: 15}}>{formatCash(cashYear)} VNĐ</Text>
                        <Text style={{fontSize: 15, marginTop: 5}}>Tổng tiền</Text>
                    </LinearGradient>

                </View>
            </View>
        </View>
    )
}

export default statisticalScreen

const styles = StyleSheet.create({})
