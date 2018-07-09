import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList
} from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Header,
  Left
} from 'native-base';
import ListCart from '../components/ListCart.js'
import product from '../Graphql'
import { graphql } from 'react-apollo'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      totalPrice: 0,
    }
  }


  rupiah = (num) => {
    let strNum = num.toString()
    let result = strNum.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    return `Rp. ${result}`
  }

  plus = (price) => {
    let { totalPrice } = this.state
    totalPrice += price
    this.setState({
      totalPrice
    })
  }

  minus = (price) => {
    let { totalPrice } = this.state
    totalPrice -= price
    this.setState({
      totalPrice
    })
  }

  toCheckout = () => {
    const { cart } = this.props.data.user
    if(cart.length>0){
      this.props.navigation.navigate('Checkout',{
        totalPrice:this.state.totalPrice,
        cart:cart
      })
    }
  }

  componentDidMount() {
    const { user } = this.props.data
    let totalPrice = 0
    let result = user.cart.map((item) => {
      totalPrice += item.product.price * item.quantity
      return totalPrice
    })
    this.setState({
      totalPrice
    })
  }

  toArCam = () => {
    this.props.navigation.navigate('ArCam', {
      itemCart: this.props.data.user.cart.map(item => ({
        ...item, product: {
          ...item.product,
          display: false
        }
      }))
    })
  }

  render() {
    const { user, loading, error } = this.props.data
    const { navigation } = this.props

    if (loading) {
      return (
        <View style={styles.container} >
          <Image source={require('../js/assets/Arion.png')} />
        </View>
      )
    } else {
      return (
        <Container
          style={{ backgroundColor: '#f3f3f6' }}>
          <Header style={{ backgroundColor: '#6cb4b8' }} >
            <Left>
              <Text style={{ marginLeft: 10, fontWeight: 'bold', color: "white" }} >Cart</Text>
            </Left>
          </Header>
          <Container style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ebeced' }}>
          <Content style={{ padding: 5, marginTop: 15, marginBottom: 10, width: 400 }}>
            <FlatList
              data={user.cart}
              keyExtractor={item => item._id}
              renderItem={({ item }) => <ListCart item={item} plus={this.plus} minus={this.minus} price={item.price} navigation={navigation} />}
            />
          </Content>
          <View style={{ height: 40, padding: 10, flexDirection: 'row', width: 380, borderBottomWidth: 1, borderColor: '#a2aab0' }}>
            <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold', color: '#3e3e3b' }}>Total Price: {this.rupiah(this.state.totalPrice)} </Text>
          </View>
          <View style={{ padding: 10, height: 65, flexDirection: 'row', width: 400, }}>
            <Button block
              onPress={this.toArCam}
              style={{ marginRight: 105, alignSelf: 'flex-start', borderRadius: 5, backgroundColor: '#da7015' }}>
              <Text style={{ fontWeight: 'bold' }}>FITTING ROOM</Text>
            </Button>
            <Button block 
            style={{ 
              marginRight: 20, 
              borderRadius: 5, 
              backgroundColor: '#da7015' 
            }}
            onPress = { this.toCheckout }
            >
              <Text style={{ fontWeight: 'bold', borderRadius: 5 }}>CHECKOUT</Text>
            </Button>
          </View>
          </Container>
        </Container>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})

export default graphql(product.cart)(Cart)