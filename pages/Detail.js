import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, Left, Right } from 'native-base';


export default class Detail extends Component {
  render() {
    return (
      <Container style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1ded3' }}>
        <Content style={{ padding: 10, marginTop: 30, width: 380, marginBottom: 170, borderRadius: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, borderBottomWidth: 1, padding: 5 }}>Nama Barang</Text>
          {/* <Image source={require('./spiker.jpeg')} style={{ borderWidth: 1, borderColor: 'grey', borderRadius: 10, margin: 10, alignSelf: 'center', width: 360, height: 360 }}/> */}
          <Text style={{ borderBottomWidth: 1, padding: 5 }}>Harga Barang</Text>
          <Container style={{ flexDirection: 'row', marginTop: 10, height: 50 }}>
              <Button success style={{ marginRight: 150  }}><Text>Cek Barang</Text></Button>
            <Right>
              <Button success><Text>Beli</Text></Button>
            </Right>
          </Container>
        </Content>
      </Container>
    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 3,
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     margin: 15
//   },
//   box: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     margin: 20,
//     padding: 5,
//     backgroundColor: 'powderblue'
//   },
//   image: {

//   },
//   button: {
//     backgroundColor: '#144182',
//     margin: 5,
//     padding: 5,
//     width: 100
//   },
//   btntxt: {
//     fontWeight: 'bold',
//     padding: 2,
//     alignSelf: 'center',
//     color: 'white'
//   }
// })