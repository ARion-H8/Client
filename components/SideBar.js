import React from "react";
import { View, Image, StatusBar, ImageBackground } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
const routes = ["Home", "Profile", "Detail"];
export default class SideBar extends React.Component {
  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <Content>
          <ImageBackground
            source={{
              uri: "http://www.solidbackgrounds.com/images/2880x1800/2880x1800-deep-moss-green-solid-color-background.jpg"
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
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
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}