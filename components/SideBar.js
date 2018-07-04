import React from "react";
import {Image, ImageBackground, ToastAndroid,View } from "react-native";
import { Container, Content, Text, List, ListItem, Header,Icon } from "native-base";
const routes = ["Catalogue", "Cart", "signOut"];

class SideBar extends React.Component {

  logout = () => {
    this.props.screenProps.changeLoginState(false)
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#f3f3f6' }}>
        <Content style={{ backgroundColor: '#6cb4b8' }}>
          <ImageBackground
            source={require('../Arion.png')}
            style={{
              height: 180,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center",
              margin :2,
              borderRadius:2,
              opacity:0.6,
              padding: 10,
              backgroundColor:'white'
            }}>
            {/* <Header style={{ backgroundColor: '#6cb4b8', height:180, justifyContent:'center' }}>
              <Image source={ require('../Arion.png') }/> 
              <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 40 }}>ARION</Text>
            </Header> */}
            
            {/* <Image
              square
              style={{ height: 80, width: 70 }}
              source={{
                uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/logo.png"
              }}
            /> */}
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
                    <View style={{ flexDirection: 'row', }} >
                      <Icon type="Ionicons" name="log-out" style={{ marginRight:10,color:'white' }} />
                      <Text>
                        {data}
                      </Text>
                    </View>
                    :
                    <View>
                    {
                      data==='Catalogue'?
                      <View style={{ flexDirection: 'row', }} >
                        <Icon type="Ionicons" name="shirt" style={{ marginRight:10,color:'white' }} />
                        <Text>
                          {data}
                        </Text>
                      </View>
                      :
                      <View style={{ flexDirection: 'row', }} >
                        <Icon type="Ionicons" name="cart" style={{ marginRight:10,color:'white' }} />
                        <Text>
                          {data}
                        </Text>
                      </View>
                    }
                    </View>
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
export default SideBar