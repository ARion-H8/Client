import React from "react";
import {Image, ImageBackground, ToastAndroid } from "react-native";
import { Container, Content, Text, List, ListItem, Header } from "native-base";
const routes = ["Catalogue", "Cart", "signOut"];
export default class SideBar extends React.Component {

  logout = () => {
    this.props.screenProps.changeLoginState(false)
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#f3f3f6' }}>
        <Content>
          {/* <ImageBackground
            source={require('../js/assets/Arion.png')}
            style={{
              height: 180,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center",
              margin :2,
              borderRadius:2,
              opacity:0.8,
              padding: 10
            }}> */}
            <Header style={{ backgroundColor: '#6cb4b8' }}>
              <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 40 }}>ARION</Text>
            </Header>
            
            {/* <Image
              square
              style={{ height: 80, width: 70 }}
              source={{
                uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/logo.png"
              }}
            /> */}
          {/* </ImageBackground> */}
          <List
            dataArray={routes}
            renderRow={data => {
             
              return (
                <ListItem
                  button
                  onPress={
                    data==="signOut"?
                    this.logout
                    :
                    () => this.props.navigation.navigate(data)
                  }>
                  {
                    data==="signOut"?
                    <Text style={{ color:'black' }} >Logout</Text>
                    :
                    <Text style={{ color:'black' }} >{data}</Text>
                  }
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}