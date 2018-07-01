
import React, { Component } from 'react';
import {
  View,
	Text,
	TouchableHighlight
} from 'react-native';
import { ViroARSceneNavigator } from 'react-viro'

let ArProduct = require('../components/ArProduct')
let sharedProps = {
	apiKey:'637783C0-7B08-4336-A463-922B852892BC'
}

export default class ArCam extends Component {
	constructor(){
		super()
			this.state ={
				sharedProps: sharedProps
			}
	}

  render() {
		return (
				<ViroARSceneNavigator {...this.state.sharedProps} 
					initialScene={{ scene: ArProduct }}
				/>
		)
  }
}

