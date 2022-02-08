import React, {useEffect, useState} from 'react'
import { LogBox, ScrollView, StyleSheet, Text, View ,Button} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import formatCash from '../../API/ConvertPrice';
import {PieChart} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const screenWidth = Dimensions.get("window").width;

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

const [date, setDate] = useState(new Date());
const [show, setShow] = useState(false);

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
    return event.toISOString().slice(0,10)
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
        if(getDay(listOrder[i].dateTime.toDate().toISOString()) == getDay(date) && listOrder[i].orderStatus !== 'Đã hủy đơn hàng' && listOrder[i].orderStatus !== 'Giao hàng thất bại')
        {
            day.push(listOrder[i]);
        }
    }
    }
    return day;
}

let day = thisDay();

function convertDate (s) {
    let arr =s.split('-');
    let day = arr[2]+"-"+arr[1]+"-"+arr[0];
    return day;
}

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

const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const openDate = () => {
    setShow(true);
  };

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

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const data = [
        {
          name: "Công nghệ",
          population: type1,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Thời trang",
          population: type2,
          color: "green",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Đồ chơi",
          population: type3,
          color: "orange",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        
      ];

      const data2 = [
        {
          name: "Công nghệ",
          population: typeY1,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Thời trang",
          population: typeY2,
          color: "green",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Đồ chơi",
          population: typeY3,
          color: "orange",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        
      ];

console.log("Picker: ",date);
    return (
        <View style={{width: '100%', height: '100%'}}>
            <ScrollView style={{flex: 1}}>
                <View>
                    <View style={{width: '80%', justifyContent:'center', alignItems:'center', marginLeft:'10%',height: 40,marginTop:10, borderColor:'#fff', backgroundColor:'#fff',borderWidth: 0.5, borderRadius: 10, shadowColor:'black', elevation: 5 }}>
                        <Text style={{fontSize: 18, marginBottom: 10, marginTop: 5}}>Trong ngày</Text>
                    </View>

                    <View style={{width: '100%', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', marginTop: 10}}>
                        <View style={{marginRight: 10}}>
                            <Text style={{fontSize: 17, }}>Chọn ngày</Text>
                        </View>
                        <View style={{marginRight: 30}}>
                            <Icon name="calendar-month" color="#FF6347" size={30} onPress={openDate} />
                        </View>
                    </View>
                    {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        display="calendar"
                        onChange={onChange}
                        />
                    )}
                    <View style={{width: '96%', height: 200, backgroundColor:'#fff',shadowColor:'black', elevation:5 , marginLeft:'2%', marginTop: 10, borderTopLeftRadius: 100, borderBottomRightRadius: 100}}>
                        {
                            day.length <= 0 ?  
                            (<View style={{width: '100%', height: '100%', justifyContent:'center', alignItems:'center'}}>
                                <Text style={{fontSize: 17, bottom: 10}}>{convertDate(getDay(date))}</Text>
                                <Icon name="emoticon-sad-outline" color="#FF6347" size={80} />
                                <Text style={{fontSize: 18, color:'green', fontWeight: '700'}}>Không có đơn hàng nào :(((</Text>
                            </View>)
                            :
                            (<View style={{width: '100%', height: '100%'}}>
                                <View style={{width: '100%', justifyContent:'center', alignItems:'center', bottom: -20}}>
                                    <Text style={{fontSize: 17}}>{convertDate(getDay(date))}</Text>
                                </View>
                                <View style={{width: '100%', height: '100%', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                                    <View style={{width:'38%', height: 100, backgroundColor:'rgb(135,206,235)', shadowColor:'black', elevation:5 , borderTopLeftRadius: 50, borderBottomRightRadius: 50, justifyContent:'center', alignItems:'center'}}>
                                        <Text style={{fontSize: 30}}>{day.length}</Text>
                                        <Text style={{fontSize: 15}}>Đơn hàng</Text>
                                    </View>
                                    <View style={{width:'50%', height: 100, backgroundColor:'orange',shadowColor:'black', elevation:5 , borderTopLeftRadius: 50, borderBottomRightRadius: 50, justifyContent:'center', alignItems:'center' }}>
                                        <Text style={{fontSize: 18, marginTop: 15, color:'black'}}>14.000.000 VNĐ</Text>
                                        <Text style={{fontSize: 15, marginTop: 5}}>Tổng tiền</Text>
                                    </View>
                                </View>
                            </View>)
                        }
                    </View>

                </View>

                <View style={{marginTop: 20}}>
                    <View style={styles.wrappContentMonth}>
                        <Text style={{fontSize: 18, marginBottom: 10, marginTop: 5}}>Tháng</Text>
                    </View>

                    <View style={{flexDirection:'row', alignItems:'center', marginLeft:'42%', marginTop: 20, marginBottom: 10}}>
                        <View>
                            <Text style={{fontSize: 17, }}>Chọn tháng: </Text>
                        </View>
                        <View style={styles.wrapPickerMonth}>
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
                        <LinearGradient colors={['#2974FA', '#38ABFD', '#43D4FF']} style={{width: '40%',height: 100,justifyContent:'center', alignItems:'center', borderRadius: 10}}>
                            <Text style={{fontSize: 30, color:'white'}}>{countMonth}</Text>
                            <Text style={{fontSize: 15, color:'black'}}>Đơn hàng</Text>
                        </LinearGradient>

                        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{width: '40%', height: 100,justifyContent:'center', alignItems:'center', borderRadius: 10}}>
                            <Text style={{fontSize: 18, marginTop: 15, color:'white'}}>{formatCash(type1 + type2 +type3)} VNĐ</Text>
                            <Text style={{fontSize: 15, marginTop: 5, color:'white'}}>Tổng tiền</Text>
                        </LinearGradient>

                    </View>

                    <PieChart
                        data={data}
                        width={screenWidth}
                        style={{marginTop: 10}}
                        height={220}
                        chartConfig={chartConfig}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"10"}
                        center={[5, -10]}
                        absolute={false}
                        />

                    <View style={{width: '100%', alignItems:'center'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                            <View style={styles.wrappMonth1}>
                                <Text style={styles.textCashMonth}>{formatCash(type1)}<Text style={{color:'white', marginRight:5, fontWeight:'700', marginLeft: 5}}>  VNĐ</Text></Text>
                            </View>
                            <View style={styles.wrappMonth2}>
                                <Text style={styles.textCashMonth}>{formatCash(type2)}<Text style={{color:'white', marginRight:5, fontWeight:'700', marginLeft: 5}}>  VNĐ</Text></Text>
                            </View>
                        </View>
                        <View style={styles.wrappMonth3}>
                            <Text style={styles.textCashMonth}>{formatCash(type3)}<Text style={{color:'white', marginRight:5, fontWeight:'700', marginLeft: 5}}>  VNĐ</Text></Text>
                        </View>
                    </View>

                </View>

                <View style={{marginTop: 30,}}>
                    <View style={styles.wrappContentYear}>
                        <Text style={{fontSize: 18, marginBottom: 10, marginTop: 5}}>Năm</Text>
                    </View>

                    <View style={{flexDirection:'row', alignItems:'center', marginLeft:'40%', marginTop: 20, marginBottom: 10}}>
                        <View>
                            <Text style={{fontSize: 17, }}>Chọn năm: </Text>
                        </View>
                        <View style={styles.wrapPickerYear}>
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
                        <LinearGradient colors={['#2974FA', '#38ABFD', '#43D4FF']} style={{width: '40%',height: 100,justifyContent:'center', alignItems:'center', borderRadius: 10}}>
                            <Text style={{fontSize: 30, color:'white'}}>{countYear}</Text>
                            <Text style={{fontSize: 15, color:'black'}}>Đơn hàng</Text>
                        </LinearGradient>

                        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{width: '40%', height: 100,justifyContent:'center', alignItems:'center', borderRadius: 10}}>
                            <Text style={{fontSize: 18, marginTop: 15, color:'white'}}>{formatCash(typeY1 + typeY2 + typeY3)} VNĐ</Text>
                            <Text style={{fontSize: 15, marginTop: 5, color: 'white'}}>Tổng tiền</Text>
                        </LinearGradient>

                    </View>

                    <PieChart
                        data={data2}
                        width={screenWidth}
                        style={{marginTop: 10}}
                        height={220}
                        chartConfig={chartConfig}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"10"}
                        center={[5, -10]}
                        absolute={false}
                        />

                    <View style={{width: '100%', alignItems:'center'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                            <View style={styles.wrappYear1}>
                                <Text style={{color: 'white', fontSize: 17}}>{formatCash(typeY1)}<Text style={styles.textYear}>  VNĐ</Text></Text>
                            </View>
                            <View style={styles.wrappYear2}>
                                <Text style={{color: 'white', fontSize: 17}}>{formatCash(typeY2)}<Text style={styles.textYear}>  VNĐ</Text></Text>
                            </View>
                        </View>
                        <View style={styles.wrappYear3}>
                            <Text style={{color: 'white', fontSize: 17}}>{formatCash(typeY3)}<Text style={styles.textYear}>  VNĐ</Text></Text>
                        </View>
                    </View>
                    <View style={{height: 55}}>

                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default statisticalScreen

const styles = StyleSheet.create({
    //css year
    wrappYear1: {
        width: '45%',
        backgroundColor: "red",
        height: 40, alignItems:'center',
        justifyContent:'center',
        borderRadius: 10,
    },
    wrappYear2: {
        width: '45%',
        backgroundColor: 'green',
        height: 40,
        borderRadius: 10,
        marginLeft: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    wrappYear3: {
        width: '45%',
        backgroundColor: 'orange',
        marginTop: 5,
        height: 40,
        borderRadius: 10,
        marginLeft: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    textYear: {
        color:'white',
        marginRight:5,
        fontWeight:'700',
        marginLeft: 5
    },
    wrappContentYear: {
        width: '80%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        marginLeft:'10%',
        borderWidth: 0.5,
        borderColor:'#fff',
        borderRadius: 10,
        shadowColor:'black',
        elevation: 5
    },
    wrapPickerYear: {
        width: 120,
        borderWidth: 0.5,
        height: 35,
        justifyContent:'center',
        borderRadius: 10
    },
    //end css year

    // css month
    wrappMonth1: {
        width: '45%',
        backgroundColor: "red",
        height: 40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 10
    },
    wrappMonth2: {
        width: '45%',
        backgroundColor: 'green',
        height: 40,
        borderRadius: 10,
        marginLeft: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    wrappMonth3: {
        width: '45%',
        backgroundColor: 'orange',
        marginTop: 5,
        height: 40,
        borderRadius: 10,
        marginLeft: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    textCashMonth: {
        color: 'white',
        fontSize: 17
    },
    wrapPickerMonth: {
        width: 100,
        borderWidth: 0.5,
        height: 35,
        justifyContent:'center',
        borderRadius: 10
    },
    wrappContentMonth: {
        width: '80%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        marginLeft:'10%',
        borderWidth: 0.5,
        borderColor:'#fff',
        borderRadius: 10,
        shadowColor:'black',
        elevation: 5
    },
    
})
