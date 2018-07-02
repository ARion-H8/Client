import React from "react";
import {Image, ImageBackground, ToastAndroid } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
const routes = ["Home", "Catalogue", "Cart", "signOut"];
export default class SideBar extends React.Component {

  logout = () => {
    ToastAndroid.showWithGravity(
      ' Success to Logout \n \n  Redirect to Login',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    )
    this.props.screenProps.changeLoginState(false)
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#339966' }}>
        <Content>
          <ImageBackground
            source={require('../Arion.jpg')}
            style={{
              height: 180,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center",
              margin :2,
              borderRadius:2,
              opacity:0.8
            }}>
            <Image
              square
              style={{ height: 80, width: 70 }}
              source={{
                uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/logo.png"
              }}
            />
          </ImageBackground>
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
                    <Text style={{ color:'white' }} >Logout</Text>
                    :
                    <Text style={{ color:'white' }} >{data}</Text>
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