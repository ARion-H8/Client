import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  AlertIOS
} from 'react-native';
import { Container, Header, Left, Right, Text } from 'native-base';
import product from '../Graphql'
import { graphql, compose } from 'react-apollo'
import ListProducts from '../components/ListProducts'
import CartIcon from '../components/CartIcon'

class Catalogue extends Component {
  constructor() {
    super()
    this.state = {
      totalCart: 0
    }
  }

  addToCart = async (newData) => {
    const { cart } = this.props.carts.user
    const { _id } = newData

    let isDuplicated = false
    cart.forEach(item => {
      if(item.product._id === newData._id) {
        isDuplicated = true
        cartId = item._id
        quantity = item.quantity
      }
    })
    if(isDuplicated) {
      AlertIOS.alert("you already add this product")
    } else {
      try {
        let result = await this.props.addCart({
          variables: {
            newCart: {
              product: _id,
              quantity: 1
            }
          },
          refetchQueries: [{ query: product.cart }]
        })
        console.log(result)
      } catch (err) {
        console.log(err)
      }
    }
    let { totalCart } = this.state
    totalCart += 1
    this.setState({ totalCart })
  }

  toCart = () => {
    this.props.navigation.navigate('Cart')
  }

  render() {
    const { products, loading, user } = this.props.products
    const navigation = this.props.navigation
    if (loading) {
      return (
        <View style={styles.container} >
          <Image source={require('../js/assets/Arion.png')} />
        </View>
      )
    } else {
      return (
        <Container style={{backgroundColor:"#f3f3f6"}}>
          <Header style={{ backgroundColor: '#6cb4b8' }} >
            <Left>
              <Text style={{ fontWeight: 'bold', color:"white", marginLeft: 10 }} >Catalogue</Text>
            </Left>
            <Right>
              <CartIcon navigation={navigation} totalCart={this.state.totalCart} />
            </Right>
          </Header>
          <ScrollView contentContainerStyle={styles.scroll} >
            {
              products.map(item => {
                return <ListProducts product={item} key={item._id} navigation={navigation} addToCart={this.addToCart} />
              })
            }
          </ScrollView>
        </Container>
      )
    }
  }
}

const styles = StyleSheet.create({
  detail: {
    alignSelf: 'flex-end',
    backgroundColor: 'green',
    marginTop: 10,
    borderRadius: 4,
    width: 55,
    height: 25,
    alignItems: 'center',
  },
  toCart: {
    alignSelf: 'flex-end',
    backgroundColor: 'red',
    marginTop: 10,
    borderRadius: 4,
    width: 95,
    height: 25,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f3f6',
  },
  content: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    display: "flex",
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  scroll: {
    display: "flex",
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'stretch',
  }
})

export default compose(
  graphql(product.show, { name: 'products' }),
  graphql(product.cart, { name: 'carts' }),
  graphql(product.editCart, {name : 'editCart'}),
  graphql(product.addCart, {name: 'addCart'})
)(Catalogue)