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

export default class Cart extends Component {
  constructor () {
    super ()
    this.state = {
      number: 0,
      data: [
        {
          nama: 'item1',
          harga: '10000',
          jumlah: 0
        }, {
          nama: 'item2',
          harga: '20000',
          jumlah: 0
        }, {
          nama: 'item3',
          harga: '30000',
          jumlah: 0
        }
      ],
      totalPrice: 0,
      cart: null
    }
  }

  rupiah = (num) => {
    let strNum = num.toString()
    let result = strNum.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    return  `Rp. ${result}`
  }

  forTotalPrice = (price) => {
    this.setState({
      totalPrice: this.state.totalPrice + price
    })
  }

  handlePlus = (jumlah) => {
    this.setState({
      number: this.state.number + 1
    })
    console.log('+++++>', this.state.number)
  }

  handleMinus = (jumlah) => {
    if (this.state.number > 0) {
      this.setState({
        number: this.state.number - 1
      })
    }
    console.log('----->', this.state.number)
  }

  

  render() {
    console.log(this.props)
    return (
      <Container style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ebeced' }}>
        <Content style={{ padding: 10, marginTop: 25, marginBottom: 10, width: 400 }}>
        <FlatList
        data={this.state.data}
        keyExtractor={(item) => item.nama}
        renderItem={({item}) => 
          <Card>
            <CardItem cardBody>
              <Left>
                {/* <Image source={require('./spiker.jpeg')} style={{height: 200, width: 200 }}/> */}
              </Left>
              <Left>
                <Body>
                  <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold', color: '#3e3e3b' }}>{item.nama}</Text>
                  <Text style={{ alignSelf: 'flex-start', color: '#3e3e3b' }}>{this.rupiah(item.harga)}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left style={{ alignItems: 'flex-start' }}>
                <Button
                rounded
                success
                onPress={() => item.jumlah--}
                >
                  <Text style={{ fontWeight: 'bold' }}> - </Text>
                </Button>
                <Button bordered rounded light>
                  <Text style={{ color: 'black' }}> {item.jumlah} </Text>
                </Button>
                <Button
                rounded
                success
                onPress={() => item.jumlah++}
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
        }
        />
        </Content>
        <View style={{ height: 40, padding: 10, flexDirection: 'row', width: 380, borderBottomWidth: 1, borderColor: '#a2aab0' }}>
          <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold', color: '#3e3e3b' }}>Total Price: </Text>
        </View>
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

