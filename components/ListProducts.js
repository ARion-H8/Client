import React, { Component } from 'react';
import { Image,StyleSheet, TouchableOpacity, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Head } from 'native-base';

class ListProducts extends Component {
  rupiah = (num) => {
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
    const { product, navigation } = this.props
    return (
      <View style={ styles.gridCard } >
        <View style={ styles.gridHead } >
          <Text style={{ color:'white', alignSelf:'center', }} >
            { product.name }
          </Text>
        </View>
        <View style={ styles.gridBody } >
          <Text>
          </Text>
        </View>
        <View style={ styles.gridFooter } >
          <View style={styles.price} >
            <Text style={{ color:'white', alignSelf:'center', }} >
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
      backgroundColor:'#29a329',
      justifyContent:'center'
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
      backgroundColor:'#00b386',
      justifyContent:'center',
    },
    btnStyle:{
      minHeight:29,
      justifyContent:'center', 
      backgroundColor:'#cc3300',
      margin:4,
      borderRadius:4,
    },
    price:{
      justifyContent:'center', 
      minHeight:40
    }
  })
  
  export default ListProducts