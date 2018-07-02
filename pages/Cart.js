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
// import { graphql, compose } from 'react-apollo'

class Cart extends Component {
  constructor () {
    super ()
    this.state = {
      totalPrice: 0,
    }
  }


  rupiah = (num) => {
    let strNum = num.toString()
    let result = strNum.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    return  `Rp. ${result}`
  }

  plus = (price) => {
    console.log(price,'plus')
    let { totalPrice } = this.state
    totalPrice+=price
    this.setState({
      totalPrice
    })
  }

  minus = (price) => {
    console.log(price,'minus')
    let { totalPrice } = this.state
    totalPrice-=price
    this.setState({
      totalPrice
    })
  }


  componentDidMount(){
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

  toArCam = (navType) => {
		this.props.navigation.navigate('ArCam')
	}

  render() {
    const { user, loading, error } = this.props.data
    const { navigation } = this.props
    
    if (loading) {
      return (
				<View style={ styles.container } >
					<Image source={ require('../Arion.jpg') }/>
				</View>
			)
    } else {
      return (
        <Container style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ebeced' }}>
          <Content style={{ padding: 10, marginTop: 25, marginBottom: 10, width: 400 }}>
            <FlatList
            data={user.cart}
            keyExtractor={item => item._id}
            renderItem={({item}) => <ListCart item={ item } plus={this.plus} minus={this.minus} price={item.price} navigation={ navigation }/>}
            />
          </Content>
          <View style={{ marginLeft:30,height: 40, padding: 10, flexDirection: 'row', width: 380, borderBottomWidth: 1, borderColor: '#a2aab0' }}>
            <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold', color: '#3e3e3b' }}>Total Price: {this.rupiah(this.state.totalPrice)} </Text>
          </View>
          <View style={{ height: 65, padding: 10, flexDirection: 'row', width: 400, }}>
            <Button block 
            onPress={this.toArCam}
            style={{marginLeft:15, marginRight: 115, alignSelf: 'flex-start', borderRadius: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>FITTING ROOM</Text>
            </Button>
            <Button block style={{marginRight: 30, borderRadius: 5 }}>
              <Text style={{ fontWeight: 'bold', borderRadius: 5 }}>CHECKOUT</Text>
            </Button>
          </View>
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
    backgroundColor: '#F5FCFF',
  },
})

export default graphql(product.cart)(Cart)