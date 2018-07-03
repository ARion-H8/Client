import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'native-base';

class ListProducts extends Component {
  rupiah = (num) => {
    console.log(num)
    let strNum = num.toString()
    let result = strNum.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    return  `Rp. ${result}`
  }
  toDetail = () => {
    const { navigation } = this.props
    navigation.navigate('Detail')
  }
  toCart = () => {
    const { navigation } = this.props
    navigation.navigate('Cart')
  }
  render() {
    const { product } = this.props
    if(product) {
      return (
        <View style={ styles.gridCard } >
          <View style={ styles.gridHead } >
            <Text style={{ color:'black', alignSelf:'center', fontWeight: 'bold' }} >
              { product.name }
            </Text>
          </View>
          <View style={ styles.gridBody } >
            <Image source={{uri: product.image}} style={{width: "100%", height: 170}}/>
          </View>
          <View style={ styles.gridFooter } >
            <View style={styles.price} >
              <Text style={{ color:'black', alignSelf:'center', }} >
                { this.rupiah( product.price ) }
              </Text>
            </View>
            <View style={ styles.btnStyle } >
              <TouchableOpacity onPress={ () => this.props.addToCart(product) } >
                <Text style={{ color:'white', alignSelf:'center', }}>
                  Add To Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }else {
      return (
        <View>
          <Text>LOADING</Text>
        </View>
      )
    }
  }
}
  
  const styles = StyleSheet.create({
    gridCard:{
      width:'48%',
      height:300,
      borderWidth:0.4,
      borderColor:'#b3b3b3',
      margin:'1%',
    },
    gridHead:{
      flex:1,
      minHeight:50,
      backgroundColor:'#bedce3',
      justifyContent:'center',
      borderTopStartRadius: 5
    },
    gridBody:{
      flex:1,
      minHeight:170,
      backgroundColor:'white',
      justifyContent:'center'
    },
    gridFooter:{
      flex:1,
      minHeight:79,
      backgroundColor:'#bedce3',
      justifyContent:'center',
      borderBottomStartRadius: 5
    },
    btnStyle:{
      minHeight:29,
      justifyContent:'center', 
      backgroundColor:'#da7015',
      margin:4,
      borderRadius:4,
    },
    price:{
      justifyContent:'center', 
      minHeight:40
    }
  })
  
  export default ListProducts