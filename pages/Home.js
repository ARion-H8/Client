import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button
} from 'react-native';

import { ViroARSceneNavigator } from 'react-viro'


let HelloAr = require('../components/HelloWorldSceneAR')
let sharedProps = {
	apiKey:'637783C0-7B08-4336-A463-922B852892BC'
}

export default class Home extends Component {
	constructor(){
		super()
		this.state = {
			navType: 'UNSET',
			sharedProps: sharedProps
		}
	}

	arCam = () => {
	
	}

	toArCam = (navType) => {
		this.props.navigation.navigate('ArCam')
		// this.setState({
		// 	navType: navType
		// })
	}

	home = () => {
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

  render() {
		console.log(this.props.navigation)
		// const { navType } = this.state
		// if(navType==='UNSET'){
		// 	return this.home()
		// }else if(navType==='AR'){
		// 	return this.arCam()
		// }
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

