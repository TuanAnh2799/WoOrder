
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Product from './Product';

export default class Categories extends Component {

  constructor(props){
    super(props);
    this.state = {
      product:[
        {id: 1, url:'https://i.pinimg.com/originals/5b/8e/6f/5b8e6f16ed9cde83fecaa2b677bf2cf0.png', price: '50000', name:'Mèo hư hỏng'},
        {id: 2,url:'https://d1nr5wevwcuzuv.cloudfront.net/product_photos/82355539/file_432fc4a7aa_original.jpg',  price: '600000', name:'Mèo ngu ngốc'},
        {id: 3,url:'https://1.bp.blogspot.com/-qaRkLrZ-6o0/Wdc9DKW4_uI/AAAAAAAAJfg/xYqck3qSk54i7YuvinxOA91P7FmXtS-EgCEwYBhgL/s1600/vu-to.jpg',  price: '750.000', name:'Mèo ngáo'},
        {id: 4, url:'https://i.pinimg.com/originals/b7/53/13/b7531381c926c3bedbe01ff6d70eb937.jpg', price: '800.000', name:'Tiểu meo meo'},
        {id: 5,url:'https://i.pinimg.com/564x/49/21/ef/4921ef8004d20283b3019edf97a81059.jpg',  price: '900.000', name:'Tiểu hung dữ'},
      ]
    };
  }

  render(){
    const {product} = this.state;
    const { navigation } = this.props;
    return (
      <View>
      <View style={{backgroundColor: 'blue', marginTop: 27}}>
        
      </View>
      <View>
           <FlatList
        data = {product}
        renderItem = { ( { item } ) => 
        <Product 
        product = { item }
        onPress ={ () => navigation.navigate('Category',{
          categoryName:item.name
        })}
         /> }
        keyExtractor = { item => `${item.id}`}
        //horizontal = {true}

      />
      </View>
     
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
