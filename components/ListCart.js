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
  constructor () {
    super ()
    this.state = {
      total: 0,
      quantity: 1
    }
  }

  rupiah = (num) => {
    let strNum = num.toString()
    let result = strNum.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    return  `Rp. ${result}`
  }

  handlePlus = async () => {
    console.log('masuk ++++')
    let { quantity } = this.state
    quantity += 1
     this.setState({
      quantity
    })
    console.log('qty ====', quantity)
    console.log('item ========', this.props.item)
    try {
      console.log('try ------', this.props)
      let result = await this.props.edit({ 
        variables: { 
          cartId: this.props.item._id, 
          quantity: quantity
        }
      })
      console.log('ini RESULT ===> ', result)
    } catch (err) {
      console.log(err)
    }
    // console.log('TOTAL> ', this.state.total)
    // console.log('+++++>', this.state.quantity)
    // console.log('total +++++>', this.state.total)
    // this.props.forTotalPrice(this.state.total)
  }
  
  handleMinus = async () => {
    // console.log(this.props.item.price)
    if (this.state.quantity > 1) {
      let { quantity } = this.state
      quantity -= 1
      this.setState({
        quantity
      })

      try {
        let result = await this.props.edit({ 
          variables: { 
            cartId: this.props.item._id, 
            quantity: quantity 
          } 
        })
        console.log('ini RESULT ===> ', result)
      } catch (err) {
        console.log(err)
      }
    }
    // console.log('----->', this.state.quantity)
    // console.log('total ----->', this.state.total)
    // this.props.forTotalPrice(this.state.total)
  }

  componentDidMount = () => {
    this.setState({
      total: this.props.item.product.price
    })
  }

  render() {
    const { navigation } = this.props
    const { product } = this.props.item
    // console.log('ini price', price)
    // console.log('props ListCart >>>>> ', this.props)
    // console.log('products =====', product)
    // console.log("TOTAL >>> ", this.state.total)
    return (
      <Card>
        <CardItem cardBody>
          <Left>
            <Image source={product.image} style={{height: 200, width: 200 }}/>
          </Left>
          <Left>
            <Body>
              <Text 
              style={{ alignSelf: 'flex-start', fontWeight: 'bold', color: '#3e3e3b' }}
              >{product.name}</Text>
              <Text 
              style={{ alignSelf: 'flex-start', color: '#3e3e3b' }}
              >{this.rupiah(product.price)}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Left style={{ alignItems: 'flex-start' }}>
            <Button
            rounded
            success
            onPress={() => this.handleMinus()}
            >
              <Text style={{ fontWeight: 'bold' }}> - </Text>
            </Button>
            <Button bordered rounded light onPress={this.props.forTotalPrice(this.state.total)}>
              <Text style={{ color: 'black' }}> {this.state.quantity} </Text>
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
  graphql(product.editCart, {name: 'edit'}),
  graphql(product.deleteCart, {name: 'delete'})
)(ListCart)