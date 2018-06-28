
import React, { Component } from 'react';
import {
  YellowBox,
  View,
  Text
} from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
console.ignoredYellowBox = ['Remote debugger']

import { createStackNavigator } from 'react-navigation'
import Home from './pages/Home'
import ArCam from './pages/ArCam'

const Navigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions:{
      title:'Home'
    }
  },
  ArCam: {
    screen: ArCam,
    navigationOptions:{
      header: null
    }
  },
},{
  initialRouteName: 'Home'
});

export default class App extends React.Component {
  render() {
    return (
      <Navigator />
    )
  }
}

