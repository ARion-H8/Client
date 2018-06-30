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
    console.log(this.props)
    return (
      <Card >
        <CardItem>
          <Left>
            <Image 
            source={{uri: 'http://www.solidbackgrounds.com/images/2880x1800/2880x1800-deep-moss-green-solid-color-background.jpg'}} 
            style={{
              height: 100, 
              width: 100,
              }}/>
            <Body style={{
              alignSelf:'flex-start'
            }} >
            <Text>
              { product.name }
            </Text>
            <Text>
              { this.rupiah(product.price) }
            </Text>

              <View style={ styles.detail } >
                <TouchableOpacity onPress={ this.toDetail } >
                  <Text style={{ color:'white' }} >
                    Detail
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={ styles.toCart } >
                <TouchableOpacity onPress={ this.toCart } >
                  <Text style={{ color:'white' }} >
                    Add To Cart
                  </Text>
                </TouchableOpacity>
              </View>

            </Body>
          </Left>
        </CardItem>
      </Card>
    );
  }
}
  
  const styles = StyleSheet.create({
    detail:{
      alignSelf:'flex-end',
      backgroundColor:'green',
      marginTop: 10,
      borderRadius: 4,
      width:55,
      height:25,
      alignItems: 'center',
    },
    toCart:{
      alignSelf:'flex-end',
      backgroundColor:'red',
      marginTop: 10,
      borderRadius: 4,
      width:95,
      height:25,
      alignItems: 'center',
    }
  })
  
  export default ListProducts