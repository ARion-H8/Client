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

class Total extends Component {
  constructor () {
    super ()
    this.state = {
      totalPrice: 0
    }
  }

  render() {
    let totalPrice = 0
    this.props.data.map((item) => {
      totalPrice += item.product.price
    })

    return (
      <View style={{ height: 40, padding: 10, flexDirection: 'row', width: 380, borderBottomWidth: 1, borderColor: '#a2aab0' }}>
        <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold', color: '#3e3e3b' }}>Total Price: {totalPrice} </Text>
      </View>
    );
  }
}

export default Total;