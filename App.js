import React, { Component } from 'react';
import {
  YellowBox,
  Button,
  AsyncStorage
} from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
console.ignoredYellowBox = ['Remote debugger']

import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Home from './pages/Home'
import ArCam from './pages/ArCam'
import Login from './pages/Login'
import Detail from './pages/Detail'
import Cart from './pages/Cart'
import Catalogue from './pages/Catalogue'
import Profile from './pages/Profile'
import { Drawer } from 'native-base';
import SideBar from './components/SideBar';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: "http://192.168.1.95:3000/graphql",
  request: async (operation) => {
    const token = await AsyncStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  }
})
const HomeScreenRouter = createDrawerNavigator(
  {
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
        title: 'Catalogue'
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions:{
        title: 'Profile'
      }
    },
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

const Navigator = createStackNavigator({
  Catalogue: {
    screen: HomeScreenRouter,
    navigationOptions:{
      title:'Catalogue',
    }
  },
  // ArCam: {
  //   screen: ArCam,
  //   navigationOptions:{
  //     header: null
  //   }
  // },
  // Login: {
  //   screen: Login,
  //   navigationOptions:{
  //     header: null
  //   }
  // },
  // Detail: {
  //   screen: Detail,
  //   navigationOptions:{
  //     header: null
  //   }
  // },
  // Cart: {
  //   screen: Cart,
  //   navigationOptions:{
  //     header: null
  //   }
  // },
  // Catalogue: {
  //   screen: Catalogue,
  //   navigationOptions:{
  //     title: Catalogue
  //   }
  // },
  // Profile: {
  //   screen: Profile,
  //   navigationOptions:{
  //     title: 'Profile'
  //   }
  // },
},{
  initialRouteName: 'Catalogue'
});

export default class App extends React.Component {
  
  render() {
    return (
      <ApolloProvider client = { client }>
        <Navigator/>
      </ApolloProvider>
    )
  }
}

