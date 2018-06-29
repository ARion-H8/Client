import React, { Component } from 'react';
import {
  YellowBox,
  Button,
} from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
console.ignoredYellowBox = ['Remote debugger']

import { createStackNavigator } from 'react-navigation'
import Home from './pages/Home'
import ArCam from './pages/ArCam'
import Login from './pages/Login'
import Detail from './pages/Detail'
import Cart from './pages/Cart'
import Catalogue from './pages/Catalogue'
import Profile from './pages/Profile'
import { Drawer } from 'native-base';
import SideBar from './components/SideBar';

const Navigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions:{
      title:'Home',
    }
  },
  ArCam: {
    screen: ArCam,
    navigationOptions:{
      header: null
    }
  },
  Login: {
    screen: Login,
    navigationOptions:{
      header: null
    }
  },
  Detail: {
    screen: Detail,
    navigationOptions:{
      header: null
    }
  },
  Cart: {
    screen: Cart,
    navigationOptions:{
      header: null
    }
  },
  Catalogue: {
    screen: Catalogue,
    navigationOptions:{
      header: null
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions:{
      title: 'Profile'
    }
  },
},{
  initialRouteName: 'Catalogue'
});

export default class App extends React.Component {
 
  render() {
    return (
      <Drawer
      ref={(ref) => { this.drawer = ref; }}
      content={<SideBar navigation={this.props.navigation} />}
      onClose={() => this.closeDrawer()} >
        <Navigator />
        <Button
          title='press'
          onPress={ () => console.log(this) }
        />
      </Drawer>
    )
  }
}

