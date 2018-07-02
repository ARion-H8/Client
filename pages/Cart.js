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
import ListCart from '../components/ListCart.js'
import Total from '../components/Total.js'
import product from '../Graphql'
import { graphql, compose } from 'react-apollo'

class Cart extends Component {
  constructor () {
    super ()
    this.state = {
      totalPrice: 0,
      data: [
        {
          nama: 'item1',
          harga: 10000
        }, {
          nama: 'item2',
          harga: 20000
        }, {
          nama: 'item3',
          harga: 30000
        }
      ],
      quantity: null
    }
  }

  componentDidMount() {
    const { user } = this.props.data
    console.log("user >>", this.props)
    // let total = 0
    // user.cart.map((item) => {
    //   total += item.product.price
    // })
    // this.setState({
    //   totalPrice: total
    // })
    // this.forTotalPrice()
  }

  forTotalPrice = (total) => {
    console.log('total =====>', total)
    // this.state.data.map((item) => {
    //   this.state.totalPrice = this.state.totalPrice + item.harga
    // })
    let totalItem = 0
    totalItem += total
    this.setState({
      totalPrice: totalItem
    })
  }

  rupiah = (num) => {
    let strNum = num.toString()
    let result = strNum.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    return  `Rp. ${result}`
  }

  render() {
    const { user, loading, error } = this.props.data
    const { navigation } = this.props
    console.log('props >>>>>', this.props)
    console.log('TOTALPRICE > ', this.state.totalPrice)
    if (loading) {
      return <Text>Loading . . .</Text>
    } else {
      return (
        <Container style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ebeced' }}>
          <Content style={{ padding: 10, marginTop: 25, marginBottom: 10, width: 400 }}>
            <FlatList
            data={user.cart}
            keyExtractor={item => item._id}
            renderItem={({item}) => <ListCart forTotalPrice={this.forTotalPrice} item={ item } price={item.price} navigation={ navigation }/>}
            />
          </Content>
          <Total data={user.cart}/>
          <View style={{ height: 65, padding: 10, flexDirection: 'row', width: 400, }}>
            <Button block style={{ marginRight: 130, alignSelf: 'flex-start', borderRadius: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>FITTING ROOM</Text>
            </Button>
            <Button block style={{ borderRadius: 5 }}>
              <Text style={{ fontWeight: 'bold', borderRadius: 5 }}>CHECKOUT</Text>
            </Button>
          </View>
        </Container>
      )
    }
  }
}

export default graphql(product.users)(Cart)