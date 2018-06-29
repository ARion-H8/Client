import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button
} from 'react-native';


export default class Home extends Component {
	toArCam = (navType) => {
		this.props.navigation.navigate('ArCam')
	}

  render() {
		return (
			<View>
				<Text>
					Home
				</Text>
				<Button
					title='AR-Cam'
					onPress = { () => this.toArCam('AR') }
				/>
		</View>
		)
  }
}

