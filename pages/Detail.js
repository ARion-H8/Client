import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button } from 'native-base';


export default class Detail extends Component {
  render() {
    return (
      <Container style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1ded3' }}>
        <Content style={{ padding: 10, marginTop: 30, width: 400, marginBottom: 170, backgroundColor: '#cd9774', borderRadius: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Nama Barang</Text>
          <Image source={require('./spiker.jpeg')} style={{ borderRadius: 10, margin: 10, alignSelf: 'center', width: 380, height: 380 }}/>
          <Text>Harga Barang</Text>
          <Container style={{ flexDirection: 'row', marginTop: 10, height: 50 }}>
            {/* <Content> */}
              <Button success style={{ marginRight: 190  }}><Text>Cek Barang</Text></Button>
            {/* </Content> */}
            {/* <Content> */}
              <Button success><Text>Beli</Text></Button>
            {/* </Content> */}
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
