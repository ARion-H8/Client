import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  FlatList
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Left,
  Right,
  Input,
  Footer,
  FooterTab
} from 'native-base';
import product from '../Graphql'
import { graphql, compose } from 'react-apollo'

class ListCart extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
      image: 'https://images.pexels.com/photos/889087/pexels-photo-889087.jpeg?auto=compress&cs=tinysrgb&h=350',
      name: '',
      price: 0,
      total: 0,
      texture_img1: '',
      texture_img2: ''
    }
  }

  rupiah = (num) => {
    let strNum = num.toString()
    let result = strNum.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    return `Rp. ${result}`
  }

  handlePlus = async () => {
    let { quantity } = this.state
    let id = this.props.item._id
    let price = this.state.price

    quantity += 1
    this.setState({
      quantity
    })
    let { plus } = this.props
    plus(price)
    try {
      let result = await this.props.edit({
        variables: {
          cartId: id,
          quantity: quantity
        },
        refetchQueries: [{ query: product.cart }]
      })

    } catch (err) {
      console.log(err)
    }
  }

  handleMinus = async () => {
    if (this.state.quantity > 1) {
      let { quantity } = this.state
      let id = this.props.item._id
      let price = this.state.price

      quantity -= 1
      this.setState({
        quantity
      })
      let { minus } = this.props
      minus(price)
      try {
        let result = await this.props.edit({
          variables: {
            cartId: id,
            quantity: quantity
          },
          refetchQueries: [{ query: product.cart }]
        })

        console.log(result)
      } catch (err) {
        console.log(err)
      }
    }
  }

  componentDidMount = () => {
    let total = this.props.item.product.price * this.props.item.quantity
    this.setState({
      total
    })
    this.setState({
      image: this.props.item.product.image
    })
    this.setState({
      name: this.props.item.product.name
    })
    this.setState({
      price: this.props.item.product.price
    })
    this.setState({
      quantity: this.props.item.quantity,
      texture_img1: this.props.item.product.texture_img1,
      texture_img2: this.props.item.product.texture_img2
    })
  }

  render() {
    const { name, image, price, quantity } = this.state
    return (
      <Card >
        <CardItem cardBody style={{ backgroundColor: '#bedce3' }}>
          <Left>
            <Image source={{ uri: image }} style={{ height: 200, width: 200, margin: 10 }} />
          </Left>
          <Left style={{ marginLeft: 40 }} >
            <Body>
              <Text
                style={{ alignSelf: 'flex-start', fontWeight: 'bold', color: '#3e3e3b', fontSize: 20 }}
              >{name}</Text>
              <Text
                style={{ alignSelf: 'flex-start', color: '#3e3e3b' }}
              >{this.rupiah(price)}</Text>
              <Text style={{ marginTop: 55, fontWeight:"bold" }}>Color Available: </Text>
              <View style={{ flexDirection: "row" }}>
                <Image source={{ uri: this.state.texture_img1 }} style={{ height: 50, width: 50, margin: 5 }} />
                <Image source={{ uri: this.state.texture_img2 }} style={{ height: 50, width: 50, margin: 5 }} />
              </View>
            </Body>
          </Left>
        </CardItem>
        <CardItem style={{ backgroundColor: '#bedce3' }}>
          <Left style={{ alignItems: 'flex-start' }}>
            <Button
              rounded
              success
              onPress={() => this.handleMinus()}
            >
              <Text style={{ fontWeight: 'bold' }}> - </Text>
            </Button>
            <Button bordered rounded style={{ borderColor: '#bedce3' }} >
              <Text style={{ color: 'black' }}> {quantity} </Text>
            </Button>
            <Button
              rounded
              success
              onPress={() => this.handlePlus()}
            >
              <Text style={{ fontWeight: 'bold' }}> + </Text>
            </Button>
          </Left>
          <Right>
            <Button
              onPress={async (e) => {
                e.preventDefault()
                await this.props.deleteCartProduct({
                  variables: {
                    cartId: this.props.item._id
                  },
                  refetchQueries: [{ query: product.cart }]
                })
              }}
              style={{ borderRadius: 5 }}
              danger>
              <Text>Delete</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export default compose(
  graphql(product.editCart, { name: 'edit' }),
  graphql(product.deleteCart, { name: 'delete' }),
  graphql(product.deleteCartProduct, { name: 'deleteCartProduct' })
)(ListCart)