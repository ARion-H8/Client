import React, { Component } from 'react';
import { Drawer } from 'native-base';
import SideBar from '../components/SideBar';
import {
  View,
  Text,
  Button
} from 'react-native'

export default class Catalogoue extends Component {
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    console.log(this)
    // this.drawer._root.open()
  }
  render() {
    console.log(this)
    return (
          <View>
            <Text>
              asd
            </Text>
          <Button
            title="open"
            onPress={() => this.openDrawer()}
          />
          </View>
    );
  }
}