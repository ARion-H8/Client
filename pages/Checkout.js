import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Alert
} from 'react-native';
import { Container, Header, Text, Left, Right, CardItem, Body, Content, Card, Icon, Footer,  Button } from 'native-base'
import product from '../Graphql'
import { graphql } from 'react-apollo'


class Checkout extends Component {
  constructor(){
    super()
    this.state={
      saldo:4000000
    }
  }

  rupiah = (num) => {
    let strNum = num.toString()
    let result = strNum.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    return  `Rp. ${result}`
  }

  process = async () => {
    let cart = this.props.navigation.getParam('cart')
    
      cart.map(async (item)=>{
        try{
          await this.props.mutate({
            variables:{
              cartId:item._id
            },
            refetchQueries:[{ query: product.cart }]
          })
        }catch(err){
          console.log(err)
        }
      })
      Alert.alert(
        'Thank you',
        'Your transaction is being process',
        [
        
        ],
      )
      this.props.navigation.navigate('Catalogue')
   
  }

  render() {
    let totalPrice = this.props.navigation.getParam('totalPrice')
    return (
      <Container style={{backgroundColor:"#f3f3f6"}} >
        <Header style={{ backgroundColor: '#6cb4b8' }} >
          <Left>
            <Text style={{ fontWeight: 'bold', color:"white", marginLeft: 10 }} >Checkout</Text>
          </Left>
        </Header>
        <Content style={{ marginTop:80 }} >
          <Card style={ styles.tagihan }>
            <Body style={{ flexDirection:'row' }} >
              <Left>
                <Text>
                  {this.rupiah(totalPrice)}
                </Text>
              </Left>
              <Right>
                <Text style={{ fontWeight: 'bold' }}>
                  Total Tagihan
                </Text>
              </Right>
            </Body>
          </Card>
          <Card style={ styles.detailPembayaran } >
            <CardItem header bordered  >
              <Body style={{ flexDirection:'row' }}>
                <Left>
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Pembayaran</Text>
                </Left>
                <Right>
                <Icon type="FontAwesome" name="dollar" style={{ marginRight:20 }} />
                </Right>
              </Body>
            </CardItem>
            <CardItem bordered style={{ flexDirection:'column' }} >
              <Body style={{ flexDirection:'row' }}  >
                <Left>
                  <Text>
                    Saldo
                  </Text>
                </Left>
                <Right>
                  <Text>
                    { this.rupiah(this.state.saldo) }
                  </Text>
                </Right>
              </Body>
              <Body style={{ flexDirection:'row' }} >
                <Left>
                  <Text>
                    Tagihan
                  </Text>
                </Left>
                <Right>
                  <Text>
                   - { this.rupiah(totalPrice) }
                  </Text>
                </Right>
              </Body>
            </CardItem>
            <CardItem bordered>
               <Body style={{ flexDirection:'row' }} >
                <Left>
                    <Text>
                      Sisa Saldo
                    </Text>
                  </Left>
                  <Right>
                    <Text>
                    { this.rupiah(this.state.saldo-totalPrice) }
                    </Text>
                  </Right>
                </Body>
            </CardItem>
          </Card>
        </Content>
        <Footer style={{ backgroundColor: '#6cb4b8' }}>
          <Button style={ styles.button } onPress={ this.process }>
            <Text>Process</Text>
          </Button>
        </Footer>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  tagihan: {
    flexDirection: 'row',
    margin: 30,
    padding: 10,
    width:'80%',
    height: 50,
    borderWidth:1,
    borderColor:'black',
    justifyContent:'center',
    alignSelf:'center',
    borderRadius:4
  },
  detailPembayaran:{
    margin: 20,
    padding: 10,
    width:'80%',
    borderWidth:1,
    borderColor:'black',
    borderRadius:4,
    alignSelf:'center'
  },
  button: {
    backgroundColor: '#da7015',
    width: '80%',
    marginTop:10,
    height:35,
    borderRadius:32,
    justifyContent:'center'
  },
  btntxt: {
    fontWeight: 'bold',
    padding: 2,
    alignSelf: 'center',
    color: 'white'
  }
})

export default graphql(product.deleteCartProduct)(Checkout)