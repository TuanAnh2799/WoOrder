import React from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import deleteIcon from '../../../../img/Delete.png';

const AddProduct = () => {
  const [checked, setChecked] = React.useState('1'); //type
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [size, setSize] = React.useState([]);
  const [info, setInfo] = React.useState('');
  const [color, setColor] = React.useState([]);

  const IMG = [
    {
      id: '1',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyK7V1AdfXQbdMX8zXx-aM85Q0YFAfimD_8OYLWQWrc5rrFpeXAv9aJe9bs3SG7y7vgHM&usqp=CAU',
    },
    {
      id: '2',
      url: 'https://anhgaisexy.com/wp-content/uploads/2021/05/20210425-le-bong-2-600x800.jpg',
    },
    {
      id: '3',
      url: 'https://anhgaisexy.com/wp-content/uploads/2021/05/20210425-le-bong-2-600x800.jpg',
    },
    {
      id: '1',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyK7V1AdfXQbdMX8zXx-aM85Q0YFAfimD_8OYLWQWrc5rrFpeXAv9aJe9bs3SG7y7vgHM&usqp=CAU',
    },
    {
      id: '2',
      url: 'https://anhgaisexy.com/wp-content/uploads/2021/05/20210425-le-bong-2-600x800.jpg',
    },
    {
      id: '3',
      url: 'https://anhgaisexy.com/wp-content/uploads/2021/05/20210425-le-bong-2-600x800.jpg',
    },
    
  ];
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 9.5}}>
        <View style={styles.wrappItem}>
          <View style={{width: '30%'}}>
            <Text style={styles.label}>Tên sản phẩm</Text>
          </View>
          <View style={{width: '70%', height: 35}}>
            <TextInput style={{width: 250, borderWidth: 1, borderRadius: 10}} />
          </View>
        </View>

        {/*Loại sản phẩm */}

        <View style={styles.wrappItem}>
          <View style={{width: '20%'}}>
            <Text style={styles.label}>Loại:</Text>
          </View>
          <View>
            <View style={{width: '80%', height: 35, flexDirection: 'row'}}>
              <RadioButton
                value="1"
                status={checked === '1' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('1')}
              />
              <Text style={styles.labelRadioBtn}>Công nghệ</Text>

              <RadioButton
                value="2"
                status={checked === '2' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('2')}
              />
              <Text style={styles.labelRadioBtn}>Thời trang</Text>

              <RadioButton
                value="3"
                status={checked === '3' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('3')}
              />
              <Text style={styles.labelRadioBtn}>Đồ chơi</Text>
            </View>
          </View>
        </View>

        <View style={styles.wrappItem}>
          <View style={{width: '30%'}}>
            <Text style={styles.label}>Giá sản phẩm</Text>
          </View>
          <View style={{width: '70%', height: 35}}>
            <TextInput style={{width: 250, borderWidth: 1, borderRadius: 10}} />
          </View>
        </View>

        <View style={styles.wrappItem}>
          <View style={{width: '30%'}}>
            <Text style={styles.label}>Màu sắc</Text>
          </View>
          <View style={{width: '70%', height: 35}}>
            <TextInput style={{width: 250, borderWidth: 1, borderRadius: 10}} />
          </View>
        </View>

        <View style={styles.wrappItem}>
          <View style={{width: '30%'}}>
            <Text style={styles.label}>Thông tin</Text>
          </View>
          <View style={{width: '70%', height: 35}}>
            <TextInput style={{width: 250, borderWidth: 1, borderRadius: 10}} />
          </View>
        </View>

        {/*Size */}
        {checked == '2' ? (
          <View style={styles.wrappItem}>
            <View style={{width: '30%'}}>
              <Text style={styles.label}>Kích cỡ</Text>
            </View>
            <View style={{width: '70%', height: 35}}>
              <TextInput
                style={{width: 250, borderWidth: 1, borderRadius: 10}}
              />
            </View>
          </View>
        ) : null}

        {/*Màu sắc */}

        <View style={styles.wrappItem}>
          <View style={{width: '30%'}}>
            <Text style={styles.label}>Màu sắc</Text>
          </View>
          <View style={{width: '70%', height: 35}}>
            <TextInput style={{width: 250, borderWidth: 1, borderRadius: 10}} />
          </View>
        </View>

        {/*Ảnh sản phẩm*/}

        <View style={styles.wrappUpload}>
          <Text style={{textAlign: 'center', fontSize: 17, fontWeight: '700', marginTop: 10}}>Ảnh sản phẩm </Text>
          <Text style={{fontSize: 14, fontStyle:'italic', textDecorationLine:'underline', textAlign:'center'}}>(Tối đa 6 ảnh)</Text>
          <View style={{marginTop: 10}}>
            <FlatList
              data={IMG}
              renderItem={({item,index}) => (
                <View style={styles.wrappIMG} key={index}>
                  <View>
                    <Image style={{width:'100%', height: '100%',}} source={{uri: item.url}}/>
                    <Image style={{position:'absolute',width:23, height: 26, marginLeft:'75%',marginTop: 2}} source={deleteIcon}/>
                  </View>
                    
                </View>
              )}
              //Setting the number of column
              keyExtractor={(item, index) => index}
              numColumns={3}
            />
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <View style={{width: '40%'}}>
              <Button title="Tải lên" />
            </View>
          </View>
        </View>

        {/*Màu sắc */}

      </View>
        <View style={styles.wrappButton}>
          <View style={{width: '50%', height: 35, alignItems: 'center'}}>
            <View style={{width: '90%'}}>
              <Button title="Nhập mới" />
            </View>
          </View>

          <View style={{width: '50%', height: 35, alignItems: 'center'}}>
            <View style={{width: '90%'}}>
              <Button title="Lưu" />
            </View>
          </View>
        </View>
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  wrappItem: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 7,
  },
  wrappUpload: {
    width: '100%',
  },
  wrappButton: {
    flex: 0.7,
    flexDirection: 'row',
    marginTop: 40,
  },
  label: {
    fontSize: 15,
    marginLeft: 5,
    textAlign: 'left',
    fontWeight: '700',
  },
  wrappListIMG: {
    flex: 1,
    top: 5,
  },
  imageThumbnail: {
    height: '100%',
    width: '100%',
  },
  wrappIMG: {
    //flex: 1,
    backgroundColor: '#fff',
    padding: 2,
    marginVertical: 7,
    marginHorizontal: 5,
    width: '31.2%',
    height: 115,
    borderRadius: 5,
    marginTop: 1,
    borderColor:'#009387',
    borderWidth: 1,
    marginLeft: '0.8%',
    //position:'relative'
  },
  labelRadioBtn: {
    justifyContent:'center',
    marginTop: 7
  },
});
