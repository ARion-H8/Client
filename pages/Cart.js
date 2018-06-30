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
  Input 
} from 'native-base';

export default class Cart extends Component {
  constructor () {
    super ()
    this.state = {
      number: 0
    }
  }

  handlePlus = () => {
    this.setState({
      number: this.state.number + 1
    })
  }

  handleMinus = () => {
    if (this.state.number > 0) {
      this.setState({
        number: this.state.number - 1
      })
    }
  }

  render() {
    return (
      <Container style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1ded3' }}>
        <Content style={{ padding: 10, marginVertical: 30, width: 400, borderRadius: 10 }}>
          <Card>
            <CardItem cardBody>
              <Left>
                <Image source={require('./spiker.jpeg')} style={{height: 200, width: 200}}/>
              </Left>
              <Left>
                <Body>
                  <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold' }}>Nama Barang</Text>
                  <Text style={{ alignSelf: 'flex-start'}}>Harga Barang</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Button
                onPress={() => this.handleMinus()}
                >
                  <Text>-</Text>
                </Button>
                <Text style={{ textAlign: 'center', backgroundColor: 'white', borderWidth: 1, height: 45, width: 45 }}>{this.state.number}</Text>
                <Button
                onPress={() => this.handlePlus()}
                >
                  <Text>+</Text>
                </Button>
              </Left>
              <Right>
                <Button>
                  <Text>BELI</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

