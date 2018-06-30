import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image, 
  TextInput
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, Left, Right, Input } from 'native-base';


export default class Cart extends Component {
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
                <Button>
                  <Text>-</Text>
                </Button>
                <TextInput placeholder='0' style={{ borderWidth: 1, backgroundColor: 'white', height: 45, width: 45, textAlign: 'center' }}/>
                <Button>
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

