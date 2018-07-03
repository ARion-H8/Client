import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon, Badge } from 'native-base'
import product from '../Graphql'
import { graphql } from 'react-apollo';

class CartIcon extends Component {
  toCart = () => {
    this.props.navigation.navigate('Cart')
  }
  render() {
    const { user } = this.props.data
    const{ loading } = this.props.data
    const { totalCart } = this.props
    if(loading){
      return(
        <View style={ styles.rightBar }>
         {
          totalCart!==0?
          <Badge danger style={{ marginRight:1, height:20 }}>
              <Text style={{ color:'white' }} >{totalCart}</Text>
          </Badge>
          :
          <Text>
          </Text>
          }
         <Icon type="FontAwesome" name="shopping-cart" style={{ color:'#29a329', marginRight:20 }} />
        </View>
      )
    }else{
      return (
        <View  >
          <TouchableOpacity onPress={ this.toCart } >
            <View style={ styles.rightBar }>
              {
              user.cart.length!==0?
              <Badge danger style={{ marginRight:1, height:20 }}>
                  <Text style={{ color:'white' }} >{user.cart.length}</Text>
              </Badge>
              :
              <Text>
              </Text>
              }
              <Icon type="FontAwesome" name="shopping-cart" style={{ color:'white', marginRight:20 }} />
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  rightBar:{
    display: "flex",
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'stretch',
  }
})

export default graphql(product.cart)(CartIcon)
